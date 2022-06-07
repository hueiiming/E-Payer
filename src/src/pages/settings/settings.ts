import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditPasswordPage } from '../edit-password/edit-password';
import { ManageAddressPage } from '../manage-address/manage-address';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {
  }
  goToEditPassword(params){
    if (!params) params = {};
    this.navCtrl.push(EditPasswordPage);
  }goToManageAddress(params){
    if (!params) params = {};
    this.navCtrl.push(ManageAddressPage);
  }
}
