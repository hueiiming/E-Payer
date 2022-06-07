import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ReviewTransactionPage } from '../review-transaction/review-transaction';
import { PayerPage } from '../payer/payer';
import { BookingFacilitiesPage } from '../booking-facilities/booking-facilities';
import { MorePage } from '../more/more';
import { SettingsPage } from '../settings/settings';
import { EditPasswordPage } from '../edit-password/edit-password';
import { ManageAddressPage } from '../manage-address/manage-address';
import { ProfilePage } from '../profile/profile';
import { HistoryPage } from '../history/history';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service';
import { userData } from '../../providers/user-firebase';
import { userSearchPage } from '../users/users';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html'
})

export class PayPage {
  users: User[];
  filterData = [];
  searchTerm: string = "";
  selectedUser: string = "";
  checkUser: User;
  sendUser: User;
  doConvert: number;
  finalConvert: string = "";
  isEnabled: boolean = false;

  constructor(public navCtrl: NavController, private navParams: NavParams,  private userData: userData, private authService: AuthService) {
    this.users = [];
    this.filterData = [];
    this.checkUser = new User;
    this.sendUser = new User; 
    
    let usernames = navParams.get('usernames');
    console.log("selected user: " + usernames);
    this.selectedUser = usernames;
    this.sendUser = new User(this.selectedUser,'','','', true, '', '');

    
    if(sessionStorage.getItem('userAmt')) {
      this.sendUser.amount = sessionStorage.getItem('userAmt');
    }
    
  }

  get testing() {
    
    return JSON.stringify(this.sendUser);    
  }

  ionViewWillEnter() {
    if(this.sendUser.amount != '' && this.sendUser.amount != 'S$0.00') {
      if(this.selectedUser != '') {
        this.isEnabled = true;
      } else {
        this.isEnabled = false;
      }
    } 
    sessionStorage.setItem('username', this.sendUser.username);
    // sessionStorage.setItem('userAmt', this.sendUser.amount);
    sessionStorage.setItem('userMessage', this.sendUser.message);
    this.userData.retrieveAll().then(result => {
      this.users = result;
      this.filterData = this.users;
     
    });

    
  }

  getAmt(ev:any) {

    console.log("entered");
      let serVal = ev.target.value;
      if(serVal.indexOf("S$") != 0) {
        serVal = "S$" + serVal ;
      }
     
     ev.target.value = serVal;
     this.sendUser.amount = serVal;
     console.log("wheree: " + this.sendUser.amount);
     sessionStorage.setItem('userAmt', this.sendUser.amount);
  }
  
  checkBlur() {
    if(this.sendUser.amount != "") {
      let checkAmt = sessionStorage.getItem('userAmt');
      this.doConvert = +(checkAmt.replace('S$', ''));
      this.finalConvert = "S$" + this.doConvert.toFixed(2);
      this.sendUser.amount = this.finalConvert;
      sessionStorage.setItem('userAmt', this.sendUser.amount);
      this.isEnabled = true;
    }
    
  }

  close(params) {
    if(!params) params = {};
    sessionStorage.removeItem('userAmt');
    this.navCtrl.setRoot(PayerPage);
  }

  goToSearchPage(params) {
    if(!params) params = {};
    this.navCtrl.setRoot(userSearchPage);
  }

  goToReviewTransaction(params){
    if (!params) params = {};
    if(this.sendUser.amount != 'S$0.00') {
      this.navCtrl.push(ReviewTransactionPage);
    } else {
      alert("You have entered an invalid amount");
      this.isEnabled = false;
    }
    
  }
}
