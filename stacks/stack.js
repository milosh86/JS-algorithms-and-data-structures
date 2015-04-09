/**
* A set of different stack implementations in JS
*/

// Simple array based stack
var stackArr = (function stackModule() {
	function push(elem) {
		return this._arr.push(elem);
	}
	function pop() {
		return this._arr.pop();
	}
	function peek() {
		return this._arr[this._arr.length-1];
	}
	return function stackGenerator() {
		return {
			_arr: [],
			push: push,
			pop: pop,
			peek: peek
		};
	};
}());

// JS stack implementation of pseudo code from "Introduction to Algorithms, MIT" Book
// stack with fixed sized array
// TODO: check input for push
var stack = (function stackModule() {
	var stackAPI = {
		isEmpty: function isEmpty() {
			return this._top === -1 ? true : false;
		},
		isFull: function isFull() {
			return this._top === this._capacity - 1 ? true : false;
		},
		size: function size() {
			return this._top + 1;
		},
		capacity: function capacity() {
			return this._capacity;
		},
		push: function push(elem) {
			if (this.isFull()) {
				throw new Error('Stack overflow');
			}
			if(!elem) {
				return false;
			}
			var index = (this._top += 1);
			this._arr[index] = elem;
			return true;
		},
		pop: function pop() {
			if (this.isEmpty()) {
				throw new Error('Stack underflow');
			}
			var index = (this._top -= 1);
			return this._arr[index + 1];
		},
		peek: function peek() {
			if (this.isEmpty()) {
				return null;
			}
			return this._arr[this._top];
		},
		_init: function init(capacity) {
			this._arr = new Array(capacity);
			this._capacity = capacity;
			this._top = -1;
			return this;
		}
	};

	return function stackGenerator(capacity) {
		var stack = Object.create(stackAPI);
		return stack._init(capacity);
	};
}());

module.exports = stack;


