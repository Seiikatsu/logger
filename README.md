# @seiikatsu/logger

## Description
This project wraps around `pino` to provide a ready-to-use setup for node logging.
The package is primarily designed for my own use case which is logging to the console
and sending the logs to [Grafana Loki](https://grafana.com/oss/loki/).  
The package itself is transpiled as ESM only package as I don't have any use case for CJS.

## Features
- includes TypeScript support
- includes source maps and declaration files
- includes integrations with `pino-pretty` and `pino-loki`

## Requirements
- Node.js (version specified in `.nvmrc`)
- `pnpm` package manager (version specified in `package.json`)
