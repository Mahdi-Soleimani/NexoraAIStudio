import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// @ts-ignore
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const IndustrialRobotFlow: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Cleanup existing children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // --- 1. Scene Setup & Industrial Atmosphere ---
    const scene = new THREE.Scene();
    // Dark Slate Blue/Grey for industrial void feel
    const bgColor = 0x0f172a; 
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.015);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 18);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // --- 2. Interaction State (Mouse Tracking & Head Movement) ---
    const mouse = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);
    const windowHalfX = width / 2;
    const windowHalfY = height / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - container.getBoundingClientRect().left - windowHalfX) / 200;
      mouse.y = (event.clientY - container.getBoundingClientRect().top - windowHalfY) / 200;
    };
    container.addEventListener('mousemove', onDocumentMouseMove);

    // Variables for occasional head movement
    let headMoveTime = 0;
    let nextHeadMoveTime = 3 + Math.random() * 4; // Move every 3-7 seconds
    const headTarget = new THREE.Vector2(0, 0);

    // --- 3. Industrial Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Increased ambient light
    scene.add(ambientLight);

    // Key Light (Cool Blue-White) - Industrial Overhead
    const keyLight = new THREE.SpotLight(0xd1e8ff, 30); // Increased intensity
    keyLight.position.set(5, 8, 5);
    keyLight.angle = Math.PI / 4;
    keyLight.penumbra = 0.5;
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill Light (Warm Orange) - Warning/Status lights reflection
    const fillLight = new THREE.PointLight(0xf97316, 4); // Increased intensity
    fillLight.position.set(-5, 2, 2);
    scene.add(fillLight);

    // Rim Light (Sharp Cyan) - Definition
    const rimLight = new THREE.SpotLight(0x06b6d4, 12); // Increased intensity
    rimLight.position.set(0, 5, -8);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // --- 4. Materials (Physically Based) ---
    // Made materials brighter to contrast with background
    
    // Matte Armor (Lighter Grey Paint)
    const armorMat = new THREE.MeshPhysicalMaterial({
        color: 0x64748b, // Lighter Slate Blue
        metalness: 0.3,
        roughness: 0.6,
        clearcoat: 0.2,
    });

    // Exposed Metal (Brighter, more reflective)
    const metalMat = new THREE.MeshStandardMaterial({
        color: 0xcbd5e1, // Light Grey
        metalness: 0.8,
        roughness: 0.2,
    });

    // Black Glossy (Visor/Sensors) - Slightly brighter black
    const sensorMat = new THREE.MeshPhysicalMaterial({
        color: 0x111827,
        metalness: 0.8,
        roughness: 0.1,
        clearcoat: 1.0,
    });

    // Emissive Lights (Status LEDs)
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const orangeGlowMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    // Data Flow Lines
    const dashLineMat = new THREE.LineDashedMaterial({
        color: 0x3b82f6,
        dashSize: 0.4,
        gapSize: 0.2,
        transparent: true,
        opacity: 0.2,
    });

    // --- 5. The Industrial Robot (Detailed Construction) ---
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    // Pivot group for head movement
    const headPivot = new THREE.Group();
    headPivot.position.y = 1.6;
    robotGroup.add(headPivot);

    // A. Head (Monitor Style)
    // Main casing
    const headGeo = new RoundedBoxGeometry(1.6, 1.2, 1.2, 4, 0.1);
    const headMesh = new THREE.Mesh(headGeo, armorMat);
    headPivot.add(headMesh);

    // Face Plate (Sensor Array)
    const faceGeo = new RoundedBoxGeometry(1.3, 0.9, 0.2, 2, 0.05);
    const faceMesh = new THREE.Mesh(faceGeo, sensorMat);
    faceMesh.position.z = 0.55;
    headPivot.add(faceMesh);

    // The "Eye" (Scanning Bar)
    const eyeBarGeo = new THREE.BoxGeometry(1.0, 0.15, 0.05);
    const eyeBar = new THREE.Mesh(eyeBarGeo, cyanGlowMat);
    eyeBar.position.set(0, 0.1, 0.66);
    headPivot.add(eyeBar);

    // Side Vents/Ears
    const earGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    const leftEar = new THREE.Mesh(earGeo, metalMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.85, 0, 0);
    const rightEar = new THREE.Mesh(earGeo, metalMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.85, 0, 0);
    headPivot.add(leftEar, rightEar);

    // Antennas (Asymmetry adds realism)
    const antStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8);
    const antStem = new THREE.Mesh(antStemGeo, metalMat);
    antStem.position.set(0.6, 0.8, -0.3);
    headPivot.add(antStem);
    const antTip = new THREE.Mesh(new THREE.SphereGeometry(0.08), orangeGlowMat);
    antTip.position.set(0.6, 1.2, -0.3);
    headPivot.add(antTip);

    // B. Body (Chassis)
    const torsoGeo = new RoundedBoxGeometry(2.0, 2.2, 1.4, 4, 0.2);
    const torso = new THREE.Mesh(torsoGeo, armorMat);
    torso.position.y = -0.4;
    robotGroup.add(torso);

    // Chest Vents (Industrial Detail)
    const ventGeo = new THREE.BoxGeometry(1.4, 0.1, 0.1);
    for(let i=0; i<3; i++) {
        const vent = new THREE.Mesh(ventGeo, new THREE.MeshStandardMaterial({ color: 0x1e293b }));
        vent.position.set(0, 0.2 - (i * 0.25), 0.71);
        torso.add(vent);
    }

    // Core Power Unit
    const coreHousingGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
    const coreHousing = new THREE.Mesh(coreHousingGeo, metalMat);
    coreHousing.rotation.x = Math.PI / 2;
    coreHousing.position.set(0, -0.6, 0.7);
    torso.add(coreHousing);

    const coreLightGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.22, 32);
    const coreLight = new THREE.Mesh(coreLightGeo, cyanGlowMat);
    coreLight.rotation.x = Math.PI / 2;
    coreLight.position.set(0, -0.6, 0.7);
    torso.add(coreLight);

    // Neck (Hydraulic)
    const neckGeo = new THREE.CylinderGeometry(0.4, 0.6, 0.6, 16);
    const neck = new THREE.Mesh(neckGeo, metalMat);
    neck.position.y = 0.8;
    robotGroup.add(neck);

    // C. Floating Shoulders (Magnetic Suspension)
    const shoulderGeo = new RoundedBoxGeometry(0.8, 1.2, 1.0, 4, 0.1);
    const leftShoulder = new THREE.Mesh(shoulderGeo, armorMat);
    leftShoulder.position.set(-1.6, 0.2, 0);
    const rightShoulder = new THREE.Mesh(shoulderGeo, armorMat);
    rightShoulder.position.set(1.6, 0.2, 0);
    robotGroup.add(leftShoulder, rightShoulder);

    // D. Base Hologram
    const baseRingGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.05, 32);
    const baseRingMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15, wireframe: false });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.position.y = -2.5;
    robotGroup.add(baseRing);
    
    const baseGridHelper = new THREE.GridHelper(5, 10, 0x3b82f6, 0x3b82f6);
    baseGridHelper.position.y = -2.5;
    // @ts-ignore
    baseGridHelper.material.transparent = true;
    // @ts-ignore
    baseGridHelper.material.opacity = 0.2;
    robotGroup.add(baseGridHelper);


    // --- 6. Satellites (Data Nodes) ---
    const createDataNode = (radius: number, angle: number, type: 'cube' | 'prism') => {
        const group = new THREE.Group();
        group.userData = { radius, angle, speed: (Math.random() * 0.002 + 0.001) * (Math.random() > 0.5 ? 1 : -1) };
        group.position.x = Math.cos(angle) * radius;
        group.position.y = Math.sin(angle) * radius;

        const nodeMat = new THREE.MeshPhongMaterial({ color: 0x1e293b, specular: 0x3b82f6, shininess: 30 });
        let mesh;
        if(type === 'cube') {
            mesh = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), nodeMat);
        } else {
            mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.8, 6), nodeMat);
        }
        
        // Add wireframe cage
        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(mesh.geometry),
            new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.5 })
        );
        mesh.add(edges);
        group.add(mesh);

        // Status light
        const light = new THREE.Mesh(new THREE.SphereGeometry(0.1), orangeGlowMat);
        light.position.y = 0.5;
        group.add(light);

        scene.add(group);
        return group;
    };

    const satellites: THREE.Group[] = [];
    satellites.push(createDataNode(5.5, 0, 'cube'));
    satellites.push(createDataNode(5.5, Math.PI, 'prism'));
    satellites.push(createDataNode(8, Math.PI/2, 'cube'));
    satellites.push(createDataNode(8, -Math.PI/2, 'prism'));

    // Orbit Lines
    const createOrbitLine = (radius: number) => {
        const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, 2 * Math.PI, false, 0);
        const points = curve.getPoints(100);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, dashLineMat);
        line.computeLineDistances(); // Crucial for dashed lines
        return line;
    }
    scene.add(createOrbitLine(5.5));
    scene.add(createOrbitLine(8));

    // --- 7. Post Processing ---
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.2; // Only bright things glow
    bloomPass.strength = 1.0;
    bloomPass.radius = 0.8;
    
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // --- 8. Animation Loop ---
    let time = 0;
    let lastTime = performance.now();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      time += deltaTime;
      headMoveTime += deltaTime;

      // 1. Occasional Head Movement Logic
      if (headMoveTime > nextHeadMoveTime) {
        headMoveTime = 0;
        nextHeadMoveTime = 3 + Math.random() * 4;
        // Set a new random target for the head to look at
        headTarget.x = (Math.random() - 0.5) * 0.8;
        headTarget.y = (Math.random() - 0.5) * 1.2;
      }

      // Smoothly interpolate the head rotation towards the target
      headPivot.rotation.x += (headTarget.x - headPivot.rotation.x) * 0.05;
      headPivot.rotation.y += (headTarget.y - headPivot.rotation.y) * 0.05;

      // Body moves slightly to follow head (Action/Reaction)
      robotGroup.rotation.y += (headTarget.y * 0.2 - robotGroup.rotation.y) * 0.02;

      // 2. Idle Animations
      robotGroup.position.y = Math.sin(time * 0.8) * 0.15; // Heavy hover
      leftShoulder.position.y = 0.2 + Math.sin(time + 1) * 0.05;
      rightShoulder.position.y = 0.2 + Math.sin(time + 2) * 0.05;

      // 3. Eye Blink Logic
      const blink = Math.sin(time * 3); // Simple pulse
      if (blink > 0.98) {
        eyeBar.scale.y = 0.1; // Blink
      } else {
        eyeBar.scale.y = 1;
      }

      // 4. Satellites
      satellites.forEach(sat => {
          sat.userData.angle += sat.userData.speed;
          sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
          sat.position.y = Math.sin(sat.userData.angle) * sat.userData.radius;
          sat.rotation.y += 0.01; // Self rotate
          sat.rotation.x += 0.005;
      });

      // 5. Grid Floor movement effect
      baseGridHelper.rotation.z -= 0.002;

      composer.render();
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onDocumentMouseMove);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[500px] bg-slate-900" />;
};

export default IndustrialRobotFlow;