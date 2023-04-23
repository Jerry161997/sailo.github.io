
import { Suspense,useEffect,useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls,Preload,useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';
const Computers = ( {isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')  
  return (

    <mesh>
      <hemisphereLight intensity={1}
      groundColor="black" />
      <pointLight intensity={.75}/>
      <spotLight 
        position={[-20,50,10]}
        angle={0.1}
        penumbra ={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive object={ computer.scene}
        scale={isMobile? 0.005 : 0.007}
        position={isMobile? [1,-1.8,0]:[4,-1.8,-2.5]}
        rotation={[-0.02,0.2,-0.1]}
      />
    </mesh>
    
  )
}

const ComputersCanvas = () => {
  const [isMobile,setIsMobile] = useState(false);



  useEffect(() => {
    const mediaQuery =window.matchMedia('(max-width:500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange =(event)=>{
      setIsMobile(event.matches);
    }
    mediaQuery.addEventListener('change',handleMediaQueryChange);
    
    return()=>{
      mediaQuery.removeEventListener('change',handleMediaQueryChange);
    }
    
  }, [])
  
  
  return (
    <Canvas
    frameloop="demand"
    shadows
    camera={{ position:[20,5,7], fov:25}}
    gl={{ preserveDrawingBuffer: true}}>
    <Suspense fallback={<CanvasLoader/>}>
      <OrbitControls enableZoom={false}
       
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}
      />
      <Computers isMobile={isMobile}/>
    </Suspense>
    <Preload all />
    </Canvas>
  )
}
export default ComputersCanvas; 