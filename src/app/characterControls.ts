import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import {Camera, Vector3 } from 'three';

export class CharacterControls {

  private pointerLockControls: PointerLockControls
  private moveForward: boolean
  private moveBackward: boolean
  private moveLeft: boolean
  private moveRight: boolean
  private canJump: boolean
  private velocity: Vector3
  private direction: Vector3

  constructor(camera: Camera, controllingElement: HTMLElement) {
    this.pointerLockControls = new PointerLockControls(camera, controllingElement)
    this.moveBackward = false
    this.moveForward = false
    this.moveLeft = false
    this.moveRight = false
    this.canJump = false
    this.velocity = new Vector3()
    this.direction = new Vector3()
    document.addEventListener('click', () => {this.pointerLockControls.lock()})
    document.addEventListener('keydown', (event) => { this.onKeyDown(event)})
    document.addEventListener('keyup',  (event) => {this.onKeyUp(event)})
  }

  public update(delta: number) {
    if (this.pointerLockControls.isLocked) {

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;

      this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
      this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
      this.direction.normalize(); // this ensures consistent movements in all directions

      if ( this.moveForward || this.moveBackward ) this.velocity.z -= this.direction.z * 400.0 * delta;

      this.pointerLockControls.moveRight( - this.velocity.x * delta );
      this.pointerLockControls.moveForward( - this.velocity.z * delta );

     this.pointerLockControls.getObject().position.y += ( this.velocity.y * delta ); // new behavior

      if ( this.pointerLockControls.getObject().position.y < 10 ) {
        this.velocity.y = 0;
        this.pointerLockControls.getObject().position.y = 10;
        this.canJump = true;
      }
    }
  }

  private onKeyDown( event: KeyboardEvent ) : void {
    switch ( event.code ) {

      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = true;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = true;
        break;

      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = true;
        break;

      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = true;
        break;

      case 'Space':
        if ( this.canJump === true ) this.velocity.y += 350;
        this.canJump = false;
        break;

    }
  }

  private onKeyUp( event: KeyboardEvent ) {
    switch ( event.code ) {
      case 'ArrowUp':
      case 'KeyW':
        this.moveForward = false;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        this.moveLeft = false;
        break;

      case 'ArrowDown':
      case 'KeyS':
        this.moveBackward = false;
        break;

      case 'ArrowRight':
      case 'KeyD':
        this.moveRight = false;
        break;
    }
  }

}
