import * as THREE from 'three';

export class Explosion {
  scene: THREE.Scene;
  points: THREE.Points;
  geometry: THREE.BufferGeometry;
  numParticles: number;
  velocities: THREE.Vector3[];
  startPosition: THREE.Vector3;

  constructor(scene: THREE.Scene, numParticles: number = 1000, startPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0)) {
    this.scene = scene;
    this.numParticles = numParticles;
    this.velocities = [];
    this.startPosition = startPosition;
    // Create a geometry
    this.geometry = new THREE.BufferGeometry();

    // Create a material
    const material = new THREE.PointsMaterial({
      size: 0.01,
      vertexColors: true
    });

    // Create an array to store the colors
    const colors = [];

    // Create an array to store the positions
    const positions = [];

    // Create the particles
    for (let i = 0; i < this.numParticles; i++) {
      // Position
      positions.push(startPosition.x, startPosition.y, startPosition.z); // Start at the center

      // Velocity
      const velocity = new THREE.Vector3(Math.random() * 10 - 1, Math.random() * 10 - 1, Math.random() * 10 - 1);
      this.velocities.push(velocity);

      // Color
      const color = new THREE.Color();
      color.setHSL((i / this.numParticles), 1, 0.5); // This will create a gradient from red to white
      colors.push(color.r, color.g, color.b);
    }

    // Set the positions and colors in the geometry
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // Create the points object
    this.points = new THREE.Points(this.geometry, material);

    // Add the points object to your scene
    this.scene.add(this.points);
  }

  animate() {
    // Time when the explosion started
    const startTime = Date.now();

    const animateLoop = () => {
      const elapsedTime = Date.now() - startTime;

      // If 4 seconds have passed, remove the particles
      if (elapsedTime > 4000) {
        this.scene.remove(this.points);
        return;
      }

      // Update the positions and sizes of the particles
      const positionAttribute = this.geometry.getAttribute('position');
      for (let i = 0; i < this.numParticles; i++) {
        const velocity = this.velocities[i];
        positionAttribute.setXYZ(i, positionAttribute.getX(i) + velocity.x * 0.01, positionAttribute.getY(i) + velocity.y * 0.01, positionAttribute.getZ(i) + velocity.z * 0.01);
      }
      positionAttribute.needsUpdate = true;

      requestAnimationFrame(animateLoop);
    }

    animateLoop();
  }
}