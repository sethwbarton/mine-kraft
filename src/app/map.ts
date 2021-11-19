import { Color, Scene } from 'three'
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise'
import { Block } from './block'

const CHUNK_SIZE = 32;

export class Map {

  private scene: Scene
  private noise: SimplexNoise

  constructor(scene: Scene) {
    this.scene = scene
    this.noise = new SimplexNoise()
    this.generateChunk()
  }

  generateChunk() {
    let blocks: Block[][] = []
    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let y = 0; y < CHUNK_SIZE; y++) {
        // generate the z index for this block using the noise function
        let block = new Block(new Color(0xFCCA03))
        block.position.set(x, y, this.noise.noise3d(x,y,0))
        this.scene.add(block)
      }
    }
  }

}
