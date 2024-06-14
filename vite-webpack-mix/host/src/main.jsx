import React from 'react';
import ReactDOM from 'react-dom';
import { init, preloadRemote } from '@module-federation/enhanced/runtime';
import  App  from './components/App';

init({
  name: '@demo/app-main',
  remotes: [
    {
      name: "remote1",
      entry: "http://localhost:3001/mf-manifest.json",
      alias: "remote1",
    },
    {
      name: "remote2",
      entry: "http://localhost:3002/mf-manifest.json",
      alias: "remote2",

    },
    {
      name: "remote3",
      entry: "http://localhost:3003/mf-manifest.json",
      alias: "remote3",

    },
  ],
  shared: {
    react: {
      version: '17.2.0',
      scope: 'default',
      lib: () => React,
      shareConfig: {
        singleton: true,
        requiredVersion: '18.2.0',
      },
    },
    'react-dom': {
      version: '17.2.0',
      scope: 'default',
      lib: () => ReactDOM,
      shareConfig: {
        singleton: true,
        requiredVersion: '18.2.0',
      },
    },
  },
  plugins: [{
    name: 'elo',
    beforeRequest(args) {
      console.log('beforeRequest: ', args);
      return args;
    },
  }
  ]
});

preloadRemote([
  {
    nameOrAlias: 'remote3',
    filter(assetUrl) {
      return assetUrl.indexOf('ignore') === -1;
    },
    depsRemote: [{ nameOrAlias: '@demo/DateRemote3' }],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
