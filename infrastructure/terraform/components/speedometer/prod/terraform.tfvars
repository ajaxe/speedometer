aws_region        = "us-east-1"
aws_profile       = "default"
s3_backend_bucket = "tf.apogee-dev.com"
s3_backend_key    = "speedometer/prod/terraform.tfstate"
environment       = "prod"
deploy_source     = "../../../../../dist/spa"
deploy_bucket     = "speed.apogee-dev.com"
key_prefix        = "/"
