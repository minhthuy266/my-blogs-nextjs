#!/bin/bash

# Cài đặt libvips và các thư viện cần thiết
apt-get update
apt-get install -y libvips-dev

# Cài đặt các dependencies của npm
npm install
