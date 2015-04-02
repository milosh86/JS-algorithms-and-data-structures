
// Implement two stacks in one array􏰀 in such a way that neither stack overflows unless the total number of elements in both stacks together is n. 
// TODO: check input for push
var twoStacks = (function stackModule() {
	var stackAPI = {
		isEmpty1: function isEmpty1() {
			return this._top1 === -1;
		},
		isEmpty2: function isEmpty2() {
			return this._top2 === this._capacity;
		},
		isFull: function isFull() {
			return this._top1 + 1 === this._top2 ? true : false;
		},
		size: function size() {
			return (this._top1 + 1) + (this._capacity - this._top2);
		},
		capacity: function capacity() {
			return this._capacity;
		},
		push1: function push1(elem) {
			if (this.isFull()) {
				throw new Error('Stack overflow');
			}
			if(!elem) {
				return false;
			}
			var index = (this._top1 += 1);
			this._arr[index] = elem;
			return true;
		},
		push2: function push2(elem) {
			if (this.isFull()) {
				throw new Error('Stack overflow');
			}
			var index = (this._top2 -= 1);
			this._arr[index] = elem;
			return this;
		},
		pop1: function pop1() {
			if (this.isEmpty1()) {
				throw new Error('Stack underflow');
			}
			var index = (this._top1 -= 1);
			return this._arr[index + 1];
		},
		pop2: function pop2() {
			if (this.isEmpty2()) {
				throw new Error('Stack underflow');
			}
			var index = (this._top2 += 1);
			return this._arr[index - 1];
		},
		peek1: function peek2() {
			if (this.isEmpty()) {
				return null;
			}
			return this._arr[this._top1];
		},
		peek2: function peek2() {
			if (this.isEmpty()) {
				return null;
			}
			return this._arr[this._top2];
		},
		_init: function init(capacity) {
			this._arr = new Array(capacity);
			this._capacity = capacity;
			this._top1 = -1;
			this._top2 = capacity;
			return this;
		}
	};

	return function stackGenerator(capacity) {
		capacity || (capacity = 10);
		var stack = Object.create(stackAPI);
		return stackAPI._init(capacity);
	};
}());



