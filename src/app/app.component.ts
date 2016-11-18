import * as Firebase from 'firebase'
import { Component, Inject } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseAuth, AuthProviders, FirebaseRef} from 'angularfire2';
import { LoginComponent } from './login.component';
import { RegisterationComponent } from './register.component';

import {KeysPipe} from './pipe';


import '../../public/css/styles.scss';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.scss')],
  directives:[LoginComponent, RegisterationComponent],
  pipes: [KeysPipe]
})
export class AppComponent {}