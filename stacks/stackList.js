var list = require('./listSL');
// list based stack
var stack = (function stackModule() {
	var stackAPI = {
		isEmpty: function isEmpty() {
			return this._list.isEmpty();
		},
		size: function size() {
			return this._list.size();
		},
		push: function push(elem) {
			if(!elem) {
				return false;
			}
			this._list.addFront(elem);
			return true;
		},
		pop: function pop() {
			if (this._list.isEmpty()) {
				throw new Error('Stack underflow');
			}
			return this._list.removeFront();
		},
		peek: function peek() {
			if (this.isEmpty()) {
				return null;
			}
			return this._list.first().data;
		},
		_init: function init() {
			this._list = list();
			return this;
		}
	};

	return function stackGenerator() {
		var stack = Object.create(stackAPI);
		return stack._init();
	};
}());

module.exports = stack;