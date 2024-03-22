# Micro examples

if yuo wondering how shared working with different package version [here](https://www.angulararchitects.io/en/blog/getting-out-of-version-mismatch-hell-with-module-federation/) is a good explanation

## Content

- [Getting Started](#getting-started)
- [Working Examples](#working-examples)
  - [18-18](#18-18)
  - [17-18](#17-18)
- [Not Working](#not-working-examples)
  - [18-18](#18-18-n)

## Getting Started

if you wanna test something go to the folder that you are interested and run

1. Go to the specific folder for example

```bash
cd react-18-18
```

2. Install packages

```bash
npm i
```

2. Start project

```bash
npm run start
```

`host` app should be on `http://localhost:3002/`
`remote` app should be on `http://localhost:3001/`

## Working examples

### [18-18](https://github.com/WuMat/micro-examples/tree/main/react-18-18-working)

```javascript
/**
 * HOST
 */
{
  name: 'app2',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
    './Counter': './src/components/Counter',
    './ReceivedProps': './src/components/ReceivedProps',
    },
  shared: {
    react: {
      requiredVersion: pkg.dependencies['react'],
    },
      "react-dom": {
        requiredVersion: pkg.dependencies['react-dom'],
    }
  },
}
/**
 * Remote
 */
{
  name: 'app1',
  remotes: {
    app2: 'app2@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: pkg.dependencies['react'],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: pkg.dependencies['react-dom'],
    }
  },
}

```

## Not Working examples

### [18-18-n](https://github.com/WuMat/micro-examples/tree/main/react-18-18-not-working)

In this example if we have dummy component without hook for example [Button](https://github.com/WuMat/micro-examples/blob/main/react-18-18-not-working/react-18-host/src/components/Button.js) or even component that only receive props like [ReceiveProps](https://github.com/WuMat/micro-examples/blob/main/react-18-18-not-working/react-18-host/src/components/ReceivedProps.js) everything works correctly, But if something has hooks like [Counter](https://github.com/WuMat/micro-examples/blob/main/react-18-18-not-working/react-18-host/src/components/Counter.js) then we will receive a lot of errors

```javascript
/**
 * HOST
 */
{
  name: 'app2',
  filename: 'remoteEntry.js',
  exposes: {
    './Button': './src/components/Button',
    './Counter': './src/components/Counter',
    './ReceivedProps': './src/components/ReceivedProps',
    },
}
/**
 * Remote
 */
{
  name: 'app1',
  remotes: {
    app2: 'app2@http://localhost:3002/remoteEntry.js',
  },
}

```
