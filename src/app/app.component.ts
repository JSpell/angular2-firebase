import * as Firebase from 'firebase'
import { Component, Inject } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseAuth, AuthProviders, FirebaseRef} from 'angularfire2';


import '../../public/css/styles.scss';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')]
})
export class AppComponent {
    userData: FirebaseListObservable<any[]>;
    questionData: FirebaseListObservable<any[]>;
    userName: string;
    realName: string;
    userEmail: string;
    questionText: string;
    db: any;
    password: string;
    confirmPassword: string;
    // private _firebase: Firebase;

    constructor(public af: AngularFire, private _auth: FirebaseAuth, @Inject(FirebaseRef) public ref: any) {
        this.userData = af.database.list("/userData");        
        this.userName = "";
        this.realName = "";
        this.userEmail = "";
        this.password = "";
        this.confirmPassword = "";
        // this._firebase = new Firebase("https://trivia-37669.firebaseio.com");
        // console.log(this.ref);
    }


  public signUp() {
    var creds: any = {email: this.userEmail, password: this.password};
    this._auth.createUser(creds)
                .then((success) => {
                    success.auth.sendEmailVerification();  // working!
                    this.addItem(event);
                })
                .catch((error) => {
                    console.log("Firebase failure: " + error);
                });
  }

  public login() {
      var creds: any = {email: this.userEmail, password: this.password};
      this._auth.login(creds)
                .then((success) => {
                    // success.auth.sendEmailVerification();  // working!
                    if(success.auth.emailVerified)
                        console.log("Firebase success: " + JSON.stringify(success));
                    else
                        console.log("Email not verified");
                })
                .catch((error) => {
                    console.log("Firebase failure: " + error);
                });
  }

    addItem(e: Event) {
        e.preventDefault();
        this.userData.push({
            userName: this.userName,
            realName: this.realName,
            userEmail: this.userEmail
        });
        this.clear();
    }

    doPasswordsMatch() {
        if(this.password.toLowerCase === this.confirmPassword.toLowerCase)
            return true;
    }

    clear() {
        this.userName = "";
        this.realName = "";
        this.userEmail = "";
        this.password = "";
    }
}