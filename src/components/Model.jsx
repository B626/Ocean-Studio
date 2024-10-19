import { MeshTransmissionMaterial, Text, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Model = ({cameraX, cameraY, cameraZ, introBtn}) => {
  const tl = useRef();
  const text = useRef();
  const model = useRef();
  const group = useRef();
  const material = useRef();

  const [isHovered, setIsHovered] = useState(false)
  const [roughness, setRoughness] = useState(0)

  const { viewport, camera } = useThree();
  const scroll = useScroll()
  const fontUrl = "/Archivo-SemiBold.ttf";

  useFrame((state) => {
    if(isHovered === false){
      model.current.rotation.x += 0.006;
      model.current.rotation.y += 0.006;
      material.current.roughness = Math.cos(state.clock.elapsedTime / 2) / 4;
      setRoughness(Math.cos(state.clock.elapsedTime / 2) / 4)
      material.current.chromaticAberration = 0.04;
    } else {
      model.current.rotation.x += 0.002;
      model.current.rotation.y += 0.002;
      material.current.roughness = roughness;
      material.current.chromaticAberration = 0.08;
    }
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline({
      defaults: { duration: 0.3, ease: "power1.inOut"},
    });

    gsap.to(model.current.scale, { x: 1.8, y: 1.8, z: 1.8 });

    // tl.current.to(camera.position, { x: 20 }, 0.1);
    // tl.current.to(camera.position, { z: 10 }, 0.4);
  }, []);

  useEffect(() => {
    gsap.to(camera.position, { x: cameraX, y: cameraY, z: cameraZ, duration: 1.5 });
  }, [introBtn]);

  const setHover = (arg) => {
    if (arg === true) {
      gsap.to(model.current.scale, { x: 2, y: 2, z: 2 });
      setIsHovered(true)
    } else {
      gsap.to(model.current.scale, { x: 1.8, y: 1.8, z: 1.8 });
      setIsHovered(false);
    }
  };
  
  return (
    <>
      <group ref={group} scale={viewport.width / 12}>
        <Text
          font={fontUrl}
          color="#fff"
          ref={text}
          fontSize={1.7}
          position={[0, 0, -1.8]}
        >
          OCEAN STUDIO
        </Text>
        <mesh
          castShadow
          ref={model}
          scale={0}
          onPointerOver={(e) => setHover(true)}
          onPointerOut={(e) => setHover(false)}
          position={[0, 0, 0.2]}
        >
          <dodecahedronGeometry />
          <MeshTransmissionMaterial
            ref={material}
            thickness={0.26}
            roughness={0.1}
            transmission={0.97}
            ior={1.3}
            chromaticAberration={0.04}
            color={"#ABC7FF"}
            backside={true}
          />
        </mesh>
        <mesh receiveShadow position={[0, -3, 0]} rotation-x={Math.PI / -2}>
          <planeGeometry args={[90, 8]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </group>
      <group position={[16,0,0]}>
        <mesh>
          <sphereGeometry />
          <meshNormalMaterial />
        </mesh>
      </group>
    </>
  );
};

export default Model;
