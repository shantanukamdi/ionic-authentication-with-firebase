import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';

import { MyApp } from './app.component';
import { Logger } from '../providers/logger';
import { AuthProvider } from '../providers/auth';

/* For Firebase Related */
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

/* Firebase config object. Need to make it dynamic. Temp hack*/
const firebaseConfig = {
    apiKey: "AIzaSyD11K6nGvgYWyQLeQBNaiICZT-890B5dMM",
    authDomain: "demoproject-e1f34.firebaseapp.com",
    databaseURL: "https://demoproject-e1f34.firebaseio.com",
    projectId: "demoproject-e1f34",
    storageBucket: "demoproject-e1f34.appspot.com",
    messagingSenderId: "556861337720"
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
    AuthProvider,
    AngularFireDatabase
  ]
})
export class AppModule {}
