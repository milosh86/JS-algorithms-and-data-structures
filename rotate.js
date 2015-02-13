/*
	Write a function that rotates an integer array by a given number k. 
	k elements from the end should move to the beginning of array, 
	and all other elements should move to right to make the space.
	
	two implementations: 1) O(n) additional memory, 2) in place 
*/

// additional memory: O(n)  
// running time: O(n) 
function rotate(arr, k) {
	var n = arr.length,
		i,
		rotated;

	k = k % n;
	if (k <= 0) {
		return arr;
	}

	rotated = new Array(n);

	for (i = 0; i < n; i++) {
		if (i < k) {
			rotated[i] = arr[n - k + i]; 
		} else {
			rotated[i] = arr[i - k];
		}
	}
	
	return rotated;
}

function reverse(arr) {
	function swap(arr, i, j) {
		var tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}
	var n = arr.length,
		k = Math.floor(n/2);

	for (var i = 0; i < k; i++) {
		swap(arr, i, n - i - 1);
	}
	return arr
}

function reverseRange(arr, lo, hi) {
	function swap(arr, i, j) {
		var tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}

	while (lo < hi) {
		swap(arr, lo, hi);
		lo++;
		hi--;
	}

	return arr
}

// additional memory: in place  
// running time: O(n) 
function rotateIP(arr, k) {
	var n = arr.length-1;
	k = k % n;
	if (k <= 0) {
		return arr;
	}

	reverseRange(arr, 0, n);
	reverseRange(arr, 0, k-1);
	reverseRange(arr, k, n);

	return arr;
}
