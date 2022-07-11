
terraform {
  required_version = ">=0.13"
  backend "s3" {
    bucket  = var.s3_backend_bucket
    key     = var.s3_backend_key
    region  = var.aws_region
    profile = var.aws_profile
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.10.0"
    }
  }
}

provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}
