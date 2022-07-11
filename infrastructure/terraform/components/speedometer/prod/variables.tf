variable "aws_region" {
  type = string
}
variable "aws_profile" {
  type = string
}
variable "s3_backend_bucket" {
  type = string
}
variable "s3_backend_key" {
  type = string
}
variable "environment" {
  type = string
}
variable "deploy_source" {
  type = string
}
variable "deploy_bucket" {
  type = string
}
variable "key_prefix" {
  type    = string
  default = "/"
}
