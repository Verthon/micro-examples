# Micro examples

## Content

- [Getting Started](#getting-started)
- [Working Examples](#working-examples)
  - [18-18](#18-18)
- [Not Working](#not-working-examples)
  - [18-18](#18-18)

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

`host` app should be on `http://localhost:3001/`
`remote` app should be on `http://localhost:3002/`

## Working examples

### 18-18

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
