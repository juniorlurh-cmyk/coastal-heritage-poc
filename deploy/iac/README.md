# IaC — provisioning the Always Free VM on Oracle Cloud

Two automated paths. Both require the account to exist first — tenancy signup
is the only step that cannot be scripted (true on AWS too).

## Option A — OCI Cloud Shell (fastest, ~5 min)

OCI Cloud Shell is a browser terminal **pre-authenticated as you** — no CLI
setup needed.

1. OCI Console → click the **`>_`** icon (Developer tools) → **Cloud Shell**
2. Upload/paste `cloudshell.sh` into the shell and run `bash cloudshell.sh`
3. It provisions the whole stack (VCN, security rules, Always Free VM with
   nginx pre-installed) and prints the **public IP** + free `sslip.io` domain.

## Option B — OCI Resource Manager (the real "CloudFormation")

Resource Manager is managed Terraform — the true AWS CloudFormation equivalent.

1. Zip the `terraform/` folder (or connect it as source)
2. Console → **Resource Manager → Stacks → Create stack** → upload the zip
3. Set `compartment_id` (tenancy OCID) and `ssh_public_key` variables
4. **Apply** → outputs the public IP, free domain and SSH command

## What the stack creates

| Resource | Name | Notes |
|---|---|---|
| VCN + IGW + route | `coastal-heritage-vcn` | Public subnet 10.20.1.0/24 |
| Security list | default (updated) | Ingress 22/80/443 + ICMP, egress all |
| Compute VM | `coastal-heritage` | `VM.Standard.E2.1.Micro` Always Free |
| cloud-init | — | nginx + ufw configured on first boot |
| Tags | `Project=coastal-heritage`, `Tier=AlwaysFree` | On all resources |

## After provisioning

Send the public IP back — `deploy/deploy.sh` uploads the site over SSH
(`~/.ssh/coastal_oracle` keypair) and certbot handles HTTPS.
