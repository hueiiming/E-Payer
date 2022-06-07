import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayerPage } from '../payer/payer';
import { PayPage } from '../pay/pay';
import { ReviewTransactionPage } from '../review-transaction/review-transaction';
import { BookingFacilitiesPage } from '../booking-facilities/booking-facilities';
import { MorePage } from '../more/more';
import { SettingsPage } from '../settings/settings';
import { EditPasswordPage } from '../edit-password/edit-password';
import { ManageAddressPage } from '../manage-address/manage-address';
import { ProfilePage } from '../profile/profile';
import { HistoryPage } from '../history/history';
import { AuthService } from '../../providers/auth-service';
import { User } from '../../models/user';
import firebase from 'firebase';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user: User;
  signupError: string;
  constructor(public navCtrl: NavController, private authService: AuthService) {
    this.user = new User('','','0.00','', true, '', '', false);
  }


  signup() {
    this.authService.signup(this.user.email, this.user.password).then (
      () => {
        this.authService.updateProfile(this.user.username, '').then (
          () => this.navCtrl.setRoot(PayerPage),
          error => this.signupError = error.message
        );
      },
      error => this.signupError = error.message
    );
    firebase.database().ref('/users/').push ({
      username: this.user.username,
      email: this.user.email,
      walletbalance: this.user.moneyBalance
    });
    sessionStorage.setItem('user', this.user.email);
    this.user.loggedIn = true;
  }

  goToPayer(params){
    if (!params) params = {};
    this.navCtrl.push(PayerPage);
  }goToPay(params){
    if (!params) params = {};
    this.navCtrl.push(PayPage);
  }goToReviewTransaction(params){
    if (!params) params = {};
    this.navCtrl.push(ReviewTransactionPage);
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
