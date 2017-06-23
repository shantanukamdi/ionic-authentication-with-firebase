import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';
/* MD5 hash module */
import {Md5} from 'ts-md5/dist/md5';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {

  /* FormGroup which will be used in html */
  private form: FormGroup;
  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _auth: AuthProvider,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
  ) {
    /* Creating form using formBuilder module and applying validations.*/
    this.form = formBuilder.group({
        fullName: [ '', Validators.required],
        emailId: ['', Validators.required],
        password: [ '', Validators.required],
        dob: [''],
        gender: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUp');
  }

  /* Signup user method which is called in click */
  signupUser(){
    /* Creating user object using form values*/
    let userData = {
      fullName: this.form.value.fullName,
      emailId: this.form.value.emailId,
      password: Md5.hashStr(this.form.value.password),
      dob: this.form.value.dob,
      gender: this.form.value.gender
    }

    /* Loader */
    let loader = this.loadingCtrl.create({
      content: 'Registering User'
    });

    loader.present();
    
    /* Auth service registerUser method */
    this._auth.registerUser(userData).then(() => {
      /* Resetting the form once everything is done */
      this.form.reset();
      /* Setting the stack root to login */
      this.navCtrl.setRoot('LoginWithEmailPage');
      /* Dismissing the loader */
      loader.dismiss();
    }, (error) => {
      /* handle the errors in any */
      loader.dismiss();
       const alert = this.alertCtrl.create({
          title: 'Something went wrong!!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
    });
  }

  /* Navigate back to login */
  navigateToLogin(){
    /* For avoiding the stacking of the same page again and again */
    this.navCtrl.setRoot('LoginWithEmailPage');
  }
}
