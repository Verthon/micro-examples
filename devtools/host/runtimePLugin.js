export default function () {
  return {
    name: 'my-runtime-plugin',
    errorLoadRemote(args) {
      console.log('beforeInit: ', args);
      return args;
    },
  };
  }