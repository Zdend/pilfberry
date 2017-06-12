#!/bin/bash
set -e
git pull
yarn
pm2 stop pilfberry
yarn run build
pm2 start pilfberry