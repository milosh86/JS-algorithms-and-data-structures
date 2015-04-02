// Doubly linked list	

function node(val) {
	return {
		prev: null,
		next: null,
		data: val
	};
}

var listAPI = {
	addFront: function addFront(val) {
		var newNode = node(val);
		if (this.head) {
			this.head.prev = newNode;
			newNode.next = this.head;
			this.head = newNode;
		} else {
			this.head = this.tail = newNode;
		}
		return this;
	},
	addBack: function addBack(val) {
		var newNode = node(val);
		if (this.tail) {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		} else {
			this.head = this.tail = newNode;
		}
		return this;
	},
	find: function find(key) {
		var ret = this.head;
		while (ret != null && ret.data !== key) {
			ret = ret.next;
		}
		return ret;
	},
	removeFront: function removeFront() {
		var ret = this.head;
		if (ret) {
			this.head = this.head.next;
			if (!this.head) {
				this.tail = null;
			}
		}
		return ret;
	},
	removeBack: function removeBack() {
		var ret = this.tail;
		if (ret) {
			this.tail = this.tail.prev;
			if (!this.tail) {
				this.head = null;
			}
		}
		return ret;
	},
	_init: function init() {
		this.head = this.tail = null;
		return this;
	}
};

function list() {
	var newList = Object.create(listAPI);
	return newList._init();
}
module.exports = list;