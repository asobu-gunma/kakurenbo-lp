#! /bin/sh

set -ex

export ENV=$1

s3_path="s3://kakurenbo-lp"

yarn install

if [ -n "$ENV" -a "$ENV" = "staging" ]; then
  yarn generate:stag
elif [ -n "$ENV" -a "$ENV" = "production" ]; then
  yarn generate
fi

aws s3 sync dist ${s3_path} --delete
