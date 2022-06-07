import { Component, Inject } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PayerPage } from '../payer/payer';

import { BookingFacilitiesPage } from '../booking-facilities/booking-facilities';
import { MorePage } from '../more/more';
import { SettingsPage } from '../settings/settings';
import { EditPasswordPage } from '../edit-password/edit-password';
import { ManageAddressPage } from '../manage-address/manage-address';
import { ProfilePage } from '../profile/profile';
import { HistoryPage } from '../history/history';
import { User } from '../../models/user';
import { PayPage } from '../pay/pay';
import { userData } from '../../providers/user-firebase';

import { NgForm } from '@angular/forms';
import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-review-transaction',
  templateUrl: 'review-transaction.html'
})
export class ReviewTransactionPage {
  sendUser: User;
  value: number;
  addValue: number;
  addbalance: number;
  mbalance: number;
  amt: number;
  stringValue: string = "";
  stringValue1: string = "";
  errorMessage: string = "";
  newUser: User;
  arrayUser: User[];
  fromUser: User;
  toUser: User;
  constructor(public navCtrl: NavController, private userData: userData, private authService: AuthService) {
    this.sendUser = new User;
    this.newUser = new User;
    this.fromUser = new User;
    this.toUser = new User;
    this.arrayUser = [];
    
  }

  ionViewWillEnter() {

    this.userData.retrieveAll().then(result => {
      this.arrayUser = result;
      console.dir(result);
      // console.log(result.indexOf(this.authService.getCurrentUser().username));
      for (let i = 0; i < result.length; i++) {
        if(this.arrayUser[i].email == this.authService.getCurrentUser().email) {
          this.fromUser = new User(
            this.arrayUser[i].username,
            this.arrayUser[i].email,
            this.arrayUser[i].moneyBalance
            );
            this.fromUser.id = this.arrayUser[i].id;
            return this.fromUser;
        }
      }
    });

    this.userData.retrieveAll().then(result => {
      this.arrayUser = result;
      console.dir(result);
      // console.log(result.indexOf(this.authService.getCurrentUser().username));
      for (let i = 0; i < result.length; i++) {
        if(this.arrayUser[i].username == this.sendUser.username) {
          this.toUser = new User(
            this.arrayUser[i].username,
            this.arrayUser[i].email,
            this.arrayUser[i].moneyBalance
            );
            this.toUser.id = this.arrayUser[i].id;
            return this.toUser;
        }
      }
    });

    this.sendUser.username = sessionStorage.getItem('username');
    this.sendUser.amount = sessionStorage.getItem('userAmt');
    this.sendUser.message = sessionStorage.getItem('userMessage');
    this.fromUser.moneyBalance = sessionStorage.getItem('mBalance');
    this.sendUser.id = sessionStorage.getItem('userId');
    // this.transacionUser = this.PayPage.getTransaction();
    
  }

  update(newUser) {
    this.newUser.id = this.sendUser.id;
    console.log("Inside the ID: " + this.newUser.id);
    this.mbalance = +this.fromUser.moneyBalance;
    console.log("mbalance: " + this.mbalance);
    this.amt = +(this.sendUser.amount.replace('S$',''));
    console.log("amt: " + this.amt);
    this.value = this.mbalance - this.amt;

    this.addbalance = Number(this.toUser.moneyBalance);
    this.addValue = this.addbalance + this.amt;

    if (isNaN(this.value)) {
      this.value = 0;
    }
    // if (isNaN(this.addValue)) {
    //   this.addValue = 0;
    // }
    console.log("value: " + this.value);
    console.log("sentValue: ");

    this.stringValue = this.value.toString();
    this.stringValue1 = this.addValue.toString();

    console.log("newValue: " + this.stringValue);
    console.log("addedValue: " + this.stringValue1);
    this.newUser.moneyBalance = this.stringValue;
    this.toUser.moneyBalance = this.stringValue1;
    
    if(this.value >= 0) {
      console.log("inside update");
      this.userData.updateBalance(this.newUser);
      this.userData.updateBalance(this.toUser);

      this.sendUser.readMessage = true;
      this.userData.addTransaction(this.fromUser, this.sendUser);
      this.navCtrl.setRoot(PayerPage);
    } else {
      this.errorMessage = "Not enough wallet balance.";
    }
    
  }
   
  goToPayer(params){
    if (!params) params = {};
    this.navCtrl.push(PayerPage);
  }goToPay(params){
    if (!params) params = {};
    this.navCtrl.push(PayPage);
 }goToBookingFacilities(params){
    if (!params) params = {};
    this.navCtrl.push(BookingFacilitiesPage);
  }goToMore(params){
    if (!params) params = {};
    this.navCtrl.push(MorePage);
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
    this.navCtrl.push(HistoryPage);
  }
}
