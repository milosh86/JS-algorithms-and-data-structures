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
	 * String representation of list
	 * @returns {String} list
	 */
	toString: function() {
	    var tmp = this.first(),
		ret = '{';
	    while (tmp) {
	        ret += tmp.data;
	        tmp = tmp.next;
	        if (tmp) {
	            ret += ',';	
	        }
	    }
	    ret += '}';
	    return ret;
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
