import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { EditPasswordPage } from '../edit-password/edit-password';
import { ManageAddressPage } from '../manage-address/manage-address';
import { ProfilePage } from '../profile/profile';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { PayerPage } from '../payer/payer';
import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {
  user: User;
  constructor(public navCtrl: NavController) {
  }

  goToProfile(){
    this.navCtrl.push(ProfilePage);
  }

  goToSettings(params){
    if (!params) params = {};
    this.navCtrl.push(SettingsPage);
  }goToEditPassword(params){
    if (!params) params = {};
    this.navCtrl.push(EditPasswordPage);
  }goToManageAddress(params){
    if (!params) params = {};
    this.navCtrl.push(ManageAddressPage);
  }
  goToPayer(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PayerPage);
  }
  goToHistory(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HistoryPage);
  }
  logout() {
    firebase.auth().signOut();
    sessionStorage.removeItem('user');
    this.navCtrl.setRoot(LoginPage);
  }
}
