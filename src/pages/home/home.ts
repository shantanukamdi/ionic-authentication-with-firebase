import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  user: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _auth: AuthProvider,
              private afd: AngularFireDatabase            
  ) {
    this.user = firebase.auth().currentUser;
    
  }
  ionViewDidLoad(){
  }


  logout(){
    
    this._auth.logout();
    this.navCtrl.setRoot('LoginWithEmailPage');
  }
}