#!/usr/bin/env bash
# ============================================================
# Coastal Heritage — OCI Cloud Shell provisioning script
# ------------------------------------------------------------
# Run inside OCI Cloud Shell (already authenticated as you):
#   Console → Developer tools icon (>_) → Cloud Shell
#   then:   bash cloudshell.sh
#
# Provisions: VCN + IGW + route + security rules (22/80/443)
#             + Always Free VM "coastal-heritage" (Ubuntu 24.04)
#             + nginx pre-installed via cloud-init + public IP
#
# Equivalent of an AWS CloudFormation stack via OCI CLI.
# ============================================================

set -euo pipefail

SHAPE="VM.Standard.E2.1.Micro"   # Always Free AMD x86 (1GB). Swap for A1.Flex below if in capacity.
NAME="coastal-heritage"
SSH_PUB="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBduSsUsI5k1+WL+PZR3Fz3Pf9QJ7rf7JrtDXbgyci1J coastal-heritage-deploy"

# If you prefer the ARM free tier (faster when available):
# SHAPE="VM.Standard.A1.Flex"; SHAPE_CFG='--shape-config {"ocpus":1,"memoryInGBs":6}'
SHAPE_CFG=""

echo ">> Resolving compartment (root tenancy)..."
TENANCY=$(awk -F'=' '/^tenancy/{print $2}' ~/.oci/config | tr -d '[:space:]')
[ -z "$TENANCY" ] && TENANCY=$(oci iam region-subscription list --query 'data[0]."tenancy-id"' --raw-output)
echo "   compartment: $TENANCY"

echo ">> Writing SSH key + cloud-init to Cloud Shell home..."
echo "$SSH_PUB" > ~/coastal_oracle.pub
cat > ~/cloud-init.yaml <<'EOF'
#cloud-config
package_update: true
packages: [nginx, ufw]
runcmd:
  - mkdir -p /var/www/coastal-heritage
  - chown -R ubuntu:ubuntu /var/www/coastal-heritage
  - ufw allow OpenSSH
  - ufw allow 'Nginx Full'
  - ufw --force enable
  - rm -f /etc/nginx/sites-enabled/default
  - systemctl reload nginx
EOF

echo ">> Creating VCN..."
VCN=$(oci network vcn create --cidr-blocks '["10.20.0.0/16"]' \
  --display-name "$NAME-vcn" --compartment-id "$TENANCY" \
  --freeform-tags '{"Project":"coastal-heritage","Tier":"AlwaysFree"}' \
  --query 'data.id' --raw-output --wait-for-state AVAILABLE)
echo "   vcn: $VCN"

echo ">> Internet gateway + default route..."
IGW=$(oci network internet-gateway create --vcn-id "$VCN" --compartment-id "$TENANCY" \
  --is-enabled true --display-name "$NAME-igw" --query 'data.id' --raw-output)
RT=$(oci network vcn get --vcn-id "$VCN" --query 'data."default-route-table-id"' --raw-output)
oci network route-table update --rt-id "$RT" --force \
  --route-rules '[{"destination":"0.0.0.0/0","destination-type":"CIDR_BLOCK","network-entity-id":"'"$IGW"'"}]' >/dev/null

echo ">> Security list (22/80/443 + ICMP)..."
SL=$(oci network vcn get --vcn-id "$VCN" --query 'data."default-security-list-id"' --raw-output)
oci network security-list update --security-list-id "$SL" --force \
  --egress-security-rules '[{"destination":"0.0.0.0/0","protocol":"all"}]' \
  --ingress-security-rules '[
    {"protocol":"6","source":"0.0.0.0/0","tcpOptions":{"min":22,"max":22}},
    {"protocol":"6","source":"0.0.0.0/0","tcpOptions":{"min":80,"max":80}},
    {"protocol":"6","source":"0.0.0.0/0","tcpOptions":{"min":443,"max":443}},
    {"protocol":"1","source":"0.0.0.0/0","icmpOptions":{"type":3,"code":4}},
    {"protocol":"1","source":"0.0.0.0/0","icmpOptions":{"type":3}}
  ]' >/dev/null

echo ">> Subnet..."
SUBNET=$(oci network subnet create --vcn-id "$VCN" --cidr-block "10.20.1.0/24" \
  --compartment-id "$TENANCY" --display-name "$NAME-subnet" \
  --query 'data.id' --raw-output --wait-for-state AVAILABLE)
echo "   subnet: $SUBNET"

echo ">> Finding Ubuntu 24.04 image for $SHAPE..."
IMG=$(oci compute image list --compartment-id "$TENANCY" \
  --operating-system "Canonical Ubuntu" --operating-system-version "24.04" \
  --shape "$SHAPE" --sort-by TIMECREATED --sort-order DESC \
  --query 'data[0].id' --raw-output)
[ -z "$IMG" ] || [ "$IMG" = "null" ] && IMG=$(oci compute image list --compartment-id "$TENANCY" \
  --operating-system "Canonical Ubuntu" --operating-system-version "24.04" \
  --sort-by TIMECREATED --sort-order DESC --query 'data[0].id' --raw-output)
echo "   image: $IMG"

AD=$(oci iam availability-domain list --compartment-id "$TENANCY" --query 'data[0].name' --raw-output)

echo ">> Launching Always Free VM '$NAME'..."
INSTANCE=$(oci compute instance launch \
  --availability-domain "$AD" --compartment-id "$TENANCY" \
  --shape "$SHAPE" $SHAPE_CFG --display-name "$NAME" \
  --image-id "$IMG" --subnet-id "$SUBNET" --assign-public-ip true \
  --ssh-authorized-keys-file ~/coastal_oracle.pub \
  --user-data-file ~/cloud-init.yaml \
  --freeform-tags '{"Project":"coastal-heritage","Tier":"AlwaysFree"}' \
  --query 'data.id' --raw-output --wait-for-state RUNNING)
echo "   instance: $INSTANCE"

sleep 10
IP=$(oci compute instance list-vnics --instance-id "$INSTANCE" --query 'data[0]."public-ip"' --raw-output)

echo ""
echo "============================================================"
echo " VM is RUNNING"
echo "   Public IP:    $IP"
echo "   Free domain:  coastal-heritage.$(echo "$IP" | tr . -).sslip.io"
echo "   SSH:          ssh -i ~/.ssh/coastal_oracle ubuntu@$IP"
echo ""
echo " Send the public IP back and the site + SSL get deployed next."
echo "============================================================"
