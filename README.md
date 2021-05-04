# kin-sdk-demo-angular

Demo of using the [kin-sdk](https://github.com/kin-sdk/kin-sdk) in a Angular app.

## Steps to get this working

### Enable skipLibCheck

You need to set `"skipLibCheck": true` in tsconfig.

### Add Buffer polyfill

```ts
// In your polyfill file, eg: src/polyfill.ts
;(window as any).global = window
global.Buffer = global.Buffer || require('buffer').Buffer
```

### Patch `buffer-layout` package

There is an incompatibility with the 'buffer-layout' package in Angular.

```
ERROR Error: Uncaught (in promise): Error: Non-base58 character
```

The workaround is to patch `node_modules/buffer-layout/lib/Layout.js`, the patch is in `./patches/buffer-layout+1.2.1.patch`.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```
