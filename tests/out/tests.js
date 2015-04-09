(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

module.exports = deque;

},{}],2:[function(require,module,exports){
// Singly Linked List	

/**
 * List node factory function
 * @param   {Any} val Data to store in node 
 * @returns {Object}   New list node
 * @private                    
 */
function node(val) {
	return {
		next: null,
		data: val
	};
}

var listAPI = {
	/**
	 * Add new element at the beginning of list
	 * @param   {Any}    val Data to add
	 * @returns {Object} list object
	 */
	addFront: function addFront(val) {
		var newNode = node(val);
		if (this.isEmpty()) {
			this._last = this._first = newNode;
		} else {
			newNode.next = this._first;
			this._first = newNode;
		}
		this._size += 1;
		return this;
	},
	/**
	 * Add new element at the end of list
	 * @param   {Any}    val Data to add
	 * @returns {Object} list object
	 */
	addBack: function addBack(val) {
		var newNode = node(val);
		if (this.isEmpty()) {
			this._last = this._first = newNode;
		} else {
			this._last.next = newNode;
			this._last = newNode;
		}
		this._size += 1;
		return this;
	},
	/**
	 * Remove element at the beginning of list
	 * @returns {Any} Data from first list node
	 */
	removeFront: function removeFront() {
		var ret = null,
			tmp = this._first;
		
		if (tmp) {
			this._first = tmp.next;
			ret = tmp.data;
//			tmp.next = null;
			
			this._size -= 1;
			if (this.isEmpty()) {
				this._last = null;
			}
		}
		return ret;
	},
	/**
	 * remove element at the end of list. This operation is O(N) complexity!
	 * @returns {String} [[Description]]
	 */
	removeBack: function removeBack() {
		return 'not implemented';
	},
	/**
	 * Find and return element in list
	 * @param   {Any} key element to find
	 * @returns {Any} found element or null
	 */
	find: function find(key) {
		var ret = this._first;
		while (ret != null && ret.data !== key) {
			ret = ret.next;
		}
		return ret ? ret.data : ret;
	},
	/**
	 * Check if list is empty
	 * @returns {Boolean}
	 */
	isEmpty: function isEmpty() {
		return this._size === 0;
	},
	/**
	 * Get first element
	 * @returns {Any} First element in list
	 */
	first: function first() {
		return this._first;
	},
	/**
	 * Get last element
	 * @returns {Any} Last element in list
	 */
	last: function last() {
		return this._last;
	},
	/**
	 * List size
	 * @returns {Number} size
	 */
	size: function size() {
		return this._size;
	},
	/**
	 * List init operation
	 * @returns {Object} Initialized list
	 * @private                  
	 */
	_init: function init() {
		this._first = this._last = null;
		this._size = 0;
		return this;
	}
};

function list() {
	var newList = Object.create(listAPI);
	return newList._init();
}

module.exports = list;
},{}],3:[function(require,module,exports){
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

module.exports = queue;
},{}],4:[function(require,module,exports){
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



},{}],5:[function(require,module,exports){
var list = require('../lists/listSL');
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
},{"../lists/listSL":2}],6:[function(require,module,exports){
var deque = require('../deques/deque.js');
var dq = deque(5);
QUnit.module('Deque API tests');

QUnit.test('deque tests', function (assert) {
	assert.ok(dq.isEmpty(), 'deque initially empty');
	assert.equal(dq.isFull(), false, 'deque not full initially');
	assert.equal(dq.capacity(), 5, 'capacity set correctly');
	assert.equal(dq.size(), 0, 'size is 0');
	assert.strictEqual(dq.peekFront(), null, 'empty deque, peekFront() returns null');
	assert.strictEqual(dq.peekBack(), null, 'empty deque, peekBack() returns null');
	assert.throws(function() {dq.popBack()}, /deque underflow/, 'deque underflow error thrown');

//'Non-empty deque state check'
	dq.pushBack(1);
	// check stacke state when it's not empty
	assert.equal(dq.isEmpty(), false, 'deque not empty anymore');
	assert.equal(dq.isFull(), false, 'deque not full yet');
	assert.equal(dq.capacity(), 5, 'capacity should always be the same');
	assert.equal(dq.size(), 1, 'size is 1');
	assert.equal(dq.peekFront(), 1, 'peekFront() returns 1');
	assert.equal(dq.peekBack(), 1, 'peekBack() also returns 1');

//'Full deque state check'
	dq.pushBack(2);
	assert.equal(dq.size(), 2, 'size is 2');
	dq.pushBack(3);
	dq.pushBack(4);
	dq.pushBack(5);
	// check state when stack is full
	assert.equal(dq.size(), 5, 'size is 5');
	assert.equal(dq.capacity(), 5, 'capacity should always be the same');
	assert.equal(dq.peekFront(), 1, 'peekFront() returns 1');
	console.log('PUSH: ', dq.peekBack(), dq._arr, dq._tail)
	assert.equal(dq.peekBack(), 5, 'peekBack() returns 5');
	assert.equal(dq.isEmpty(), false, 'deque not empty');
	assert.equal(dq.isFull(), true, 'deque is full now');
	assert.throws(function() {dq.pushBack(6)}, /deque overflow/, 'deque overflow error thrown');

// 'Empty queue state check'
	dq.popBack();
	dq.popFront();
	dq.popBack();
	dq.popFront();
	dq.popBack();
	// check that everithing works the same as in initial state
	assert.ok(dq.isEmpty(), 'deque is empty again');
	assert.equal(dq.isFull(), false, 'deque not full initially');
	assert.equal(dq.capacity(), 5, 'capacity remains the same');
	assert.equal(dq.size(), 0, 'size is 0 again');
	assert.strictEqual(dq.peekFront(), null, 'empty deque, peek() returns null');
	assert.strictEqual(dq.peekBack(), null, 'empty deque, peek() returns null');
	assert.throws(function() {dq.popBack()}, /deque underflow/, 'deque underflow error thrown');

//'pushBack - popBack
	dq.pushBack(1);
	dq.pushBack(2);
	dq.pushBack(3);
	dq.pushBack(4);
	assert.equal(dq.pushBack(5), true, 'pushBack returns true');
	assert.equal(dq.pushBack(null), false, 'null: pushBack returns false, nothing added');
	assert.equal(dq.pushBack(), false, 'undefined: pushBack returns false, nothing added');
	assert.equal(dq.pushBack(''), false, '"": pushBack returns false, nothing added');
	assert.equal(dq.popBack(), 5, 'popBack 5');
	assert.equal(dq.popBack(), 4, 'popBack 4');
	assert.equal(dq.popBack(), 3, 'popBack 3');
	assert.equal(dq.popBack(), 2, 'popBack 2');
	assert.equal(dq.popBack(), 1, 'popBack 1');
	assert.throws(function() {dq.popBack()}, /deque underflow/, 'popBack: deque underflow error thrown');
	
	// pushBack - popFront
	dq.pushBack(1);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushBack(2);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 2, 'peek() returns 2');
	dq.pushBack(3);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 3, 'peek() returns 3');
	dq.pushBack(4);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 4, 'peek() returns 4');
	
	assert.equal(dq.pushBack(5), true, 'pushBack returns true');
	
	assert.equal(dq.popFront(), 1, 'popFront 1');
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popFront(), 2, 'popFront 2');
	assert.equal(dq.popFront(), 3, 'popFront 3');
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popFront(), 4, 'popFront 4');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popFront(), 5, 'popFront 5');
	assert.throws(function() {dq.popFront()}, /deque underflow/, 'popFront: deque underflow error thrown');
	
	// pushFront - popBack
	dq.pushFront(1);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(2);
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(3);
	assert.strictEqual(dq.peekFront(), 3, 'peek() returns 3');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(4);
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	
	assert.equal(dq.pushFront(5), true, 'pushBack returns true');
	
	assert.equal(dq.popBack(), 1, 'popBack 1');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 2, 'peek() returns 2');
	assert.equal(dq.popBack(), 2, 'popBack 2');
	assert.equal(dq.popBack(), 3, 'popBack 3');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 4, 'peek() returns 4');
	assert.equal(dq.popBack(), 4, 'popBack 4');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popBack(), 5, 'popBack 5');
	assert.strictEqual(dq.peekFront(), null, 'peek() returns null');
	assert.strictEqual(dq.peekBack(), null, 'peek() returns null');
	assert.throws(function() {dq.popBack()}, /deque underflow/, 'popFront: deque underflow error thrown');
	
	// pushFront - popFront
	dq.pushFront(1);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(2);
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(3);
	assert.strictEqual(dq.peekFront(), 3, 'peek() returns 3');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(4);
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	
	assert.equal(dq.pushFront(5), true, 'pushBack returns true');
	
	assert.equal(dq.popFront(), 5, 'popFront 5');
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	assert.equal(dq.popFront(), 4, 'popFront 4');
	assert.equal(dq.popFront(), 3, 'popFront 3');
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	assert.equal(dq.popFront(), 2, 'popFront 2');
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	assert.equal(dq.popFront(), 1, 'popFront 1');
	assert.throws(function() {dq.popFront()}, /deque underflow/, 'popFront: deque underflow error thrown');
	
	// pushBack-PopFront in steps - moving to left
	dq.pushBack(1);
	dq.pushBack(2);
	dq.pushBack(3);
	dq.pushBack(4);
	assert.equal(dq.popFront(), 1, 'popFront 1');
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 4, 'peek() returns 4');
	dq.pushBack(5);
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popFront(), 2, 'popFront 2');
	assert.strictEqual(dq.peekFront(), 3, 'peek() returns 3');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	dq.pushBack(6);
	assert.equal(dq.popFront(), 3, 'popFront 3');
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 6, 'peek() returns 6');
	dq.pushBack(7);
	assert.equal(dq.popFront(), 4, 'popFront 4');
	dq.pushBack(8);
	assert.equal(dq.popFront(), 5, 'popFront 5');
	assert.strictEqual(dq.peekFront(), 6, 'peek() returns 6');
	assert.strictEqual(dq.peekBack(), 8, 'peek() returns 8');
	dq.pushBack(9);
	assert.equal(dq.popFront(), 6, 'popFront 6');
	assert.equal(dq.popFront(), 7, 'popFront 7');
	assert.strictEqual(dq.peekFront(), 8, 'peek() returns 8');
	assert.strictEqual(dq.peekBack(), 9, 'peek() returns 9');
	assert.equal(dq.popFront(), 8, 'popFront 8');
	assert.equal(dq.popFront(), 9, 'popFront 9');
	
	
	// pushFront-popBack in steps - moving to right
	dq.pushFront(1);
	dq.pushFront(2);
	dq.pushFront(3);
	dq.pushFront(4);
	assert.equal(dq.popBack(), 1, 'popBack 1');
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 2, 'peek() returns 2');
	dq.pushFront(5);
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 2, 'peek() returns 2');
	assert.equal(dq.popBack(), 2, 'popBack 2');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 3, 'peek() returns 3');
	dq.pushFront(6);
	assert.equal(dq.popBack(), 3, 'popBack 3');
	assert.strictEqual(dq.peekFront(), 6, 'peek() returns 6');
	assert.strictEqual(dq.peekBack(), 4, 'peek() returns 4');
	dq.pushFront(7);
	assert.equal(dq.popBack(), 4, 'popBack 4');
	dq.pushFront(8);
	assert.equal(dq.popBack(), 5, 'popBack 5');
	assert.strictEqual(dq.peekFront(), 8, 'peek() returns 8');
	assert.strictEqual(dq.peekBack(), 6, 'peek() returns 6');
	dq.pushFront(9);
	assert.equal(dq.popBack(), 6, 'popBack 6');
	assert.equal(dq.popBack(), 7, 'popBack 7');
	assert.strictEqual(dq.peekFront(), 9, 'peek() returns 9');
	assert.strictEqual(dq.peekBack(), 8, 'peek() returns 8');
	assert.equal(dq.popBack(), 8, 'popBack 8');
	assert.equal(dq.popBack(), 9, 'popBack 9');
	
	
});
},{"../deques/deque.js":1}],7:[function(require,module,exports){
var list = require('../lists/listSL');

var l = list()

l.addFront(1)
l.addFront(2)
l.addFront(3)
console.log(l.removeFront())
console.log(l.removeFront())
console.log(l.removeFront())
console.log(l.removeFront())
},{"../lists/listSL":2}],8:[function(require,module,exports){
var queue = require('../queues/queue.js');
var q = queue(5);
QUnit.module('Queue API tests', {
  beforeEach: function() {
    console.log('Queue API tests: test starting...');
  },
  afterEach: function() {
    console.log('Queue API tests: test ending...');
  }
});

QUnit.test('queue initialization tests - initial state checking', function (assert) {
	assert.ok(q.isEmpty(), 'queue initially empty');
	assert.equal(q.isFull(), false, 'queue not full initially');
	assert.equal(q.capacity(), 5, 'capacity set correctly');
	assert.equal(q.size(), 0, 'size is 0');
	assert.strictEqual(q.peek(), null, 'empty stack, peek() returns null');
	assert.throws(function() {q.dequeue()}, /queue underflow/, 'queue underflow error thrown');
});

QUnit.test('Non-empty queue state check', function (assert) {
	q.enqueue(1);
	// check stacke state when it's not empty
	assert.equal(q.isEmpty(), false, 'queue not empty anymore');
	assert.equal(q.isFull(), false, 'queue not full yet');
	assert.equal(q.capacity(), 5, 'capacity should always be the same');
	assert.equal(q.size(), 1, 'size is 1');
	assert.equal(q.peek(), 1, 'peek() returns 1');
	assert.equal(q.peek(), 1, 'peek() returns 1 again');
});

QUnit.test('Full queue state check', function (assert) {
	q.enqueue(2);
	assert.equal(q.size(), 2, 'size is 2');
	q.enqueue(3);
	q.enqueue(4);
	q.enqueue(5);
	// check state when stack is full
	assert.equal(q.size(), 5, 'size is 5');
	assert.equal(q.capacity(), 5, 'capacity should always be the same');
	assert.equal(q.peek(), 1, 'peek() returns 1');
	assert.equal(q.peek(), 1, 'peek() returns 1 again');
	assert.equal(q.isEmpty(), false, 'queue not empty');
	assert.equal(q.isFull(), true, 'queue is full now');
	assert.throws(function() {q.enqueue(6)}, /queue overflow/, 'queue overflow error thrown');
});

QUnit.test('Empty queue state check', function (assert) {
	q.dequeue();
	q.dequeue();
	q.dequeue();
	q.dequeue();
	q.dequeue();
	// check that everithing works the same as in initial state
	assert.ok(q.isEmpty(), 'queue is empty again');
	assert.equal(q.isFull(), false, 'queue not full initially');
	assert.equal(q.capacity(), 5, 'capacity remains the same');
	assert.equal(q.size(), 0, 'size is 0 again');
	assert.strictEqual(q.peek(), null, 'empty queue, peek() returns null');
	assert.throws(function() {q.dequeue()}, /queue underflow/, 'queue underflow error thrown');
});

QUnit.test('enqueue/dequeue tests', function (assert) {
	q.enqueue(1);
	q.enqueue(2);
	q.enqueue(3);
	q.enqueue(4);
	q.enqueue(5);
	assert.equal(q.dequeue(), 1, 'dequeued 1');
	assert.equal(q.dequeue(), 2, 'dequeued 2');
	q.enqueue(6);
	assert.equal(q.dequeue(), 3, 'dequeued 3');
	assert.equal(q.dequeue(), 4, 'dequeued 4');
	assert.equal(q.dequeue(), 5, 'dequeued 5');
	assert.equal(q.dequeue(), 6, 'dequeued 6');
	q.enqueue(1);
	assert.equal(q.peek(), 1, 'enqueued 1');
	q.enqueue(2);
	assert.equal(q.dequeue(), 1, 'dequeued 1');
	assert.equal(q.dequeue(), 2, 'dequeued 2');
});
},{"../queues/queue.js":3}],9:[function(require,module,exports){
var stack = require('../stacks/stackList.js');

var s = stack();
QUnit.module('StackList API tests', {
  beforeEach: function() {
    console.log('Stack API tests: test starting...');
  },
  afterEach: function() {
    console.log('StackList API tests: test ending...');
  }
});
QUnit.test('stack initialization tests - initial state checking', function (assert) {
	assert.ok(s.isEmpty(), 'stack initially empty');
	assert.equal(s.size(), 0, 'size is 0');
	assert.strictEqual(s.peek(), null, 'empty stack, peek() returns null');
	assert.throws(function() {s.pop()}, /Stack underflow/, 'stack underflow error thrown');

// 'Non-empty stack state check'
	s.push(1);
	// check stacke state when it's not empty
	assert.equal(s.isEmpty(), false, 'stack not empty anymore');
	assert.equal(s.size(), 1, 'size is 1');
	assert.equal(s.peek(), 1, 'peek() returns 1');
	assert.equal(s.peek(), 1, 'peek() returns 1 again');


// 'Full stack state check'
	s.push(2);
	assert.equal(s.size(), 2, 'size is 2');
	s.push(3);
	s.push(4);
	s.push(5);
	// check state when stack is full
	assert.equal(s.size(), 5, 'size is 5');
	assert.equal(s.peek(), 5, 'peek() returns 5');
	assert.equal(s.peek(), 5, 'peek() returns 5 again');
	assert.equal(s.isEmpty(), false, 'stack not empty');
	
// 'Empty stack state check'
	s.pop();
	s.pop();
	s.pop();
	s.pop();
	s.pop();
	// check that everithing works the same as in initial state
	assert.ok(s.isEmpty(), 'stack is empty again');
	assert.equal(s.size(), 0, 'size is 0 again');
	assert.strictEqual(s.peek(), null, 'empty stack, peek() returns null');

// 'push/pop tests'
	s.push(1);
	assert.equal(s.peek(), 1, 'pushed 1');
	s.push(2);
	assert.equal(s.peek(), 2, 'pushed 2');
	s.push(3);
	assert.equal(s.peek(), 3, 'pushed 3');
	s.push(4);
	assert.equal(s.peek(), 4, 'pushed 4');
	s.push(5);
	assert.equal(s.peek(), 5, 'pushed 5');
	assert.equal(s.pop(), 5, 'poped 5');
	assert.equal(s.pop(), 4, 'poped 4');
	s.push(4);
	assert.equal(s.peek(), 4, 'pushed 4');
	assert.equal(s.pop(), 4, 'poped 4');
	assert.equal(s.pop(), 3, 'poped 3');
	assert.equal(s.pop(), 2, 'poped 2');
	assert.equal(s.pop(), 1, 'poped 1');
	s.push(1);
	assert.equal(s.peek(), 1, 'pushed 1');
	s.push(2);
	assert.equal(s.peek(), 2, 'pushed 2');
	assert.equal(s.pop(), 2, 'poped 2');
	assert.equal(s.pop(), 1, 'poped 1');
});









},{"../stacks/stackList.js":5}],10:[function(require,module,exports){
var stack = require('../stacks/stack.js');
var s = stack(5);
QUnit.module('Stack API tests', {
  beforeEach: function() {
    console.log('Stack API tests: test starting...');
  },
  afterEach: function() {
    console.log('Stack API tests: test ending...');
  }
});
QUnit.test('stack initialization tests - initial state checking', function (assert) {
	assert.ok(s.isEmpty(), 'stack initially empty');
	assert.equal(s.isFull(), false, 'stack not full initially');
	assert.equal(s.capacity(), 5, 'capacity set correctly');
	assert.equal(s.size(), 0, 'size is 0');
	assert.strictEqual(s.peek(), null, 'empty stack, peek() returns null');
	assert.throws(function() {s.pop()}, /Stack underflow/, 'stack underflow error thrown');
});

QUnit.test('Non-empty stack state check', function (assert) {
	s.push(1);
	// check stacke state when it's not empty
	assert.equal(s.isEmpty(), false, 'stack not empty anymore');
	assert.equal(s.isFull(), false, 'stack not full yet');
	assert.equal(s.capacity(), 5, 'capacity should always be the same');
	assert.equal(s.size(), 1, 'size is 1');
	assert.equal(s.peek(), 1, 'peek() returns 1');
	assert.equal(s.peek(), 1, 'peek() returns 1 again');
});

QUnit.test('Full stack state check', function (assert) {
	s.push(2);
	assert.equal(s.size(), 2, 'size is 2');
	s.push(3);
	s.push(4);
	s.push(5);
	// check state when stack is full
	assert.equal(s.size(), 5, 'size is 5');
	assert.equal(s.capacity(), 5, 'capacity should always be the same');
	assert.equal(s.peek(), 5, 'peek() returns 5');
	assert.equal(s.peek(), 5, 'peek() returns 5 again');
	assert.equal(s.isEmpty(), false, 'stack not empty');
	assert.equal(s.isFull(), true, 'stack is full now');
	assert.throws(function() {s.push(6)}, /Stack overflow/, 'stack overflow error thrown');
});

QUnit.test('Empty stack state check', function (assert) {
	s.pop();
	s.pop();
	s.pop();
	s.pop();
	s.pop();
	// check that everithing works the same as in initial state
	assert.ok(s.isEmpty(), 'stack is empty again');
	assert.equal(s.isFull(), false, 'stack not full initially');
	assert.equal(s.capacity(), 5, 'capacity remains the same');
	assert.equal(s.size(), 0, 'size is 0 again');
	assert.strictEqual(s.peek(), null, 'empty stack, peek() returns null');
	assert.throws(function() {s.pop()}, /Stack underflow/, 'stack underflow error thrown');
});

QUnit.test('push/pop tests', function (assert) {
	s.push(1);
	assert.equal(s.peek(), 1, 'pushed 1');
	s.push(2);
	assert.equal(s.peek(), 2, 'pushed 2');
	s.push(3);
	assert.equal(s.peek(), 3, 'pushed 3');
	s.push(4);
	assert.equal(s.peek(), 4, 'pushed 4');
	s.push(5);
	assert.equal(s.peek(), 5, 'pushed 5');
	assert.equal(s.pop(), 5, 'poped 5');
	assert.equal(s.pop(), 4, 'poped 4');
	s.push(4);
	assert.equal(s.peek(), 4, 'pushed 4');
	assert.equal(s.pop(), 4, 'poped 4');
	assert.equal(s.pop(), 3, 'poped 3');
	assert.equal(s.pop(), 2, 'poped 2');
	assert.equal(s.pop(), 1, 'poped 1');
	s.push(1);
	assert.equal(s.peek(), 1, 'pushed 1');
	s.push(2);
	assert.equal(s.peek(), 2, 'pushed 2');
	assert.equal(s.pop(), 2, 'poped 2');
	assert.equal(s.pop(), 1, 'poped 1');
});









},{"../stacks/stack.js":4}]},{},[6,7,8,9,10]);
