# Coastal Heritage — OCI Always Free stack
# Provisions: VCN + subnet + internet gateway + security rules (22/80/443)
#             + Always Free VM (nginx pre-installed via cloud-init) + public IP
#
# Auth: when run in OCI Resource Manager or OCI Cloud Shell, provider auth is
# automatic. For local `terraform` runs, configure the OCI provider
# (tenancy_ocid, user_ocid, fingerprint, private_key_path, region).

terraform {
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = ">= 5.0.0"
    }
  }
}

provider "oci" {
  region = var.region
}

variable "compartment_id" {
  description = "Compartment OCID (use your tenancy OCID for the root compartment)"
  type        = string
}

variable "region" {
  description = "Home region, e.g. af-johannesburg-1"
  type        = string
}

variable "ssh_public_key" {
  description = "Contents of the deploy public key"
  type        = string
}

variable "instance_name" {
  type    = string
  default = "coastal-heritage"
}

variable "shape" {
  description = "Always Free shapes: VM.Standard.E2.1.Micro (AMD x86) or VM.Standard.A1.Flex (ARM)"
  type        = string
  default     = "VM.Standard.E2.1.Micro"
}

variable "shape_ocpus" {
  description = "Only used for A1.Flex (flex shape)"
  type        = number
  default     = 1
}

variable "shape_memory_gb" {
  description = "Only used for A1.Flex (flex shape)"
  type        = number
  default     = 6
}

variable "image_os_version" {
  type    = string
  default = "24.04"
}

locals {
  tags = {
    "Project" = "coastal-heritage"
    "Tier"    = "AlwaysFree"
  }
  is_flex = var.shape == "VM.Standard.A1.Flex"
}

data "oci_identity_availability_domains" "ads" {
  compartment_id = var.compartment_id
}

# ---------- network ----------

resource "oci_core_vcn" "main" {
  compartment_id = var.compartment_id
  cidr_blocks    = ["10.20.0.0/16"]
  display_name   = "${var.instance_name}-vcn"
  dns_label      = "coastalheritage"
  freeform_tags  = local.tags
}

resource "oci_core_internet_gateway" "igw" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.instance_name}-igw"
  freeform_tags  = local.tags
}

resource "oci_core_route_table" "public" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.instance_name}-rt"
  freeform_tags  = local.tags

  route_rules {
    destination       = "0.0.0.0/0"
    network_entity_id = oci_core_internet_gateway.igw.id
  }
}

resource "oci_core_security_list" "web" {
  compartment_id = var.compartment_id
  vcn_id         = oci_core_vcn.main.id
  display_name   = "${var.instance_name}-seclist"
  freeform_tags  = local.tags

  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol    = "all"
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"
    tcp_options {
      min = 22
      max = 22
    }
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 80
      max = 80
    }
  }

  ingress_security_rules {
    protocol = "6"
    source   = "0.0.0.0/0"
    tcp_options {
      min = 443
      max = 443
    }
  }
}

resource "oci_core_subnet" "public" {
  compartment_id    = var.compartment_id
  vcn_id            = oci_core_vcn.main.id
  cidr_block        = "10.20.1.0/24"
  display_name      = "${var.instance_name}-subnet"
  dns_label         = "public"
  route_table_id    = oci_core_route_table.public.id
  security_list_ids = [oci_core_security_list.web.id]
  freeform_tags     = local.tags
}

# ---------- image lookup ----------

data "oci_core_images" "ubuntu" {
  compartment_id           = var.compartment_id
  operating_system         = "Canonical Ubuntu"
  operating_system_version = var.image_os_version
  shape                    = var.shape
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}

# ---------- instance ----------

resource "oci_core_instance" "web" {
  compartment_id      = var.compartment_id
  availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
  display_name        = var.instance_name
  shape               = var.shape
  freeform_tags       = local.tags

  dynamic "shape_config" {
    for_each = local.is_flex ? [1] : []
    content {
      ocpus         = var.shape_ocpus
      memory_in_gbs = var.shape_memory_gb
    }
  }

  source_details {
    source_type             = "image"
    source_id               = data.oci_core_images.ubuntu.images[0].id
    boot_volume_size_in_gbs = 50
  }

  create_vnic_details {
    subnet_id        = oci_core_subnet.public.id
    assign_public_ip = true
    display_name     = "${var.instance_name}-vnic"
  }

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
    user_data           = base64encode(file("${path.module}/cloud-init.yaml"))
  }
}
