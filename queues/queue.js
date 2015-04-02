var queue = (function queueModule() {
	var queueAPI = {
		enqueue: function enqueue(elem) {
			if (this.isFull()) {
				throw new Error('queue overflow');
			}
			if(!elem) {
				return false;
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
		dequeue: function dequeue() {
			if (this.isEmpty()) {
				throw new Error('queue underflow');
			}
			var ret = this._arr[this._head];
			this._head === this._capacity - 1 ? 
				(this._head = 0) :
				(this._head +=1);
			this._size -= 1;
			return ret;
		},
		peek: function peek() {
			if (this.isEmpty()) {
				return null;
			}
			return this._arr[this._head];
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
		var queue = Object.create(queueAPI);
		return queue.init(capacity);
	};
}());
