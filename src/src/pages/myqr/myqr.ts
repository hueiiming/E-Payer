import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayerPage } from '../payer/payer';
import { PayPage } from '../pay/pay';
import { BookingFacilitiesPage } from '../booking-facilities/booking-facilities';
import { MorePage } from '../more/more';
import { SettingsPage } from '../settings/settings';
import { EditPasswordPage } from '../edit-password/edit-password';
import { ManageAddressPage } from '../manage-address/manage-address';
import { ProfilePage } from '../profile/profile';
import { HistoryPage } from '../history/history';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../providers/auth-service';


@Component({
  selector: 'page-myqr',
  templateUrl: 'myqr.html'
})
export class MyQrPage {
    qrData = "";
    createdCode = null;
    scannedCode = null;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private authService: AuthService) {
      this.qrData = this.authService.getCurrentUser().username;
  }

  ionViewWillEnter() {
    this.createdCode = this.qrData;
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