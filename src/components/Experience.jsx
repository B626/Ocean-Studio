import {
  Environment,
  useHelper,
  ScrollControls,
  Scroll,
  useScroll,
  MeshTransmissionMaterial,
  Text,
} from "@react-three/drei";
import React, { Suspense, useRef, useState, useLayoutEffect } from "react";
import { DirectionalLightHelper } from "three";
import gsap from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model from "./Model";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [cameraX, setCameraX] = useState(0)
  const [cameraY, setCameraY] = useState(0);
  const [cameraZ, setCameraZ] = useState(5);
  const [introBtn, setIntroBtn] = useState(false)
  const directionalLight = useRef();
  const introSection = useRef()
  const aboutSection = useRef();

  const handleHeroClick = () => {
    setCameraX(20)
    setIntroBtn(true)
    const tl = gsap.timeline()
    tl.to(aboutSection.current, { opacity: 0 });
    tl.to(introSection.current, { opacity: 0, duration: 0.5 })
    tl.to(introSection.current, { display: "none" })
    tl.to(aboutSection.current, { opacity: 1, duration: 0.5 })
    // introSection.current.style.display = "none"
  }

  useGSAP(() => {
    gsap.to(aboutSection.current, { opacity: 1, duration: 0.5 });
  })

  // useHelper(directionalLight, DirectionalLightHelper, 3, "red");
  return (
    <>
      <Environment
        backgroundBlurriness={10}
        environmentIntensity={1}
        files={["/ocean2.hdr"]}
      />
      <directionalLight
        ref={directionalLight}
        position={[0, 4, 3.4]}
        scale={1.8}
        color={"white"}
        intensity={0.3}
        castShadow
      />
      <ambientLight intensity={1} />
      <ScrollControls damping={0.3} pages={3}>
        <Suspense fallback={null}>
          <Model cameraX={cameraX} cameraY={cameraY} cameraZ={cameraZ} introBtn={introBtn} />
        </Suspense>
        <Scroll html style={{ width: "100%"}}>
          <div className="w-[100vw] overflow-hidden">
            <div className="relative h-screen min-w-[100vw]" ref={introSection}>
              <div className="max-w-[1420px] m-[0_auto] p-[0_15px]">
                <div className="w-[100%] h-screen  flex items-center">
                  <div className="w-[100%] flex justify-between pt-[280px]">
                    <div>
                      <p className="tracking-[3px] text-[20px] mb-[15px]">
                        Your design studio
                      </p>
                      <a
                        href="#"
                        onClick={(e) => handleHeroClick(e)}
                        className="text-[25px] text-[#06187A] p-[9px_18px] bg-[#fff] inline-block rounded-[20px] relative z-[7]"
                      >
                        Contact us
                      </a>
                    </div>
                    <div>
                      <p className="text-right max-w-[310px] text-[20px]">
                        Lorem ipsum dolor sit amet consectetur. Est interdum
                        tellus lectus pharetra. Ultrices porttitor augue Augue
                        fermentum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-screen min-h-[100vh] opacity-[1]" ref={aboutSection}>
              <div className="max-w-[1420px] m-[0_auto] p-[0_15px] flex justify-end items-center h-screen">
                <div className="max-w-[500px]">
                  <h2 className="text-[60px] text-[#fff]">Experience future</h2>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" by
                    Cicero, written in 45 BC. This book is a treatise on the
                    theory of ethics, very popular during the Renaissance. The
                    first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                    comes from a line in section 1.10.32.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Scroll>
      </ScrollControls>
    </>
  );
};

export default Experience;
