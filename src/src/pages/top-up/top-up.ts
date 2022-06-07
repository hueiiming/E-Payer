import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayerPage } from '../payer/payer';
import { User } from '../../models/user';
import { userData } from '../../providers/user-firebase';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-top-up',
  templateUrl: 'top-up.html'
})
export class TopUpPage {
  user2: User;
  arrayUser: User[];
  value: number;
  anotherVal: string = "";
  doConvert: number;
  finalConvert: string = "";
  isEnabled: boolean = false;
  constructor(public navCtrl: NavController, private userData: userData, private authService: AuthService) {
    this.user2 = new User;
    this.arrayUser = [];
  }
  
  ionViewWillEnter() {
    this.userData.retrieveAll().then(result => {
      this.arrayUser = result;
      console.dir(result);
      // console.log(result.indexOf(this.authService.getCurrentUser().username));
      for (let i = 0; i < result.length; i++) {
        if(this.arrayUser[i].username == this.authService.getCurrentUser().username) {
          this.user2 = new User(
            this.arrayUser[i].username,
            this.arrayUser[i].email,
            this.arrayUser[i].moneyBalance
            );
            this.user2.id = this.arrayUser[i].id;

        }
      }
    });
  }

  getAmt(ev:any) {

    console.log("entered");
      let serVal = ev.target.value;
      if(serVal.indexOf("S$") != 0) {
        serVal = "S$" + serVal;
      }
     ev.target.value = serVal;
     this.user2.amount = serVal;
     console.log("topping up: " + this.user2.amount);
     sessionStorage.setItem('userAmt1', this.user2.amount);
  }

  checkBlur() {
    if(this.user2.amount != "") {
      let checkAmt = sessionStorage.getItem('userAmt1');
      this.doConvert = +(checkAmt.replace('S$', ''));
      this.finalConvert = "S$" + this.doConvert.toFixed(2);
      this.user2.amount = this.finalConvert;
      this.isEnabled = true;
    }
  }

  cfmTopup() {
    if(this.user2.amount != 'S$0.00') {
      this.user2.username = this.authService.getCurrentUser().username;
      this.anotherVal= this.user2.amount.replace('S$', '');
      console.log("anotherVal: " + this.anotherVal);
      this.user2.amount = this.anotherVal;
      this.value = Number(this.user2.moneyBalance) + Number(this.anotherVal);
      this.user2.moneyBalance = this.value.toFixed(2);
      console.log("doing id: " + this.user2.id);
      console.log("top up final: " + this.user2.moneyBalance);
      this.userData.topUp(this.user2);
      this.userData.updateBalance(this.user2);
      this.navCtrl.setRoot(PayerPage);
    } else {
      alert("You have entered an invalid amount");
      this.isEnabled = false;
    }
    
  }

  goToPayer(params){
    if (!params) params = {};
    this.navCtrl.push(PayerPage);
  }
}
