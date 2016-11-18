import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'user-data',
  template: require('./user-data.component.html')
})

export class UserDataComponent {
    questionData: FirebaseListObservable<any[]>;
    answerEval: string;

    constructor(public af: AngularFire) {
        this.questionData = af.database.list("/questionData");
        this.questionData.subscribe(result => {
            console.log(result[0].answer);
        });
    }

    submitAnswer(key: string, answer: string) {
        console.log(answer);
    }

    getAnswer() {
        
    }

}