import { bootstrap } from '@angular/platform-browser-dynamic';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods } from 'angularfire2';
import { App } from './app/authState.component';
import { disableDeprecatedForms, provideForms } from '@angular/forms';


bootstrap(App, [
  FIREBASE_PROVIDERS,
  disableDeprecatedForms(),
    provideForms(),
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