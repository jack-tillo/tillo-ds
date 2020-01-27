# tillo-ds

Tillo Component library

## Install

For all components

```bash
npm install @tillo/core
```

For individual components

* [button](./packages/Button/README.md)
* [text-input](./packages/TextInput/README.md)

## Development

Install dependencies

```bash
npm install
```

Run storybook during dev

```bash
npm run storybook:dev
```

## Building and publishing

1. Build all packages

```bash
npm run build
```

2. Commit changes

3. Publish changes

```bash
npm run publish
```

### Select the correct version

* `patch` for fixes only
* `minor` for non-breaking changes
* `major` for breaking changes

You can also use `pre-patch` for release candidates and testing. e.g `v0.1.2-rc1`
