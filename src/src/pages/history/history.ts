import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayerPage } from '../payer/payer';
import { Transaction } from '../../models/transaction';
import { AuthService } from '../../providers/auth-service';
import { userData } from '../../providers/user-firebase';
import { Topup } from '../../models/topup';
import { MorePage } from '../more/more';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  arrayNotif: Transaction[];
  topupArray: Transaction[];
  onlyUser: Transaction[];
  useUser: Transaction[];
  userNotif: Transaction;
  currentUsername: string = "";
  
constructor(public navCtrl: NavController, private userData: userData, private authService: AuthService) {
  this.arrayNotif = [];
  this.onlyUser = [];
  this.useUser = [];
  this.topupArray = [];
  this.userNotif = new Transaction('','','','');
}

ionViewWillEnter() {
  
  this.currentUsername = this.authService.getCurrentUser().username;

  this.userData.retrieveTransaction().then(result => {
    // this.userData.retrieveTopup().then(result1 => {
      // this.topupArray = result1;
      this.arrayNotif = result;
      console.log("normal result:");
      console.dir(result);
      console.log("result1 result:");
      // console.dir(result1);
      // console.log(result.indexOf(this.authService.getCurrentUser().username));
      for (let i = 0; i < result.length; i++) {
        // for(let j = 0; j < result1.length; j++) {
          if(this.arrayNotif[i].toUsername == this.authService.getCurrentUser().username || this.arrayNotif[i].fromUsername == this.authService.getCurrentUser().username) {
              this.userNotif = new Transaction(
                this.arrayNotif[i].date,
                this.arrayNotif[i].time,
                this.arrayNotif[i].fromUsername,
                this.arrayNotif[i].toUsername,
                this.arrayNotif[i].moneySent,
                this.arrayNotif[i].notification,
                this.arrayNotif[i].topupAmount,
                this.arrayNotif[i].username
                );
                // if(this.topupArray[j].username == this.arrayNotif[i].fromUsername) {
                //   this.arrayNotif[i].topupAmount = this.topupArray[j].topupAmount;
                //   this.arrayNotif[i].username = this.topupArray[j].username;
                // }
                this.onlyUser.push(this.arrayNotif[i]);
                console.dir(this.onlyUser);
                console.log("below is notif");
                console.dir(this.onlyUser[i]);
                
                
                this.userNotif.id = this.arrayNotif[i].id;
                // if(this.userNotif.notification = true) {
                //   this.userNotif.notification = false;
                //   this.userData.updateNotif(this.userNotif);
                //   }
              }
              
                
                // return this.userNotif;
            }
          // }
          this.useUser = this.onlyUser.reverse();
          console.log("Useuser");
          console.dir(this.useUser);
      });
    // });
     
    // this.userData.retrieveTopup().then(result1 => {
    //   this.topupArray = result1;
    //     console.log("finding topup");
    //     console.dir(result1);
    // }); 
    
}

close(params) {
  if(!params) params = {};
  this.navCtrl.setRoot(PayerPage);
}

goToPayer(params){
  if (!params) params = {};
  this.navCtrl.setRoot(PayerPage);
}
goToMore(params){
  if (!params) params = {};
  this.navCtrl.setRoot(MorePage);
}
}
