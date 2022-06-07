import { Injectable } from "@angular/core";
import firebase from "firebase";
import { User } from "../models/user";
import { Transaction } from "../models/transaction";
import { Topup } from "../models/topup";

@Injectable()
export class userData {
    payerRef = firebase.database().ref('/users/');
    transRef = firebase.database().ref('/transactions/');
    topupRef = firebase.database().ref('/topup/');
    constructor() {

    }   

    updateBalance(newUser: User) {
      console.log("userId: " + newUser.id);
      let userRef = firebase.database().ref('users/' + newUser.id);
      let newValue = {
        'walletbalance': newUser.moneyBalance
      };
      userRef.update(newValue); 
    }

    updateNotif(newTrans: Transaction) {
      let transRef = firebase.database().ref('transactions/' + newTrans.id);
      console.log("transId: " + newTrans.id);
      console.log("updating to: " + newTrans.notification);
      let newValue = {
        'Notification': newTrans.notification
      };
      transRef.update(newValue);
      console.log("Done");
    }

    addTransaction(fromUser:User, toUser: User) {
      let myDate = new Date();
      var date = myDate.getDate()+'-' + (myDate.getMonth()+1) + '-' + myDate.getFullYear();
      let myTime = myDate.getHours() > 12 ? myDate.getHours() - 12 : myDate.getHours();
      // myDate.getHours() - (myDate.getHours() >= 12 ? 12 : 0);
      let period = myDate.getHours() >= 12 ? 'PM' : 'AM';
      let time = myTime + ':' + myDate.getMinutes() + ' ' + period;
      firebase.database().ref('/transactions/').push({
        Date: date,
        Time: time,
        From: fromUser.username,
        To: toUser.username,
        Money_Sent: toUser.amount,
        Notification: toUser.readMessage
      });
    }

    topUp(tpUser: User) {
      firebase.database().ref('/topup').push({
        username: tpUser.username,
        top_up_amount: tpUser.amount
        // top_up_date: tpUser.topupDate,
        // top_up_time: tpUser.topupTime
      });
    }
    
    
    retrieveAll() {
        return this.payerRef.once('value').then(
          snapshot => this.snapShotToUserList(snapshot)
        );
      }
    
      snapShotToUserList(snapshot: firebase.database.DataSnapshot) {
        let userList = [];
        let balance: number;
        let newBalance: string = "";
        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let user = new User(
            childData.username,
            childData.email,
            childData.walletbalance
          );
          
          balance = Number(user.moneyBalance);
          newBalance = balance.toFixed(2);
          user.moneyBalance = newBalance;
          console.log("GETTING wallet: " + user.moneyBalance);
          user.id = childKey;
          userList.push(user);
         });
         return userList;
      }

      

      retrieveTransaction() {
        return this.transRef.once('value').then(
          snapshot => this.snapShotToTransList(snapshot)
        );
      }
    
      snapShotToTransList(snapshot: firebase.database.DataSnapshot) {
        let transList = [];
        let balance: number;
        let newBalance: string = "";
        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let trans = new Transaction(
            childData.Date,
            childData.Time,
            childData.From,
            childData.To,
            childData.Money_Sent,
            childData.Notification
          );
          balance = Number(trans.moneySent.replace('S$',''));
          console.log("ISIT BALANCE: " + balance); 
          newBalance = balance.toFixed(2);
          trans.moneySent = newBalance;
          trans.id = childKey;
          transList.push(trans);
         });
         return transList;
      }

      retrieveTopup() {
        console.log(("finding topup"));
        return this.topupRef.once('value').then(
          snapshot => this.snapShotToTopupList(snapshot)
        );
      }

      snapShotToTopupList(snapshot: firebase.database.DataSnapshot) {
        
        let topupList = [];
        // let balance: number;
        // let newBalance: string = "";
        snapshot.forEach(function (childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          let topup = new Transaction(
            '',
            '',
            '',
            '',
            '',
            true,
            childData.top_up_amount,
            childData.username
          );
          console.log("Inside the topup: " + topup.topupAmount);
          // balance = Number(topup.amount);
          // console.log("ISIT BALANCE: " + balance);
          // newBalance = balance.toFixed(2);
          // topup.amount = newBalance;
          topup.tid = childKey;
          topupList.push(topup);
         });
         return topupList;
      }
}

    