import { Component, Inject } from '@angular/core';
import { FirebaseAuth } from 'angularfire2';
import { AppComponent } from './app.component'
import { UserDataComponent } from './user-data.component'

@Component({
  selector: 'auth-status',
  template: `
    <!--div *ngIf="loggedIn" (window:focus)="windowFocused()"-->
    <div *ngIf="loggedIn">
      You are logged in here!
      <button (click)="logOutUser()">log out</button>
      <user-data></user-data>
    </div>
    <div *ngIf="loggedIn === false">
      <my-app></my-app>
    </div>
  `,
  directives:[AppComponent, UserDataComponent]
})
export class App {

  loggedIn : boolean;

  constructor (@Inject(FirebaseAuth) public auth: FirebaseAuth) {

    //console.log(this.loggedIn);
      auth.subscribe(auth => {

            if(auth && auth.auth.emailVerified) {
                this.loggedIn = true;
            }
            else
                this.loggedIn = false;

        });

    //   setTimeout(() => {
    //     console.log("Timer")
    //     console.log(this.loggedIn);
    // }, 2000);

  }
  

  logOutUser() {
      this.auth.logout();
    }

  startTimer() {
    var timer = 30;
    var timerInterval = setInterval(function () {
        console.log(timer + " seconds");

        if (--timer < 0) {
            clearInterval(timerInterval);
						var timesUp = true;
            console.log("Time's up!")
        }
    }, 1000);
	return(timerInterval);
}

  windowFocused() {
    var interval = this.startTimer();
  }
}