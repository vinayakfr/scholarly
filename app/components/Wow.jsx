"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RenderTexture,
  PerspectiveCamera,
  Text,
  Edges,
} from "@react-three/drei";

export default function Wow() {
  return (
    <div className="absolute top-12 left-[300px] h-[250px]">
      <Canvas camera={{ position: [7.4, 3.3, 5.3], fov: 25 }}>
        <ambientLight intensity={120} />
        <directionalLight position={[10, 10, 5]} />
        <Cube />
      </Canvas>
    </div>
  );
}

function Cube() {
  const textRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (isHovered && textRef.current) {
      textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 7;
    }
  });

  return (
    <mesh
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial roughness={-1} metalness={0.5} color={"#fff"}>
        <RenderTexture attach="map" anisotropy={16}>
          <PerspectiveCamera makeDefault aspect={1 / 1} position={[0, 0, 5]} />
          <color attach="background" args={["#fff"]} />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 5]} />
          <Text ref={textRef} fontSize={4} color="black">
            Scholarly
          </Text>
        </RenderTexture>
      </meshStandardMaterial>

      <Edges scale={1} threshold={15} color="#222" linewidth={6} />
    </mesh>
  );
}
