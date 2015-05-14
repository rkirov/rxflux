var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by rado on 5/13/15.
 */
/// <reference path="typings/rx/rx.d.ts" />
var rx_1 = require('rx');
var actions = require('./actions');
var Store = (function () {
    function Store() {
        this._sub = new rx_1.Subject();
    }
    Store.prototype.subscribe = function (callback) {
        this._sub.subscribe(callback);
    };
    return Store;
})();
// why not class TodoStore<T> extends Subject<T> ???
var TodoStore = (function (_super) {
    __extends(TodoStore, _super);
    function TodoStore() {
        _super.call(this);
        this._textSub = actions.textUpdate.subscribe(this.output.bind(this));
    }
    TodoStore.prototype.output = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        args.forEach(function (a) { return _this.writeOut(a); });
    };
    TodoStore.prototype.writeOut = function (text) {
        this._sub.onNext(text);
    };
    TodoStore.prototype.dispose = function () {
        this._textSub.dispose();
    };
    return TodoStore;
})(Store);
var StatusStore = (function (_super) {
    __extends(StatusStore, _super);
    function StatusStore() {
        _super.call(this);
        this._statusSub = actions.statusUpdate.subscribe(this.output.bind(this));
    }
    StatusStore.prototype.output = function (flag) {
        var status = flag ? 'ONLINE' : 'OFFLINE';
        this._sub.onNext(status);
    };
    return StatusStore;
})(Store);
var StoryStore = (function (_super) {
    __extends(StoryStore, _super);
    function StoryStore() {
        _super.call(this);
        this._statusSub = actions.statusUpdate.subscribe(this.statusChanged.bind(this));
        this._textSub = actions.textUpdate.subscribe(this.textChanged.bind(this));
        this._storyArr = [];
    }
    StoryStore.prototype.statusChanged = function (flag) {
        if (flag == 'OFFLINE') {
            this._sub.onNext("Once upon a time the user did the following " + this._storyArr.join(','));
        }
        this._storyArr = [];
    };
    StoryStore.prototype.textChanged = function (text) {
        this._storyArr.push(text);
    };
    return StoryStore;
})(Store);
exports.textStore = new TodoStore();
exports.statusStore = new StatusStore();
exports.storyStore = new StoryStore();
//# sourceMappingURL=stores.js.map