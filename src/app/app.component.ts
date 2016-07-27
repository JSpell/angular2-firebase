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
    error: boolean;
    errorText: string;
    loggedIn : boolean;
    // private _firebase: Firebase;

    constructor(public af: AngularFire, private _auth: FirebaseAuth, @Inject(FirebaseRef) public ref: any) {
        this.userData = af.database.list("/userData");        
        this.userName = "";
        this.realName = "";
        this.userEmail = "";
        this.password = "";
        this.confirmPassword = "";
        this.error = false;
        this.errorText = "";
        this.loggedIn = false;
        // this._firebase = new Firebase("https://trivia-37669.firebaseio.com");
        // console.log(this.ref);

        this._auth.subscribe(auth => {
            if(auth)
                this.loggedIn = true;
            else
                this.loggedIn = false;
        });
    }


  public signUp() {
    if(this.doPasswordsMatch()) {
        var creds: any = {email: this.userEmail, password: this.password};
        this._auth.createUser(creds)
                    .then((success) => {
                        this.error = false;
                        success.auth.sendEmailVerification();  // working!
                        this.addItem(event);
                    })
                    .catch((error) => {
                        this.displayError("Firebase failure: " + error);
                    });
    }
    else {
        this.displayError("Passwords do not match.");
    }
  }

  public login() {
      var creds: any = {email: this.userEmail, password: this.password};
      this._auth.login(creds)
                .then((success) => {
                    // success.auth.sendEmailVerification();  // working!
                    if(success.auth.emailVerified)
                        console.log("Firebase success: " + JSON.stringify(success));
                    else
                        this.displayError("Email not verified");
                })
                .catch((error) => {
                    this.displayError("Firebase failure: " + error);
                });
  }

    addItem(e: Event) {
        e.preventDefault();
        this.userData.push({
            userName: this.userName,
            realName: this.realName,
            userEmail: this.userEmail,
            userPassword: this.confirmPassword
        });
        this.clear();
    }

    doPasswordsMatch() {
        if(this.password.toLowerCase() === this.confirmPassword.toLowerCase())
            return true;
        
        return false;
    }

    public displayError(err: string) {
        this.error = true;
        this.errorText = err;
    }

    clear() {
        this.userName = "";
        this.realName = "";
        this.userEmail = "";
        this.password = "";
        this.confirmPassword = "";
    }
}