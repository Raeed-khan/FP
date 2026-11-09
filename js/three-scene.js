
/* ============================================================
   YOUTH AWARENESS WEBSITE
   ULTRA HYPER CYBER COMMAND - 3D WORLD ENGINE
   Developed by Raeed Khan
   Edition: ULTIMATE 2026
============================================================ */

(function initUltimateCyberWorld() {
    "use strict";

    if (typeof THREE === "undefined") {
        console.error("THREE.js library missing!");
        return;
    }

    const canvas = document.getElementById("three-canvas");
    const container = document.getElementById("three-container");

    if (!canvas || !container) {
        console.warn("3D canvas or container not found.");
        return;
    }

    if (!container.clientWidth || !container.clientHeight) {
        console.warn("3D container has no dimensions.");
        return;
    }

    // ========================================================
    // 01. CORE ENGINE
    // ========================================================

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace ||
        renderer.outputColorSpace;

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ========================================================
    // 02. GLOBAL LIGHTING SYSTEM
    // ========================================================

    scene.add(
        new THREE.AmbientLight(0xffffff, 1.2)
    );

    const cyanLight = new THREE.PointLight(
        0x00e5ff, 5, 20
    );

    cyanLight.position.set(4, 4, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(
        0x8b5cf6, 4, 20
    );

    purpleLight.position.set(-5, -3, 3);
    scene.add(purpleLight);

    const redLight = new THREE.PointLight(
        0xff0055, 2, 15
    );

    redLight.position.set(0, 5, -5);
    scene.add(redLight);

    // ========================================================
    // 03. ADVANCED EARTH GLOBE
    // ========================================================

    const globeGroup = new THREE.Group();
    mainGroup.add(globeGroup);

    const earthGeometry = new THREE.SphereGeometry(
        1.42, 96, 96
    );

    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x020817,
        emissive: 0x001827,
        specular: 0x00e5ff,
        shininess: 90,
        transparent: true,
        opacity: 0.98
    });

    const earth = new THREE.Mesh(
        earthGeometry,
        earthMaterial
    );

    globeGroup.add(earth);

    // ========================================================
    // 04. ATMOSPHERIC CYBER GLOW
    // ========================================================

    const atmosphereGeometry = new THREE.SphereGeometry(
        1.51, 64, 64
    );

    const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x00dfff,
        transparent: true,
        opacity: 0.09,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });

    const atmosphere = new THREE.Mesh(
        atmosphereGeometry,
        atmosphereMaterial
    );

    globeGroup.add(atmosphere);

    // ========================================================
    // 05. DIGITAL EARTH DOT MATRIX
    // ========================================================

    const dotsCount = 4200;
    const dotsGeometry = new THREE.BufferGeometry();

    const dotsPositions = new Float32Array(
        dotsCount * 3
    );

    for (let i = 0; i < dotsCount; i++) {
        const phi = Math.acos(
            -1 + (2 * i) / dotsCount
        );

        const theta = Math.sqrt(
            dotsCount * Math.PI
        ) * phi;

        const radius = 1.455;

        dotsPositions[i * 3] =
            radius * Math.cos(theta) * Math.sin(phi);

        dotsPositions[i * 3 + 1] =
            radius * Math.sin(theta) * Math.sin(phi);

        dotsPositions[i * 3 + 2] =
            radius * Math.cos(phi);
    }

    dotsGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(dotsPositions, 3)
    );

    const dotsMaterial = new THREE.PointsMaterial({
        color: 0x00e5ff,
        size: 0.018,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    const digitalEarth = new THREE.Points(
        dotsGeometry,
        dotsMaterial
    );

    globeGroup.add(digitalEarth);

    // ========================================================
    // 06. GLOBAL CYBER SECURITY NETWORK
    // ========================================================

    const networkGroup = new THREE.Group();
    globeGroup.add(networkGroup);

    const locations = [
        [33.6844, 73.0479],
        [40.7128, -74.0060],
        [51.5074, -0.1278],
        [35.6762, 139.6503],
        [-33.8688, 151.2093],
        [28.6139, 77.2090],
        [25.2048, 55.2708],
        [48.8566, 2.3522],
        [37.5665, 126.9780],
        [-23.5505, -46.6333],
        [30.0444, 31.2357],
        [19.0760, 72.8777]
    ];

    const networkNodes = [];

    function latLonToVector(lat, lon, radius) {
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;

        return new THREE.Vector3(
            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );
    }

    locations.forEach((location, index) => {
        const position = latLonToVector(
            location[0],
            location[1],
            1.49
        );

        const nodeGeometry = new THREE.SphereGeometry(
            0.035, 16, 16
        );

        const nodeMaterial = new THREE.MeshBasicMaterial({
            color: index % 4 === 0 ? 0xff0055 : 0x00e5ff,
            blending: THREE.AdditiveBlending
        });

        const node = new THREE.Mesh(
            nodeGeometry,
            nodeMaterial
        );

        node.position.copy(position);
        networkGroup.add(node);

        networkNodes.push(node);
    });

    // Animated network connections

    const connectionMaterial = new THREE.LineBasicMaterial({
        color: 0x00cfff,
        transparent: true,
        opacity: 0.32
    });

    for (let i = 0; i < networkNodes.length; i++) {
        const next = (i + 1) % networkNodes.length;

        const points = [
            networkNodes[i].position,
            networkNodes[next].position
        ];

        const connectionGeometry =
            new THREE.BufferGeometry().setFromPoints(points);

        const connection = new THREE.Line(
            connectionGeometry,
            connectionMaterial
        );

        networkGroup.add(connection);
    }

    // ========================================================
    // 07. MULTI-LAYER CYBER SHIELD
    // ========================================================

    const shieldGroup = new THREE.Group();
    globeGroup.add(shieldGroup);

    const shieldGeometry = new THREE.IcosahedronGeometry(
        1.7, 2
    );

    const shieldMaterial = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending
    });

    const shield = new THREE.Mesh(
        shieldGeometry,
        shieldMaterial
    );

    shieldGroup.add(shield);

    const shieldInnerGeometry =
        new THREE.IcosahedronGeometry(1.62, 1);

    const shieldInnerMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });

    const shieldInner = new THREE.Mesh(
        shieldInnerGeometry,
        shieldInnerMaterial
    );

    shieldGroup.add(shieldInner);

    // ========================================================
    // 08. ORBITAL ENERGY RINGS
    // ========================================================

    const orbitalGroup = new THREE.Group();
    globeGroup.add(orbitalGroup);

    const ringSettings = [
        {
            radius: 1.9,
            color: 0x00e5ff,
            rotationX: 0.8,
            rotationY: 0.3,
            speed: 0.003
        },
        {
            radius: 2.05,
            color: 0x8b5cf6,
            rotationX: 1.4,
            rotationY: 0.8,
            speed: -0.002
        },
        {
            radius: 2.2,
            color: 0xff0055,
            rotationX: 0.3,
            rotationY: 1.2,
            speed: 0.0015
        }
    ];

    const orbitalRings = [];

    ringSettings.forEach(settings => {
        const geometry = new THREE.TorusGeometry(
            settings.radius,
            0.009,
            12,
            180
        );

        const material = new THREE.MeshBasicMaterial({
            color: settings.color,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending
        });

        const ring = new THREE.Mesh(
            geometry,
            material
        );

        ring.rotation.x = settings.rotationX;
        ring.rotation.y = settings.rotationY;

        orbitalGroup.add(ring);

        orbitalRings.push({
            mesh: ring,
            speed: settings.speed
        });
    });

    // ========================================================
    // 09. ADVANCED RADAR SCANNER
    // ========================================================

    const radarGroup = new THREE.Group();
    globeGroup.add(radarGroup);

    const radarGeometry = new THREE.RingGeometry(
        0.1, 1.53, 96
    );

    const radarMaterial = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
    });

    const radar = new THREE.Mesh(
        radarGeometry,
        radarMaterial
    );

    radar.rotation.x = Math.PI / 2;
    radarGroup.add(radar);

    const radarLineGeometry = new THREE.BufferGeometry();

    const radarLinePoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.5, 0, 0)
    ];

    radarLineGeometry.setFromPoints(radarLinePoints);

    const radarLine = new THREE.Line(
        radarLineGeometry,
        new THREE.LineBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.9
        })
    );

    radarLine.position.y = 0.01;
    radarGroup.add(radarLine);

    // ========================================================
    // 10. FLOATING HOLOGRAPHIC EDUCATION BOOK
    // ========================================================

    const bookGroup = new THREE.Group();
    mainGroup.add(bookGroup);

    bookGroup.position.set(2.25, 1.35, 0.3);

    const bookMaterial = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });

    const pageGeometry = new THREE.BoxGeometry(
        0.42, 0.75, 0.035
    );

    const leftPage = new THREE.Mesh(
        pageGeometry,
        bookMaterial
    );

    leftPage.position.x = -0.21;
    leftPage.rotation.y = 0.35;
    bookGroup.add(leftPage);

    const rightPage = new THREE.Mesh(
        pageGeometry,
        bookMaterial.clone()
    );

    rightPage.position.x = 0.21;
    rightPage.rotation.y = -0.35;
    bookGroup.add(rightPage);

    const spine = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.025, 0.025, 0.76, 16
        ),
        bookMaterial.clone()
    );

    bookGroup.add(spine);

    // ========================================================
    // 11. FLOATING CYBER ENERGY PARTICLES
    // ========================================================

    const particleCount = 700;
    const particleGeometry = new THREE.BufferGeometry();

    const particlePositions = new Float32Array(
        particleCount * 3
    );

    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] =
            (Math.random() - 0.5) * 10;

        particlePositions[i * 3 + 1] =
            (Math.random() - 0.5) * 7;

        particlePositions[i * 3 + 2] =
            (Math.random() - 0.5) * 5;

        particleSpeeds.push(
            0.002 + Math.random() * 0.008
        );
    }

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions, 3
        )
    );

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00dfff,
        size: 0.025,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const energyParticles = new THREE.Points(
        particleGeometry,
        particleMaterial
    );

    mainGroup.add(energyParticles);

    // ========================================================
    // 12. OUTER CYBER HALO
    // ========================================================

    const haloGeometry = new THREE.TorusGeometry(
        2.35, 0.006, 8, 200
    );

    const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.45
    });

    const halo = new THREE.Mesh(
        haloGeometry,
        haloMaterial
    );

    halo.rotation.x = Math.PI / 2.3;
    mainGroup.add(halo);

    // ========================================================
    // 13. MOUSE PARALLAX SYSTEM
    // ========================================================

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    let speedMultiplier = 1;

    function handleMouseMove(event) {
        const rect = container.getBoundingClientRect();

        mouseX =
            ((event.clientX - rect.left) / rect.width - 0.5) * 0.6;

        mouseY =
            ((event.clientY - rect.top) / rect.height - 0.5) * 0.6;

        speedMultiplier = 1.6;
    }

    function handleMouseLeave() {
        mouseX = 0;
        mouseY = 0;
        speedMultiplier = 1;
    }

    container.addEventListener(
        "mousemove", handleMouseMove
    );

    container.addEventListener(
        "mouseleave", handleMouseLeave
    );

    // ========================================================
    // 14. CINEMATIC ANIMATION ENGINE
    // ========================================================

    const clock = new THREE.Clock();

    let animationFrame;
    let isRunning = false;

    function animate() {
        if (!isRunning) return;

        animationFrame = requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        // Globe rotation
        globeGroup.rotation.y +=
            0.0025 * speedMultiplier;

        globeGroup.rotation.x =
            Math.sin(time * 0.3) * 0.035;

        // Digital map movement
        digitalEarth.rotation.y = 0;

        // Cyber shield
        shield.rotation.y -= 0.0018;
        shield.rotation.x += 0.0008;

        shieldInner.rotation.y += 0.0015;

        // Orbital rings
        orbitalRings.forEach(item => {
            item.mesh.rotation.z += item.speed;
        });

        // Radar scanning
        radarGroup.rotation.y += 0.035;

        radarMaterial.opacity =
            0.12 + Math.sin(time * 3) * 0.06;

        radarLine.rotation.y = time * 2;

        // Book floating animation
        bookGroup.position.y =
            1.35 + Math.sin(time * 1.5) * 0.17;

        bookGroup.rotation.y =
            Math.sin(time * 0.8) * 0.25;

        bookGroup.rotation.z =
            Math.sin(time * 0.7) * 0.08;

        // Energy particle animation
        const positions =
            particleGeometry.attributes.position.array;

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3 + 1] += particleSpeeds[i];

            if (positions[i * 3 + 1] > 3.8) {
                positions[i * 3 + 1] = -3.8;
            }
        }

        particleGeometry.attributes.position.needsUpdate = true;

        // Holographic glow
        atmosphereMaterial.opacity =
            0.07 + Math.sin(time * 1.8) * 0.025;

        halo.rotation.z += 0.001;

        // Mouse inertia
        currentX += (mouseY - currentX) * 0.045;
        currentY += (mouseX - currentY) * 0.045;

        mainGroup.rotation.x = currentX;
        mainGroup.rotation.z = -currentY;

        // Dynamic light
        cyanLight.intensity =
            4.5 + Math.sin(time * 2) * 0.8;

        renderer.render(scene, camera);
    }

    function startAnimation() {
        if (isRunning) return;

        isRunning = true;
        clock.start();
        animate();
    }

    function stopAnimation() {
        isRunning = false;
        cancelAnimationFrame(animationFrame);
    }

    // ========================================================
    // 15. RESPONSIVE SCREEN ENGINE
    // ========================================================

    function resizeScene() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (!width || !height) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio || 1, 2)
        );

        if (window.innerWidth < 600) {
            camera.position.z = 9.2;
            bookGroup.position.x = 1.9;
        } else {
            camera.position.z = 7.5;
            bookGroup.position.x = 2.25;
        }
    }

    window.addEventListener("resize", resizeScene);

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                stopAnimation();
            } else {
                startAnimation();
            }
        }
    );

    // ========================================================
    // 16. START ULTIMATE CYBER WORLD
    // ========================================================

    resizeScene();
    startAnimation();

    console.log(
        "%c RAEED KHAN | ULTIMATE CYBER WORLD ACTIVATED ",
        "background:#020617;color:#00e5ff;font-size:14px;font-weight:bold;padding:12px;"
    );

})();
