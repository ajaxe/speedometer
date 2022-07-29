module "main" {
  source = "github.com/ajaxe/terraform/modules/s3_copy"

  deploy_source = var.deploy_source
  deploy_bucket = var.deploy_bucket
  key_prefix    = var.key_prefix
}
