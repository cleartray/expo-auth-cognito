#!/bin/bash
set -euo pipefail

# Install dependencies
npm ci

# TypeScript typecheck
npm run typecheck

# Unit tests
npm test

# Expo checks
npm run expodoctor

# Build for linting check
npm run build
npm run buildlint
