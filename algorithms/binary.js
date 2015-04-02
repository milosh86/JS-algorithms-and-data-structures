// find val in sorted array 'arr' between indexes lo and hi
function binarySearch(arr, lo, hi, val) {
	"use strict";
	// lo = mid + 1;
	// hi = mid - 1;
	while (lo <= hi) {
		var mid = Math.floor((lo + hi) / 2); // or lo + (hi-lo)/2 to overcome intiger overflow problem, but this is not an issue in JS;
		//mid = mid >> 0; // floor
		if (arr[mid] > val) {
			hi = mid - 1;
		} else if (arr[mid] < val) {
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
	"use strict";
	if (lo > hi) {
		return -1;
	}

	var mid = Math.floor((lo + hi) / 2); // or lo + (hi-lo)/2 to overcome intiger overflow problem, but this is not an issue in JS;
	//mid = mid >> 0; // floor

	if (arr[mid] > val) {
		return binSearchRec(arr, lo, mid - 1, val);
	} else if (arr[mid] < val) {
		return binSearchRec(arr, mid + 1, hi, val);
	} else {
		return mid;
	}
}

// generalized bynary search, predicate based - find the smallest index i for which p(arr[i]) == true. 
// restriction: binary search can be used if and only if for all x in 'arr', p(x) implies p(y) for all y > x (also ¬p(x) implies ¬p(y) for all y < x ).
// LT - Lowest True
function binarySearchLT(arr, lo, hi, p) {
	"use strict";
	// lo = mid + 1;
	// hi = mid;
	while (lo < hi) {
		var mid = Math.floor((lo + hi) / 2); // or lo + (hi-lo)/2 to overcome intiger overflow problem, but this is not an issue in JS;
		//mid = mid >> 0;
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
	} else {
		return hi;
	}
}

/*
	edge test cases:
	 1. [no, yes]
	 2. [no, no]
	 3. [yes, yes]

*/

// predicate based - find the highest index i for which p(arr[i]) == false.
// restriction: binary search can be used if and only if for all x in 'arr', p(x) implies p(y) for all y > x (also ¬p(x) implies ¬p(y) for all y < x ).
// HF - Higest False
function binarySearchHF(arr, lo, hi, p) {
	"use strict";
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
	} else {
		return hi;
	}
}

/*
	edge test cases:
	 1. [no, yes] - critical see above comment
	 2. [no, no] - critical see above comment
	 3. [yes, yes]

*/