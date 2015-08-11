// Implement a fast integer square root function that takes in a 32-bit unsigned integer 
// and returns another 32-bit unsigned integer that is the floor of the square root of the input.


function sqrt(number) {
	var lo = 0,
		hi = Math.floor(number / 2),
		arr = [];

	// find the highest number for which the following predicate is false
	function p(n) {
		return n * n > number;
	}

	while (lo < hi) {
		var mid = Math.ceil(lo + (hi - lo) / 2);

		if (p(mid)) {
			hi = mid - 1;
		} else {
			lo = mid;
		}
	}

	return p(lo) ? -1 : lo;
}