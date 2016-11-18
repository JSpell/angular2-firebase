import { Component, Input } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseAuth} from 'angularfire2';

@Component({
  selector: 'login-form',
  template: require('./login.component.html'),
  styles: [require('./app.component.scss')],
})

export class LoginComponent {
    loginEmail: string;
    loginPassword: string;
    error: boolean;
    errorText: string;
    loggedIn : boolean;

constructor(private _auth: FirebaseAuth) { 
                
        this.loginEmail = "";
        this.loginPassword = "";
        this.error = false;
        this.errorText = "";
        this.loggedIn = false;

        this._auth.subscribe(auth => {
            if(auth && auth.auth.emailVerified) {
                this.loggedIn = true;
            }
            else
                this.loggedIn = false;
        });
    }

    public login() {
        var creds: any = {email: this.loginEmail, password: this.loginPassword};
        this._auth.login(creds)
                    .then((success) => {
                        if(success.auth.emailVerified)
                            console.log("Firebase success: " + JSON.stringify(success));
                        else {
                            this.displayError("Email not verified");
                        }
                    })
                    .catch((error) => {
                        this.displayError("Firebase failure: " + error);
                    });
    }

    logOutUser() {
        this._auth.logout();
    }

    displayError(err: string) {
        this.error = true;
        this.errorText = err;
    }

}