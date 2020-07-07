import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';
import { Position3D } from '../models/position3D';
import * as THREE from 'three';
//import { PickingPlace } from '../models/pickingPlace.model';

@Injectable({ providedIn: 'root' })
export class AddBoxService {
  public boxesOfPallet: Box[] = [];
  public boxesOfPickingPlace: Box[] = [];
  public boxSets: Box;
  //public pps: PickingPlace[] =[];

  public addPosX: number = 0;
  public addPosY: number = 0;
  public centerPosX: number = 0;
  public centerPosY: number = 0;
  public centerPosZ: number = 0;





  //materialofPp = new THREE.PointsMaterial({ color: "hsl(0, 100%, 35%, 0.208)" , size:0.02});

  boxesOfPallet3D = [];
  boxesOfPp3D = [];
  posOfPallet3D: Position3D[] = [];
  posOfPp3D: Position3D[] = [];

  addBox() {
    //place box in center of Picking place or in left bottom corner of Pallet

    if (this.boxSets.membership.search('Picking') == 0) {
      this.centerPosX = 0; //(this.boxSets.width/this.scale)/2;
      this.centerPosY = 0; //(this.boxSets.length/this.scale)/2;
      this.centerPosZ = this.boxSets.heightParent;
    }
    if (this.boxSets.membership.search('Pallet') == 0) {
      this.centerPosX =
        this.boxSets.widthParent / 2 - this.boxSets.width / 2;
      this.centerPosY =
        this.boxSets.lengthParent / 2 - this.boxSets.length / 2;
      this.centerPosZ = this.boxSets.heightParent;
    }



    //changing position of the box when orientation is different than 0deg
    var orientationFactorX =
      this.boxSets.length / 2 -
      this.boxSets.width / 2 ; //this.boxSets.width/this.scale;
    var orientationFactorY =
      this.boxSets.length / 2 -
      this.boxSets.width / 2;

    if (this.boxSets.membership.search('Pallet') == 0) {
      if (this.boxSets.orientation == 0) {
        this.addPosX = 0;
        this.addPosY = 0;
      }
      if (this.boxSets.orientation == 90) {
        this.addPosX = orientationFactorX;
        this.addPosY = -orientationFactorY;
      }
      if (this.boxSets.orientation == 180) {
        this.addPosX = 0;
        this.addPosY = 0;
      }
      if (this.boxSets.orientation == 270) {
        this.addPosX = orientationFactorX;
        this.addPosY = -orientationFactorX;
      }
    }

    let temp = new Box();
    temp.width = this.boxSets.width;
    temp.length = this.boxSets.length;
    temp.height = this.boxSets.height;
    temp.posX = this.boxSets.posX + this.boxSets.posXParent + this.addPosX - this.centerPosX;
    temp.posY = this.boxSets.posY + this.boxSets.posYParent + this.addPosY - this.centerPosY;
    temp.posZ = this.boxSets.posZ + this.boxSets.posZParent;
    temp.orientation = this.boxSets.orientation;
    temp.membership = this.boxSets.membership;
    temp.source = this.boxSets.source;
    temp.color = this.boxSets.color




    //checking if box belongs to parent or Picking place
    if (this.boxSets.membership.search('Pallet') == 0) {
      temp.name = 'BoxOfPallet' + (this.boxesOfPallet.length + 1);
      temp.id = (this.boxesOfPallet.length + 1).toString();
      this.boxesOfPallet.push(temp);
      return this.boxesOfPallet;
    }
    if (this.boxSets.membership.search('Picking') == 0) {
      temp.name = 'BoxOfPp' + (this.boxesOfPickingPlace.length + 1);
      temp.id = (this.boxesOfPickingPlace.length + 1).toString();
      this.boxesOfPickingPlace.push(temp);
      return this.boxesOfPickingPlace;
    }

  }

  addBox3D() {
    const material = new THREE.MeshPhongMaterial({
      color: this.boxSets.color,
    });
      let tempGeometry = new THREE.BoxBufferGeometry(
        this.boxSets.width,
        this.boxSets.height,
        this.boxSets.length,
        10,10,10
      );
      let tempBox3D = new THREE.Mesh(tempGeometry, material);

console.log("w, h, l" + this.boxSets.width + " " + this.boxSets.height + " " + this.boxSets.length)

      if (this.boxSets.membership.search('Pallet') == 0) {
      this.boxesOfPallet3D.push(tempBox3D);
      return this.boxesOfPallet3D;
    }
    if (this.boxSets.membership.search('Picking') == 0) {

      this.boxesOfPp3D.push(tempBox3D);
      return this.boxesOfPp3D;
    }




  }

  addPosition3D() {
    if (this.boxSets.membership.search('Pallet') == 0) {

      let tempPosition3D = new Position3D();
      tempPosition3D.posX =
        this.boxSets.posX +
        this.boxSets.posXParent +
        this.addPosX -
        this.centerPosX;
      tempPosition3D.posY =
        this.boxSets.posY +
        this.boxSets.posYParent +
        this.addPosY -
        this.centerPosY;
      tempPosition3D.posZ =
        this.boxSets.posZ +
        this.boxSets.posZParent +
        this.boxSets.height / 2 +
        this.centerPosZ;
      tempPosition3D.orientation = this.boxSets.orientation;
      this.posOfPallet3D.push(tempPosition3D);




      return this.posOfPallet3D;
    }
    if (this.boxSets.membership.search('Picking') == 0) {
      let tempPosition3D = new Position3D();
      tempPosition3D.posX =
        this.boxSets.posX +
        this.boxSets.posXParent +
        this.addPosX -
        this.centerPosX;
      tempPosition3D.posY =
        this.boxSets.posY +
        this.boxSets.posYParent +
        this.addPosY -
        this.centerPosY;
      tempPosition3D.posZ =
        this.boxSets.posZ +
        this.boxSets.posZParent +
        this.boxSets.height / 2 +
        this.centerPosZ;
      tempPosition3D.orientation = this.boxSets.orientation;
      this.posOfPp3D.push(tempPosition3D);


      console.log("temp.posx: " + tempPosition3D.posX)
      console.log("boxSets.Posx: " + this.boxSets.posX)
      console.log("boxSets.posXParent: " + this.boxSets.posXParent)
      console.log("addPosX: " + this.addPosX)
      console.log("this.centerPosx: " + this.centerPosX)
      console.log("pos x all: " + (
        this.boxSets.posX +
        this.boxSets.posXParent +
        this.addPosX-
        this.centerPosX))

        console.log("typeof" + typeof(this.boxSets.posX) + typeof(this.boxSets.posXParent) +typeof(this.addPosX) +typeof(this.centerPosX))

        console.log("temp.posy: " + tempPosition3D.posY)
        console.log("temp.posz: " + tempPosition3D.posZ)
      return this.posOfPp3D;
    }
  }
}

