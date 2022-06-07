import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PayerPage } from '../pages/payer/payer';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MorePage } from '../pages/more/more';
import { SettingsPage } from '../pages/settings/settings';
import { PayPage } from '../pages/pay/pay';
import { ReviewTransactionPage } from '../pages/review-transaction/review-transaction';
import { EditPasswordPage } from '../pages/edit-password/edit-password';
import { ManageAddressPage } from '../pages/manage-address/manage-address';
import { AddAddressPage } from '../pages/add-address/add-address';
import { EditAddressPage } from '../pages/edit-address/edit-address';
import { BookingFacilitiesPage } from '../pages/booking-facilities/booking-facilities';
import { TopUpPage } from '../pages/top-up/top-up';
import { HistoryPage } from '../pages/history/history';
import { ProfilePage } from '../pages/profile/profile';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
import { userData } from '../providers/user-firebase';
import { userSearchPage } from '../pages/users/users';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyQrPage } from '../pages/myqr/myqr';
import { FormsModule } from '@angular/forms';
import { NotificationPage } from '../pages/notification/notification';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    PayerPage,
    LoginPage,
    SignupPage,
    MorePage,
    SettingsPage,
    PayPage,
    ReviewTransactionPage,
    EditPasswordPage,
    ManageAddressPage,
    AddAddressPage,
    EditAddressPage,
    BookingFacilitiesPage,
    TopUpPage,
    HistoryPage,
    ProfilePage,
    userSearchPage,
    MyQrPage,
    NotificationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PayerPage,
    LoginPage,
    SignupPage,
    MorePage,
    SettingsPage,
    PayPage,
    ReviewTransactionPage,
    EditPasswordPage,
    ManageAddressPage,
    AddAddressPage,
    EditAddressPage,
    BookingFacilitiesPage,
    TopUpPage,
    HistoryPage,
    ProfilePage,
    userSearchPage,
    MyQrPage,
    NotificationPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    AuthService,
    userData,
    PayPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner
  ]
})
export class AppModule {}