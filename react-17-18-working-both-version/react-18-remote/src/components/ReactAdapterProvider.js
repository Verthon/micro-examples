import React  from 'react'
import {createRoot} from 'react-dom/client';


class ReactAdapterProvider extends React.Component {
  constructor(props) {
    super(props);
    this.refHold;
    this.root = null
  }

  init = isMounted => {
    (async () => {
      const { component, children, ...rest } = this.props;
      const reactNode = React.createElement(component, rest, children)
      if(!isMounted){
        this.root = createRoot(this.refHold);
      }
      this.root.render(reactNode)

    })();
  };

  componentDidUpdate() {
    console.log('DID UPDATE')
    this.init(true);
  }

  componentDidMount() {
    console.log('DID MOUNT')
    this.init();
  }

  render() {
    return (
      <>
        React version: {React.version}
        <div ref={ref => (this.refHold = ref)} />
      </>
    );
  }
}

export default ReactAdapterProvider;

// export const ReactAdapter = ({component, children, ...rest})=>{
//   // let root = useRef(10)
//   // const refHold = useRef(0)
//   // useEffect(()=> {
//   //   console.log('USE EFFECT')
//   // },[])

//   return (
//     <div>
//       React version: {React.version} =----
//       {/* <div ref={refHold} /> */}
//     </div>
//   );
// }