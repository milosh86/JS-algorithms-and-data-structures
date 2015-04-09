var list = require('../lists/listSL');

// list based queue

var queueAPI = {};

/**
 * Is queue empty?
 * @returns {Boolean}
 */
queueAPI.isEmpty = function isEmpty() {
	return this._list.isEmpty();
};

/**
 * Number of elements in queue
 * @returns {Number} Queue size
 */
queueAPI.size = function size() {
	return this._list.size();
};

/**
 * Add new element in queue
 * @param   {Any} elem Element to add
 * @returns {Boolean}  status of operation
 */
queueAPI.enqueue = function push(elem) {
	if (!elem) {
		return false;
	}
	this._list.addBack(elem);
	return true;
};
queueAPI.pop = function pop() {
	if (this._list.isEmpty()) {
		throw new Error('Stack underflow');
	}
	return this._list.removeFront();
};
queueAPI.peek = function peek() {
	if (this.isEmpty()) {
		return null;
	}
	return this._list.first().data;
};
queueAPI._init = function init() {
	this._list = list();
	return this;
}
};

module.exports = function queueGenerator() {
	var queue = Object.create(queueAPI);
	return queue._init();
};