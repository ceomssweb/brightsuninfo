import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { getStorage } from 'firebase/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { PrivacyModule } from './privacy/privacy.module';

const firebaseConfig = {
  apiKey: "AIzaSyAnuAN2n29tx5dp7uE5bk9QzwF-a4J4MIU",
  authDomain: "brightsun-6edca.firebaseapp.com",
  databaseURL: "https://brightsun-6edca-default-rtdb.firebaseio.com",
  projectId: "brightsun-6edca",
  storageBucket: "brightsun-6edca.appspot.com",
  messagingSenderId: "165734431706",
  appId: "1:165734431706:web:e8c9a9883b4d4020a85ee3",
  measurementId: "G-K5MVMDS1SX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    HttpClientModule,
    PrivacyModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
