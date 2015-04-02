var deque = (function queueModule() {
	var dequeAPI = {
		pushBack: function pushBack(elem) {
			if(!elem) {
				return false;
			}
			if (this.isFull()) {
				throw new Error('deque overflow');
			}
			this._arr[this._tail] = elem;
			if (this._tail === this._capacity - 1) {
				this._tail = 0;
			} else {
				this._tail += 1;
			}
			this._size += 1;
			return true;
		},
		pushFront: function pushFront(elem) {
			if(!elem) {
				return false;
			}
			if (this.isFull()) {
				throw new Error('deque overflow');
			}
			if (this._head === 0) {
				this._head = this._capacity - 1;
			} else {
				this._head -= 1;
			}
			this._arr[this._head] = elem;
			this._size += 1;
			return true;
		},
		popFront: function popFront() {
			if (this.isEmpty()) {
				throw new Error('deque underflow');
			}
			var ret = this._arr[this._head];
			
			this._head === this._capacity - 1 ? 
				(this._head = 0) :
				(this._head +=1);
			
			this._size -= 1;
			return ret;
		},
		popBack: function popBack(arguments) {
			var index, 
				ret;
			
			if (this.isEmpty()) {
				throw new Error('deque underflow');
			}
			
			index = (this._tail === 0) ? (this._capacity - 1) : (this._tail - 1);
			ret = this._arr[index];
			this._tail = index;
			this._size -= 1;
			
			return ret;
		},
		peekFront: function peek() {
			if (this.isEmpty()) {
				return null;
			}
			return this._arr[this._head];
		},
		peekBack: function peek() {
			if (this.isEmpty()) {
				return null;
			}
			var index = this._tail === 0 ? (this._capacity - 1) : (this._tail - 1);
			return this._arr[index];
		},
		isFull: function isFull() {
			return this._size === this._capacity ? true : false;
		},
		isEmpty: function isEmpty() {
			return this._size === 0 ? true : false;
		},
		size: function size() {
			return this._size;
		},
		capacity: function capacity() {
			return this._capacity;
		},
		init: function init(capacity) {
			this._head = 0;
			this._tail = 0;
			this._capacity = capacity;
			this._size = 0;
			this._arr = new Array(capacity);
			return this;
		}	
	};
	
	return function queueGenerator(capacity) {
		var deque = Object.create(dequeAPI);
		return deque.init(capacity);
	};
}());


