# Micro examples

If you wondering how shared works with different package versions [here](https://www.angulararchitects.io/en/blog/getting-out-of-version-mismatch-hell-with-module-federation/) is a good explanation

## Content

- [Getting Started](#getting-started)
- [Working Examples](#working-examples)
  - [18-18](#18-18)
  - [17-18-override-17](#17-18-override-17)
  - [17-18-separate-versions-v1](#17-18-separate-versions-v1)
  - [17-18-separate-versions-v2](#17-18-separate-versions-v2)
- [Not Working](#not-working-examples)
  - [18-18](#18-18-n)
  - [17-18](#17-18-n)
- [Shared Deps Research](#shared-deps-research)
- [bugs](#bugs)
  - [Wrong component resolve](#wrong-component-resolve)
  - [fetched only one remote](#fetched-only-one-remote)

## Getting Started

if you wanna test something go to the folder that you are interested in and run

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
 * REMOTE
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
 * HOST
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

### [17-18-override-17](https://github.com/WuMat/micro-examples/tree/main/react-17-18-working-ovrride-17)

Why this is working if we have totally different react versions?

1. React is singleton here so in runtime accepts only ONE REACT VERSION
2. Remote has a bigger version so WMF always takes the higher one
3. And now the host not using the 17 but the 18 react version

At the beginning of the documentation I paste a link to how it works

```javascript
/**
 * REMOTE React 18
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
      singleton: true
      requiredVersion: pkg.dependencies['react'],
    },
      "react-dom": {
        singleton: true
        requiredVersion: pkg.dependencies['react-dom'],
    }
  },
}
/**
 * HOST React 17
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

This situation is a little bit dangerous because we don't know what react version can we receive! So we can add a flag that can check the react version and if the version aligns with our requirements then everything will work correctly otherwise will throw an error

```javascript
react: {
  singleton: true,
  strictVersion: true,
  requiredVersion: '>=17.0.2 <=18.2.0',
},
```

### [17-18-separate-versions-v1](https://github.com/WuMat/micro-examples/tree/main/react-17-18-working-separate-versions-v1)

the most important is that react 18 creates separate roots for components, also with this approach you can pass props and the component will rerender

```javascript
/**
 * REMOTE
 */

init = (isMounted) => {
  (async () => {
    const { component, children, ...rest } = this.props;
    const reactNode = React.createElement(component, rest, children);
    if (!isMounted) {
      this.root = createRoot(this.refHold);
    }
    this.root.render(reactNode);
  })();
};
```

### [17-18-separate-versions-v2](https://github.com/WuMat/micro-examples/tree/main/react-17-18-working-separate-version-v2)

in this approach, we can easily mount whatever we want and where we want for example in vue, angular app, but we cannot pass props all communication must be outside for example pubsub pattern

```javascript
/**
 * REMOTE
 */

export default function (el) {
  const root = createRoot(el);
  root.render(<SomeComponent />);
}

/**
 * HOST
 */
const refComponent = useRef(null);

useEffect(() => {
  mountSomeComponent(refComponent.current);
}, []);

return <div ref={refComponent} />;
```

## Not Working examples

### [18-18-n](https://github.com/WuMat/micro-examples/tree/main/react-18-18-not-working)

In this example, if we have a dummy component without a hook for example [Button](https://github.com/WuMat/micro-examples/blob/main/react-18-18-not-working/react-18-host/src/components/Button.js) or even a component that only receives props like [ReceiveProps](https://github.com/WuMat/micro-examples/blob/main/react-18-18-not-working/react-18-host/src/components/ReceivedProps.js) everything works correctly, But if something has hooks like [Counter](https://github.com/WuMat/micro-examples/blob/main/react-18-18-not-working/react-18-host/src/components/Counter.js) then we will receive a lot of errors

```javascript
/**
 * REMOTE
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
 * HOST
 */
{
  name: 'app1',
  remotes: {
    app2: 'app2@http://localhost:3002/remoteEntry.js',
  },
}

```

### [17-18-n](https://github.com/WuMat/micro-examples/tree/main/react-17-18-not-working)

it doesn`t matter that the remote has a singleton REACT. The host must accept it as well

```javascript
/**
 * REMOTE React 18
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
      singleton: true
      requiredVersion: pkg.dependencies['react'],
    },
      "react-dom": {
        singleton: true
        requiredVersion: pkg.dependencies['react-dom'],
    }
  },
}
/**
 * HOST React 17
 */
{
  name: 'app1',
  remotes: {
    app2: 'app2@http://localhost:3002/remoteEntry.js',
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

```

## shared-deps-research [link](https://github.com/WuMat/micro-examples/tree/main/shared-deps-research)

In this topic, I try to check the behave application when we have a different moment version, Why moment? because this package has `version` exported prop so I can easily check in runtime what version is used.

In every example, I will use and I will be used shortcuts:

- H - Host
- R(1/2/3) - Remote(1/2/3)

### First fight

- Host: moment 2.0.0
- remote-1: moment 2.0.0

|             | both on | both off | Hon / Roff | Hoff / Ron |
| ----------- | ------- | -------- | ---------- | ---------- |
| requests    | 12      | 12       | 13         | 13         |
| transferred | 206 kb  | 237 kb   | 238 kb     | 238 kb     |
| resources   | 663 kb  | 833 kb   | 834 kb     | 833 kb     |

### Second fight

- Host: moment 2.0.0
- remote-1: moment 2.0.0
- remote-2: moment 2.0.0
- remote-3: moment 2.0.0

|             | all on | all off |
| ----------- | ------ | ------- |
| requests    | 18     | 18      |
| transferred | 298 kb | 329 kb  |
| resources   | 929 kb | 1.1 MB  |

## Bugs

There will be examples of bugs that I found

### fetched only one remote [link](https://github.com/WuMat/micro-examples/tree/main/bug-remote-fetch)

```javascript
// HOST v1
remotes: {
  remote1: 'app@http://localhost:3002/remoteEntry.js',
  remote2: 'app@http://localhost:3003/remoteEntry.js',
  remote3: 'app@http://localhost:3004/remoteEntry.js',
},
// HOST v2
remotes: {
  remote1: 'app@http://localhost:3002/remoteEntry1.js',
  remote2: 'app@http://localhost:3003/remoteEntry1.js',
  remote3: 'app@http://localhost:3004/remoteEntry1.js',
},
// remote 1/2/3 the same
name: 'app',
exposes: {
  './DateRemote': './src/components/DateRemote',
},
```

conclusion

```javascript
// Remote
 name: 'must be unique',
```

### Wrong component resolve [link](https://github.com/WuMat/micro-examples/tree/main/bug-component-resolve)

In this situation, only the component from remote 3 is resolved correctly. Component `DateRemote_2` is replaced by `DateRemote_1`

```javascript
// Remote-1
exposes: {
  './DateRemote1': './src/components/DateRemote',
},
// Remote-2
exposes: {
  './DateRemote2': './src/components/DateRemote',
},
// Remote-3
exposes: {
  './DateRemote': './src/components/DateRemote3',
},

// HOST
remotes: {
  remote1: 'remote1@http://localhost:3002/remoteEntry1.js',
  remote2: 'remote2@http://localhost:3003/remoteEntry2.js',
  remote3: 'remote3@http://localhost:3004/remoteEntry3.js',
},

// Application
const DateRemote_1 = React.lazy(() => import("remote1/DateRemote1"));
const DateRemote_2 = React.lazy(() => import("remote2/DateRemote2"));
const DateRemote_3 = React.lazy(() => import("remote3/DateRemote"));
```

19 requests
329 kB transferred
1.1 MB resources
