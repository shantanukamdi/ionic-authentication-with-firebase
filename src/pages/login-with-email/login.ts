import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginWithEmailPage {

  private loginForm: FormGroup;

  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _auth: AuthProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController
  ) {
    /* Building form  */
    this.loginForm = formBuilder.group({
      emailId: [ '', Validators.compose([Validators.required])],
      password: [ '', Validators.required],
    });
  }
  /* Check for Network - Remaining*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  /* Navigate to Signup */
  navigateToSignup(){
    this.navCtrl.setRoot('SignUp');
  }

  /* Login Method */
  login(){
 
    /* Building user */
    let loginUserData = {
      emailId: this.loginForm.value.emailId,
      password: this.loginForm.value.password
    };

     /* Loader */
    let loader = this.loadingCtrl.create({
      content: 'Authenticating User'
    });

    loader.present();

    /* Calling Auth service method to login the user */
    this._auth.authenticateAndLogin(loginUserData).then(authData => {
      loader.dismiss();
      if(authData.emailVerified){
        /* Navigate to Home Component */    
        this.navCtrl.setRoot('HomePage');
      }else{

          const alert = this.alertCtrl.create({
          title: 'Email not verified',
          message: "Please verify your email address",
          buttons: ['Ok']

        });

         alert.present();
         
      }
    }, (error) => {
        console.log('Error in logging in '+error);

        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'ERROR',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  /* Navigate to Forget Password Component */
  forgotPassword(){
    this.navCtrl.push('ForgetPasswordPage');
  }
}
