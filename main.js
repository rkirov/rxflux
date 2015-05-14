var stores_1 = require('./stores');
var actions_1 = require('./actions');
// Fairly simple view component that outputs to console
var ConsoleComponent = (function () {
    function ConsoleComponent() {
        stores_1.textStore.subscribe(function (text) {
            console.log('text: ', text);
        });
        stores_1.statusStore.subscribe(function (status) {
            console.log('status: ', status);
        });
        stores_1.storyStore.subscribe(function (story) {
            console.log('story: ', story);
        });
    }
    return ConsoleComponent;
})();
new ConsoleComponent();
actions_1.statusUpdate.onNext(true);
["testing", 1337, { "test": 1337 }].forEach(function (v) { return actions_1.textUpdate.onNext(v); });
actions_1.statusUpdate.onNext(false);
//# sourceMappingURL=main.js.map