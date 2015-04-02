(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
			this._last = this._head = newNode;
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
},{}],2:[function(require,module,exports){
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
},{"./listSL":1}],3:[function(require,module,exports){
var stack = require('./stackList');

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









},{"./stackList":2}]},{},[3]);
