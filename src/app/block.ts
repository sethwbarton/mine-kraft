import { BoxGeometry, Color, Mesh, MeshBasicMaterial, MeshPhongMaterial } from 'three'

export class Block extends Mesh {
  constructor(color: Color) {
    super();
    // three.js is measured in meters, and so is Minecraft. Each block is 1 cubic meter.
    this.geometry = new BoxGeometry(1, 1, 1);
    this.material = new MeshPhongMaterial({ color });
  }
}
