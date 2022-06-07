import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayerPage } from '../payer/payer';
import { userData } from '../../providers/user-firebase';
import { Transaction } from '../../models/transaction';
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
    arrayNotif: Transaction[];
    onlyUser1: Transaction[];
    userNotif: Transaction;
   
  constructor(public navCtrl: NavController, private userData: userData, private authService: AuthService) {
    this.arrayNotif = [];
    this.onlyUser1 = [];
    this.userNotif = new Transaction('','','','');
}

  ionViewWillEnter() {
    //this.currentUsername = this.authService.getCurrentUser().username;

    this.userData.retrieveTransaction().then(result => {
        this.arrayNotif = result;
        console.dir(result);
        // console.log(result.indexOf(this.authService.getCurrentUser().username));
        for (let i = 0; i < result.length; i++) {
          if(this.arrayNotif[i].toUsername == this.authService.getCurrentUser().username) {
            this.userNotif = new Transaction(
              this.arrayNotif[i].date,
              this.arrayNotif[i].time,
              this.arrayNotif[i].fromUsername,
              this.arrayNotif[i].toUsername,
              this.arrayNotif[i].moneySent,
              this.arrayNotif[i].notification
              );
              this.onlyUser1.push(this.arrayNotif[i]);
              
              console.log("below is notif");
              console.dir(this.onlyUser1[i]);
              this.userNotif.id = this.arrayNotif[i].id;
              this.userNotif.notification = false;
              this.userData.updateNotif(this.userNotif);
     
              // return this.userNotif;
          }
        }
        this.onlyUser1.reverse();
      });
  }

  close(params) {
    if(!params) params = {};
    this.navCtrl.setRoot(PayerPage);
  }

  goToPayer(params){
    if (!params) params = {};
    this.navCtrl.push(PayerPage);
  }
}