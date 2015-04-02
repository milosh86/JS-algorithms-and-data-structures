// binary tree based set (permanent/immutable)

var setInterface = {
	contains: function(elem) {return 'Boolean';},
	include: function(elem) {return 'set'}
};

/**
 * Empty set
 * @returns {Object} [[Description]]
 */
function empty() {
	return {
		contains: function(elem) {return false;},
		include: function(elem) {return nonEmpty(elem, empty(), empty())},
		toString: function toString() {
			return '.'; 
		}
	};
}

/**
 * Non empty set
 * @param   {Any}    elem  Element to add to set
 * @param   {Set}    left  left sub-tree
 * @param   {Set}    right right sub-tree
 */
function nonEmpty(root, left, right) {
	return {
		contains: function(elem) {
			if (elem < root) {
				return left.contains(elem);
			} else if (elem > root) {
				return right.contains(elem);
			} else {
				return true;
			}
		},
		include: function(elem) {
			if (elem < root) {
				return nonEmpty(root, left.include(elem), right);
			} else if (elem > root) {
				return nonEmpty(root, left, right.include(elem));
			} else {
				return this;
			}
		},
		toString: function toString() {
			return left + '.{' + root + '}.' + right; 
		}
	};
}

function set(initVal) {
	return nonEmpty(initVal, empty(), empty());
}