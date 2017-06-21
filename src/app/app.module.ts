import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
/* For Network Detection*/
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { Logger } from '../providers/logger';
import { CustomToast } from '../providers/custom-toast';
import { AuthProvider } from '../providers/auth';

/* For Firebase Related */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/* Firebase config object. Need to make it dynamic. Temp hack*/
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      //for limiting scrolling of the page when keyboard is up
      scrollAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Logger,
    CustomToast,
    Network,
    AuthProvider,
    AngularFireDatabase
  ]
})
export class AppModule {}
