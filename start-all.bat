@echo off
start cmd /k "set NODE_OPTIONS=--openssl-legacy-provider && npm run dev"
start cmd /k "npm run backend"
start cmd /k "npm run electron"
