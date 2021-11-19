import { AmbientLight, Clock, Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { CharacterControls } from './characterControls'
import { Map } from './map'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class App {
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 10000);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  });

  private clock: Clock
  private controls: OrbitControls
  private map: Map

  constructor() {

    // 64 is sea level
    this.camera.position.set(0, 64, 0);

    // TODO: Later, we'll have to swap this for a player controls and add in collision detection. But I need to be able to fly around the world for now.
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 100;
    this.controls.maxDistance = 1500;

    // Adding in a white ambient light
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new AmbientLight(color, intensity);
    this.scene.add(light);

    this.camera.lookAt(new Vector3(0, 0, 0));
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color('rgb(0,0,0)'));
    this.clock = new Clock()
    this.render();

    this.map = new Map(this.scene);
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
    this.adjustCanvasSize();
  }
}
