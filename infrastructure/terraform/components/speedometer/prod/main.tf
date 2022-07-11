module "main" {
  source = "../../../../../../github-terraform/modules/s3_copy"

  deploy_source = var.deploy_source
  deploy_bucket = var.deploy_bucket
  key_prefix    = var.key_prefix
}
