import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PayPage } from '../pay/pay';
import { ReviewTransactionPage } from '../review-transaction/review-transaction';
import { BookingFacilitiesPage } from '../booking-facilities/booking-facilities';
import { MorePage } from '../more/more';
import { SettingsPage } from '../settings/settings';
import { EditPasswordPage } from '../edit-password/edit-password';
import { ManageAddressPage } from '../manage-address/manage-address';
import { ProfilePage } from '../profile/profile';
import { HistoryPage } from '../history/history';
import firebase from 'firebase';
import { User } from '../../models/user';
import { userData } from '../../providers/user-firebase';
import { ActionSheetController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TopUpPage } from '../top-up/top-up';
import { MyQrPage } from '../myqr/myqr';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { NotificationPage } from '../notification/notification';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'page-payer',
  templateUrl: 'payer.html'
})
export class PayerPage {
  // payerRef = firebase.database().ref('/users/')
  // user: User;
  users: User[];
  trans: Transaction[];
  newTrans: Transaction;
  newUsers: User;
  exportUser: User;
  scannedCode = null;
  notifVal: number;

  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner, public navParams: NavParams, public actionctrl: ActionSheetController, private userData: userData, private authService: AuthService) {
    this.users = [];
    this.trans = [];
    this.newTrans = new Transaction('','','','');
    this.newUsers = new User();

    

  }

  
  ionViewWillEnter() {
    this.userData.retrieveTransaction().then(tResult => {
      this.trans = tResult;
      console.dir(tResult);
      if (isNaN(this.notifVal)) {
        this.notifVal = 0;
      }
      for (let i = 0; i < tResult.length; i++) {
        if(this.trans[i].toUsername == this.authService .getCurrentUser().username) {
          if(this.trans[i].notification == true) {  
            this.notifVal++;
            console.log("adding " + this.notifVal);
          }
            // return this.notifVal;
        }
      }
      sessionStorage.setItem('notif', this.notifVal.toString());
    });
    sessionStorage.removeItem('userAmt');
    this.userData.retrieveAll().then(result => {
      this.users = result;
      console.dir(result);
      // console.log(result.indexOf(this.authService.getCurrentUser().username));
      for (let i = 0; i < result.length; i++) {
        if(this.users[i].email == this.authService.getCurrentUser().email) {
          this.newUsers = new User(
            this.users[i].username,
            this.users[i].email,
            this.users[i].moneyBalance
            );
            this.newUsers.id = this.users[i].id;
            sessionStorage.setItem('userId',this.newUsers.id);
            sessionStorage.setItem('mBalance', this.users[i].moneyBalance);
            console.log("hi: " + this.newUsers.email);
            console.log("current balance: " + this.users[i].moneyBalance)
            return this.newUsers;
        }
      }
    });
    let myDate = new Date();
    console.log("Date: " + myDate);
   
  }

  countNotif() {
    for (let i = 0; i < this.trans.length; i++) {
      if(this.authService.getCurrentUser().username = this.trans[i].fromUsername) {
        this.newTrans = new Transaction(
          this.trans[i].date,
          this.trans[i].time,
          this.trans[i].fromUsername,
          this.trans[i].toUsername,
          this.trans[i].moneySent,
          this.trans[i].notification
          );
          this.newTrans.id = this.trans[i].id;
          
          return this.newTrans;
      }
    }
  }

  showactionsheet() {
    let actionsheet = this.actionctrl.create( {
      title: 'Manage',
      buttons: [
        {
          text: 'Top-Up',
          role: 'topup',
          icon: 'arrow-round-up',
          handler: () => {
            console.log("Opened top-up");
            this.navCtrl.push(TopUpPage);
          }
        },
        {
          text: 'Manage Wallet',
          role: 'managewallet',
          icon: 'card',
          handler:() => {
            console.log("Manage wallet opened");
          }  
        }
      ]
    });

    actionsheet.present();
  }

  scanCode() {

    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.navCtrl.setRoot(PayPage, {
        usernames: barcodeData.text
      });
    });
  }

  goToNotif(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(NotificationPage);
  }

  goToQrPage(params) {
    if (!params) params = {};
    this.navCtrl.push(MyQrPage);
  }
  goToPay(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PayPage);
  }
  goToReviewTransaction(params){
    if (!params) params = {};
    this.navCtrl.push(ReviewTransactionPage);
  }goToPayer(params){
    if (!params) params = {};
    this.navCtrl.push(PayerPage);
  }goToBookingFacilities(params){
    if (!params) params = {};
    this.navCtrl.push(BookingFacilitiesPage);
  }goToMore(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MorePage);
  }goToSettings(params){
    if (!params) params = {};
    this.navCtrl.push(SettingsPage);
  }goToEditPassword(params){
    if (!params) params = {};
    this.navCtrl.push(EditPasswordPage);
  }goToManageAddress(params){
    if (!params) params = {};
    this.navCtrl.push(ManageAddressPage);
  }goToProfile(params){
    if (!params) params = {};
    this.navCtrl.push(ProfilePage);
  }goToHistory(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HistoryPage);
  }
}
