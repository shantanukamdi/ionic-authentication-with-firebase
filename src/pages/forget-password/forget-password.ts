import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  /* Form */
  private forgotPasswordForm: FormGroup;

  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _auth: AuthProvider,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController            
  ) {
    /* Creating form using formBuilder */
    this.forgotPasswordForm = formBuilder.group({
      emailId: [ '', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  /* Reset Password Function */
  resetPassword(){
    /* Loader */
    let loader = this.loadingCtrl.create({
      content: 'Checking Email and Sending Mail'
    });

    loader.present();
    
    /* Creating user object to pass it to forgetPassword method in Auth Service */
    let userEmailId = {
      emailId: this.forgotPasswordForm.value.emailId
    }
    
    /* Calling Auth Service for resetting password */
    this._auth.forgotPassword(userEmailId).then(()=>{
      /* Creating Alert */
      let alert = this.alertCtrl.create({
        title: 'Success',
        message: 'Email containing reset password link sent successfully',
        buttons: ['Ok']
      });

      alert.present();
      loader.dismiss();
      this.navCtrl.pop();

    }, (error) => {
      console.log(error);
      /* Creating Alert */
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: error.message,
        buttons: ['Ok']
      });
      alert.present();
      loader.dismiss();
    });
  }

  /* Navigate to Login */
  navigateToLogin(){
    this.navCtrl.setRoot('LoginWithEmailPage');
  }
}
