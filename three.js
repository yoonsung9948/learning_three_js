import * as THREE from './node_modules/three/build/three.module.js';

// function main() {
//     const canvas = document.querySelector('#c');
//     const renderer = new THREE.WebGLRenderer({canvas});
//     const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
//     camera.position.z = 2;
//     const scene = new THREE.Scene();
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);
//     renderer.render(scene, camera);
// }
// main();

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGL1Renderer({canvas});
const scene = new THREE.Scene();
const objects = [];
renderer.setSize(window.innerWidth, window.innerHeight, false);
const sphereGeometry = new THREE.SphereGeometry(1, 6, 6);


// solar system
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

// sun
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
objects.push(sunMesh);

// earth orbit
const earthOrbit = new THREE.Object3D();
solarSystem.add(earthOrbit);
objects.push(earthOrbit);
earthOrbit.position.x = 10;

// earth
const earthMeterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMeterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);

// moon orbit
const moonOrbit = new THREE.Object3D();
earthOrbit.add(moonOrbit);
moonOrbit.position.x = 2;
objects.push(moonOrbit);

// moon
const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonOrbit.add(moonMesh);
objects.push(moonMesh);
moonMesh.scale.set(.5, .5, .5);

{
  const color = 0xFFFFFF;
  const intensity = 3;
  const light = new THREE.PointLight(color, intensity);
  scene.add(light);
}

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

function render(time) {
  time *= 0.001;
  if (resizeRendererToDisplaySize(renderer)) {
    const camera = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  objects.forEach(obj => {
    obj.rotation.y = time;
  })

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


// axes helper, grid helper

objects.forEach((node) => {
  const axes = new THREE.AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  node.add(axes);
})