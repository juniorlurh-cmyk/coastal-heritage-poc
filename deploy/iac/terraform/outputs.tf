output "public_ip" {
  description = "Public IP of the web VM"
  value       = oci_core_instance.web.public_ip
}

output "instance_ocid" {
  value = oci_core_instance.web.id
}

output "free_domain" {
  description = "Instant free hostname via sslip.io (no registration needed)"
  value       = "coastal-heritage.${replace(oci_core_instance.web.public_ip, ".", "-")}.sslip.io"
}

output "ssh_command" {
  value = "ssh -i ~/.ssh/coastal_oracle ubuntu@${oci_core_instance.web.public_ip}"
}
