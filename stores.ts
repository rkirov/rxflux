/**
 * Created by rado on 5/13/15.
 */
/// <reference path="typings/rx/rx.d.ts" />
import {Subject} from 'rx';
import * as actions from './actions';

class Store<T> {
    _sub;
    constructor() {
        this._sub = new Subject<T>();
    }
    subscribe(callback) {
        this._sub.subscribe(callback);
    }
}

// why not class TodoStore<T> extends Subject<T> ???
class TodoStore<T> extends Store<T> {
    _textSub;
    constructor() {
        super();
        this._textSub = actions.textUpdate.subscribe(this.output.bind(this));
    }
    output(...args) {
        args.forEach((a) => this.writeOut(a));
    }
    writeOut(text) {
        this._sub.onNext(text);
    }
    dispose() {
        this._textSub.dispose();
    }
}

class StatusStore<T> extends Store<T> {
    _statusSub;
    constructor() {
        super();
        this._statusSub = actions.statusUpdate.subscribe(this.output.bind(this));
    }
    output(flag) {
        var status = flag ? 'ONLINE' : 'OFFLINE';
        this._sub.onNext(status);
    }
}

class StoryStore<T> extends Store<T> {
    _statusSub;
    _textSub;
    _storyArr;
    constructor() {
        super();
        this._statusSub = actions.statusUpdate.subscribe(this.statusChanged.bind(this));
        this._textSub = actions.textUpdate.subscribe(this.textChanged.bind(this));
        this._storyArr = [];
    }
    statusChanged(flag) {
        if (flag == 'OFFLINE') {
            this._sub.onNext(`Once upon a time the user did the following ${this._storyArr.join(',')}`);
        }
        this._storyArr = [];
    }
    textChanged(text) {
        this._storyArr.push(text);
    }
}

export var textStore = new TodoStore<string>();
export var statusStore = new StatusStore();
export var storyStore = new StoryStore();