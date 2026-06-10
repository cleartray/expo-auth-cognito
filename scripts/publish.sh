#!/bin/bash
set -euo pipefail

# Install dependencies
npm ci

# Build
npm run build

# Publish using OIDC Trusted Publisher
npm publish --access public
