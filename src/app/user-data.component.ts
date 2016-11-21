import { Component } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'user-data',
  template: require('./user-data.component.html')
})

export class UserDataComponent {
    questionData: FirebaseListObservable<any[]>;
    answerEval: string;
    result: any;

    constructor(public af: AngularFire) {
        this.questionData = af.database.list("/questionData");
        this.questionData.subscribe(result => {
            this.result = result;
        });
    }

    getAnswer(question: any, answer: any) {
        question.answerEval = question.options[answer];
        // console.log(question.answer == answer);
    }

    submitAnswer() {
        
    }

}