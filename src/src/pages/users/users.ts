import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AuthService } from "../../providers/auth-service";
import { userData } from "../../providers/user-firebase";
import { User } from "../../models/user";
import { PayPage } from "../pay/pay";
import { PayerPage } from "../payer/payer";
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class userSearchPage {
  users: User[];
  newUsers: String [];
  user: String [];
  constructor(public navCtrl: NavController, private userData: userData, private authService: AuthService) {
    this.users = [];
    this.newUsers = [];
    this.generateUsers();
  }

  ionViewWillEnter() {
    this.userData.retrieveAll().then(result => {
      this.users = result;
      for (let i = 0; i < result.length; i++) {
        console.log(this.users[i].username);
        if(this.users[i].username != this.authService.getCurrentUser().username) {
          this.newUsers.push(this.users[i].username);
          console.dir("Pushed: " + this.newUsers);
        }
      }
      // console.dir("user array: " + this.newUsers);
    });
  }

  generateUsers() {
    this.user = this.newUsers;
  }

  getUsers(ev:any) {
    console.log("OPENED");
    this.generateUsers();
    let serVal = ev.target.value;
    if(serVal && serVal.trim() != '') {
      this.user = this.user.filter((searchUser) => {
        return (searchUser.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
      });
    }
  }

  goToPay(event, usernames){ 
    this.navCtrl.setRoot(PayPage, {
      usernames:usernames
    });
  }

  close(params) {
    if(!params) params = {};
    this.navCtrl.setRoot(PayPage);
  }

}
