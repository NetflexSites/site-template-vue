# Netflex Vue Site Template

## Getting started

### Prerequisites
* Node@^10
* Yarn
* Composer
* Docker

### Installation
#### Install node dependencies
```bash
yarn
```

#### Install php depencies
```bash
composer install
```

### Running the application
#### Start webpack hmr backend
```bash
yarn watch
```

#### Start php backend
```bash
yarn serve
```
Optionally add `--port` flag
```bash
yarn server --port 8000
```

Set `$local` in `Helpers\WebpackAssets` to `true` to enable use of hot module reloading
  

For more information, check out the [developer documentation](https://docs.netflex.dev)
