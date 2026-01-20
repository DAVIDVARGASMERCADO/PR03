import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// --- A. CONFIGURACIÓN BÁSICA ---
//Escene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x805030); // Color de fondo gris oscuro

//1. Camara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5); // Movemos la cámara un poco atrás y arriba

//2. Rende
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Antialias para que se vea suave
renderer.setSize(window.innerWidth, window.innerHeight);
//añadimos este nuevo elemento al DOM
document.body.appendChild(renderer.domElement);

// --- B. LUCES  ---
// Luz ambiental (ilumina todo suavemente)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Luz direccional (como el sol)
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// --- C. OBJETOS ---
// Vamos a crear un cubo pero con material que reaccione a la luz
const geometry = new THREE.CylinderGeometry(1, 1, 3);
const material = new THREE.MeshStandardMaterial({
    color: 0xFF0000,
    roughness: 0.2, // Qué tan áspero es
    metalness: 0.5  // Qué tan metálico es
});

//cuerpo
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);
cylinder.position.set(1, -1, 1);

//cabeza
const skin = new THREE.MeshStandardMaterial({
    color: 0xF79999,
    roughness: 0.5, // Qué tan áspero es
    metalness: 0.0  // Qué tan metálico es
});
const head = new THREE.SphereGeometry();
const sphere = new THREE.Mesh(head, skin);
scene.add(sphere);
sphere.position.set(1, 1.2, 1);

//sombrero
const hatmat = new THREE.MeshStandardMaterial({
    color: 0x3122F2,
    roughness: 0.2, // Qué tan áspero es
    metalness: 0.5  // Qué tan metálico es
});
const hat = new THREE.CylinderGeometry(0.8, 1, 2);
const cubo = new THREE.Mesh(hat, hatmat);
scene.add(cubo);
cubo.position.set(1, 2.8, 1);

//pivote hombros
const shoulder1 = new THREE.Object3D();
const shoulder2 = new THREE.Object3D();

scene.add(shoulder1);
scene.add(shoulder2);

shoulder1.position.set(2.4, 0.5, 1);
shoulder2.position.set(-0.4, 0.5, 1);

//brazo uno
const limbs = new THREE.CylinderGeometry(0.3, 0.3, 3.5);
const arm1 = new THREE.Mesh(limbs, material);
shoulder1.add(arm1);
arm1.position.set(-0.1, -1.75, 0);


//brazo dos
const arm2 = new THREE.Mesh(limbs, material);
shoulder2.add(arm2);
arm2.position.set(0.1, -1.75, 0);

//pierna1
const leg1 = new THREE.Mesh(limbs, material);
scene.add(leg1);
leg1.position.set(0.5, -4, 1);

//pierna2
const leg2 = new THREE.Mesh(limbs, material);
scene.add(leg2);
leg2.position.set(1.5, -4, 1);

//zapato1
const zapato = new THREE.MeshStandardMaterial({
    color: 0x4A1F1A,
    roughness: 0.2, // Qué tan áspero es
    metalness: 0.5  // Qué tan metálico es
});
const pie = new THREE.BoxGeometry(0.5, 0.5, 1);
const pie1 = new THREE.Mesh(pie, zapato);
scene.add(pie1);
pie1.position.set(1.5, -6, 1.2);

//zapato2
const pie2 = new THREE.Mesh(pie, zapato);
scene.add(pie2);
pie2.position.set(0.5, -6, 1.2);

//mano1
const hand = new THREE.SphereGeometry(0.3);
const hand1 = new THREE.Mesh(hand, skin);
arm1.add(hand1)
hand1.position.set(0, -1.75, 0);

//mano2
const hand2 = new THREE.Mesh(hand, skin);
arm2.add(hand2)
hand2.position.set(0, -1.75, 0);

//ojo1
const ojo = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.2, // Qué tan áspero es
    metalness: 0.0  // Qué tan metálico es
});
const eye = new THREE.SphereGeometry(0.1);
const eye1 = new THREE.Mesh(eye, ojo);
scene.add(eye1);
eye1.position.set(1.4, 1.5, 1.9);

//ojo2
const eye2 = new THREE.Mesh(eye, ojo);
scene.add(eye2);
eye2.position.set(0.6, 1.5, 1.9);

//nariz
const nose = new THREE.SphereGeometry(0.2);
const nariz = new THREE.Mesh(nose, skin);
scene.add(nariz);
nariz.position.set(1, 1.3, 2);

//grupo soldado
const soldado = new THREE.Group();


// --- D. CONTROLES (La navegación) ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Añade inercia al movimiento (más suave)

let walkTime = 0;
// --- E. ANIMACIÓN (Game Loop) ---
function animate() {
    requestAnimationFrame(animate);

    walkTime += 0.05;

    const swing = Math.sin(walkTime) * 0.6;

    shoulder1.rotation.x = swing;
    shoulder2.rotation.x = -swing;

    controls.update(); // Necesario por el damping
    renderer.render(scene, camera);
}

animate();

// Ajustar si cambian el tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
