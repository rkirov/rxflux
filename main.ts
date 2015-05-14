/// <reference path="typings/rx/rx.d.ts" />
import {Subject} from 'rx';
import {textStore, statusStore, storyStore} from './stores';
import {textUpdate, statusUpdate} from './actions';

// Fairly simple view component that outputs to console
class ConsoleComponent {
    constructor() {
        textStore.subscribe(function (text) {
            console.log('text: ', text);
        });
        statusStore.subscribe(function (status) {
            console.log('status: ', status);
        });
        storyStore.subscribe(function (story) {
            console.log('story: ', story);
        });
    }
}

new ConsoleComponent();

statusUpdate.onNext(true);
["testing", 1337, { "test": 1337 }].forEach((v) => textUpdate.onNext(v));
statusUpdate.onNext(false);

