import React, {useMemo} from 'react';

export const ReactAdapter = ({importer, ...rest})=> {
  const Component = useMemo(()=>React.lazy(() =>
    importer().then(component => {
      return {
        default: typeof window == 'undefined' ? null : component.Adapted,
      };
    }),
  ),[])

  return (
    <>
      <React.Suspense fallback="loading">
        <Component {...rest}/>
      </React.Suspense>
    </>
  );
}

// class ReactAdapterConsumer extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { Component: () => null };
  //     this.RemoteComponent = (()=>{ 
  //       console.log('importer', this.props.importer)
  //       return React.lazy(() =>
  //       this.props.importer().then(component => {
  //         return {
  //           // TODO: needs to be tested with SSR
  //           // default: component.Adapted
  //           default: typeof window == 'undefined' ? null : component.Adapted,
  //         };
  //       }),
  //     )})()
  //   }
  
  //   render() {
  //     return (
  //       <>
  //         <React.Suspense fallback="loading">
  //           <this.RemoteComponent {...this.props} />
  //         </React.Suspense>
  //       </>
  //     );
  //   }
  // }
  
  // export default ReactAdapterConsumer;
  