import { Component, Input } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseAuth} from 'angularfire2';

@Component({
  selector: 'registeration-form',
  template: require('./register.component.html'),
  styles: [require('./app.component.scss')],
})

export class RegisterationComponent {
    userData: FirebaseListObservable<any[]>;
    userName: string;
    realName: string;
    registerEmail: string;
    registerPassword: string;
    confirmPassword: string;
    error: boolean;
    errorText: string;

    @Input('loggedIn') loggedIn: boolean;

    ngOnInit() {
        //console.log(this.loggedIn); // object here
    }

    constructor(public af: AngularFire, private _auth: FirebaseAuth) {
        this.userData = af.database.list("/userData");
    }

    signUp() {
        if(this.doPasswordsMatch()) {
            var creds: any = {email: this.registerEmail, password: this.registerPassword};
            this._auth.createUser(creds)
                        .then((success) => {
                            this.error = false;
                            success.auth.sendEmailVerification();  // working!
                            this.addItem(event);
                            this.clear();
                        })
                        .catch((error) => {
                            this.displayError("Firebase failure: " + error);
                        });
        }
        else {
            this.displayError("Passwords do not match.");
        }
    }

    addItem(e: Event) {
        e.preventDefault();
        this.userData.push({
            userName: this.userName,
            realName: this.realName,
            userEmail: this.registerEmail,
        });
    }

    doPasswordsMatch() {
        if(this.registerPassword !== undefined && this.confirmPassword !== undefined && this.registerPassword.toLowerCase() === this.confirmPassword.toLowerCase())
            return true;
        
        return false;
    }

    displayError(err: string) {
        this.error = true;
        this.errorText = err;
    }

    clear() {
        this.userName = "";
        this.realName = "";
        this.registerEmail = "";
        this.registerPassword = "";
        this.confirmPassword = "";
    }
}

