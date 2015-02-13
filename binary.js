// find val in sorted array arr between indexes lo and hi
function binarySearch(arr, lo, hi, val) {
	// lo = mid + 1;
	// hi = mid - 1;
	while (lo <= hi) {
		var mid = (lo + hi) / 2; // or lo + (hi-lo)/2 to overcome intiger overflow problem, but this is not an issue in JS;
		mid = mid>>0;
		if (arr[mid] > val) {
			hi = mid -1;
		} else if(arr[mid] < val) {
			lo = mid + 1;
		} else {
			return mid;
		}
	} 
	// not found
	return -1;	
}


// recursive equivalent of above algorithm
function binSearchRec(arr, lo, hi, val) {
	if (lo > hi) {
		return -1;
	}

	var mid = (lo + hi) / 2; // or lo + (hi-lo)/2 to overcome intiger overflow problem, but this is not an issue in JS;
	mid = mid>>0;

	if (arr[mid] > val) {
		return binSearchRec(arr, lo, mid - 1, val);
	} else if(arr[mid] < val) {
		return binSearchRec(arr, mid + 1, hi, val);
	} else {
		return mid;
	}
}

// predicate based - find the first value k for witch p(k) == yes. 
// Floor(X) = the largest integer number less then or equal to real number X
function binarySearchFloor(arr, lo, hi, p) {
	// lo = mid + 1;
	// hi = mid;
	while (lo < hi) {
		var mid = (lo + hi) / 2; // or lo + (hi-lo)/2 to overcome intiger overflow problem, but this is not an issue in JS;
		mid = mid>>0;
		if (p(arr[mid])) {
			hi = mid;
		} else {
			lo = mid + 1;
		}
	} 
	// lo == hi always 
	if (!p(arr[hi])) {
		// all elements project to false/no
		return -1;
	}
	else {
		return hi;
	}
}

/*
	edge test cases:
	 1. [no, yes]
	 2. [no, no]
	 3. [yes, yes]

*/

// predicate based - find the last value k for witch p(k) == no. 
// Ceil(X) = is the smallest integer not less than x
function binarySearchCeil(arr, lo, hi, p) {
	// lo = mid;
	// hi = mid - 1;
	while (lo < hi) {
		var mid = (lo + hi) / 2; // or lo + (hi-lo)/2 to overcome intiger overflow problem, but this is not an issue in JS;
		//mid = mid>>0; this introduce critical bug (see/try marked test cases below) - infinite loop
		mid = Math.ceil(mid); // ceil must be used instead of floor
		if (p(arr[mid])) {
			hi = mid - 1;
		} else {
			lo = mid;
		}
	} 
	// lo == hi always 
	if (p(arr[hi])) {
		// all elements project to true/yes
		return -1;
	}
	else {
		return hi;
	}
}

/*
	edge test cases:
	 1. [no, yes] - critical see above comment
	 2. [no, no] - critical see above comment
	 3. [yes, yes]

*/