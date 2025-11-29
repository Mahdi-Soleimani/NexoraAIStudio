import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeLogo: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // ذخیره کانتینر در متغیر برای استفاده در cleanup
    const container = mountRef.current;
    
    // --- تنظیمات اولیه ---
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    // تنظیم alpha: true برای شفافیت پس‌زمینه
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // تنظیم رنگ پس‌زمینه به شفاف کامل
    renderer.setClearColor(0x000000, 0);
    // تنظیمات تون مپینگ برای افزایش روشنایی کلی
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.5; // افزایش مقدار برای روشنایی بیشتر
    
    container.appendChild(renderer.domElement);

    // --- کنترل‌ها ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.enableZoom = false;
    controls.enablePan = false;

    // --- نورپردازی (افزایش شدت نورها) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // افزایش شدت نور محیطی
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5); // افزایش شدت نور جهت‌دار
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    // نورهای نقطه‌ای برای ایجاد حجم و سایه روی لوگو
    const blueLight = new THREE.PointLight(0x0055ff, 3, 30); // افزایش شدت و برد نور
    blueLight.position.set(-5, 5, 5);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00ffff, 3, 30); // افزایش شدت و برد نور
    cyanLight.position.set(5, -5, 5);
    scene.add(cyanLight);

    // --- ساخت لوگو ---
    const logoGroup = new THREE.Group();
    // تنظیمات متریال ساده‌تر بدون افکت درخشش
    const materialParams = {
      metalness: 0.5,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 1.0
    };

    const extrudeSettings = {
      steps: 2,
      depth: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelSegments: 3
    };

    // پارت ۱
    const shape1 = new THREE.Shape();
    shape1.moveTo(-4, -4);
    shape1.lineTo(-4, 2); 
    shape1.lineTo(-1, -1);
    shape1.lineTo(-1, -4);
    shape1.lineTo(-4, -4);
    // حذف خاصیت emissive
    const mat1 = new THREE.MeshPhysicalMaterial({ color: 0x001f5c, ...materialParams });
    const mesh1 = new THREE.Mesh(new THREE.ExtrudeGeometry(shape1, extrudeSettings), mat1);
    logoGroup.add(mesh1);

    // پارت ۲
    const shape2 = new THREE.Shape();
    shape2.moveTo(-4, 2);
    shape2.lineTo(-4, 5);
    shape2.lineTo(1, 0);
    shape2.lineTo(1, -3); 
    shape2.lineTo(-1, -1);
    shape2.lineTo(-4, 2);
    // حذف خاصیت emissive
    const mat2 = new THREE.MeshPhysicalMaterial({ color: 0x0099ff, ...materialParams });
    const mesh2 = new THREE.Mesh(new THREE.ExtrudeGeometry(shape2, extrudeSettings), mat2);
    logoGroup.add(mesh2);

    // پارت ۳
    const shape3 = new THREE.Shape();
    shape3.moveTo(1, -3);
    shape3.lineTo(1, 5);
    shape3.lineTo(3.5, 5);
    shape3.lineTo(3.5, -0.5);
    shape3.lineTo(1, -3);
    // حذف خاصیت emissive
    const mat3 = new THREE.MeshPhysicalMaterial({ color: 0x0056b3, ...materialParams });
    const mesh3 = new THREE.Mesh(new THREE.ExtrudeGeometry(shape3, extrudeSettings), mat3);
    logoGroup.add(mesh3);

    // مرکز کردن لوگو
    new THREE.Box3().setFromObject(logoGroup).getCenter(logoGroup.position).multiplyScalar(-1);
    scene.add(logoGroup);

    // --- مدیریت تغییر سایز (Responsive) ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- انیمیشن ---
    let animationId: number;

    const animate = () => {
        animationId = requestAnimationFrame(animate);
        controls.update();
        // رندر کردن صحنه ساده بدون افکت‌های post-processing
        renderer.render(scene, camera);
    };

    animate();

    // --- پاکسازی ---
    return () => {
        cancelAnimationFrame(animationId);
        resizeObserver.disconnect();
        if (container && renderer.domElement) {
            container.removeChild(renderer.domElement);
        }
        renderer.dispose();
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                if (object.material instanceof THREE.Material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(m => m.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            }
        });
    };
  }, []);

  return <div ref={mountRef} className="w-14 h-14 relative" />;
};

export default ThreeLogo;