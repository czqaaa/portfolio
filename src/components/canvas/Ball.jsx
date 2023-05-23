/* eslint-disable react/no-unknown-property */
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import CanvasLoader from "../Loader";
const Ball = (props) => {
  // console.log([props.icon]);
  const [decal] = useTexture([props.imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1}>
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          map={decal}
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = (props) => {
  const { icon } = props;
  return (
    <Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 0, 0.25]} intensity={0.8} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableDamping={true}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
