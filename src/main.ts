import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods } from 'angularfire2';
import { AppComponent } from './app/app.component';
if (process.env.ENV === 'production') {
  enableProdMode();
}
bootstrap(AppComponent, [
  FIREBASE_PROVIDERS,
  // Initialize Firebase app  
  defaultFirebase({
    apiKey: "AIzaSyD62AjtNiXO4eAhXTa6v-g1JmjVeT58tLY",
    authDomain: "trivia-37669.firebaseapp.com",
    databaseURL: "https://trivia-37669.firebaseio.com",
    storageBucket: "trivia-37669.appspot.com",
  }),
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
    remember: 'default',
    scope: ['email']
  })
]);