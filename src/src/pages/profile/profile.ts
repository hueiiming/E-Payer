import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service';
import { PayerPage } from '../payer/payer';
import { Camera } from '@ionic-native/camera';
import { storage, initializeApp } from 'firebase';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user: User;
  private imgSrc;
  constructor(public navCtrl: NavController, private authService: AuthService, private camera: Camera) {
    this.user = this.authService.getCurrentUser();
  }

  getFromCamera() {
    let options = {
      quality: 50,
      targetWidth: 150,
      targetHeight: 150,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imgSrc = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });
  }

  getFromAlbum() {
    let options = {
      quality: 100,
      targetWidth: 150,
      targetHeight: 150,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG
    }

    this.camera.getPicture(options).then((ImageData) => {
      this.imgSrc = 'data:image/jpeg;base64,' + ImageData;
      const pictures = storage().ref('pictures');
    }, (err) => {

    });
  }
  // goToPayer(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(PayerPage);
  // }
}
