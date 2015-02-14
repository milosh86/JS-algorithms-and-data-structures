/*
 Problem statement: Find maximum subarray of array A.
 
 A solution below is using divide-and-conquer algorithm. If we divide given array A to A[0..mid] and A[mid+1, A.length-1], then maximal subarray is either in:
 1) part 1
 2) part 2
 3) crossing both parts
 
 Key procedure, which is used in combine part, is 'crossArraysMax'. This procedure finds maximal subarray that crosses two arrays.
 
 Divide: two equal parts
 Conquer: solve sub-problems recursively. Base case: array with one item is trivial solution. 
 Combine: crossArraysMax procedure + finding max(maxLeft, maxRight, maxCross)
*/

function crossArraysMax(arr, lo, mid, hi) {
	var sumLeft = 0, maxLeft = Number.NEGATIVE_INFINITY, leftIndex,
		sumRight = 0, maxRight = Number.NEGATIVE_INFINITY, rightIndex,
		i,
		j;
	
	for (i = mid; i >= lo; i--) {
		sumLeft += arr[i];
		if (sumLeft > maxLeft) {
			maxLeft = sumLeft;
			leftIndex = i;
		}
	}
	
	for (j = mid + 1; j <= hi; j++) {
		sumRight += arr[j];
		if (sumRight > maxRight) {
			maxRight = sumRight;
			rightIndex = j;
		}
	}
	
	// we must check if left or right max is negative. if just maxLeft + maxRight is returned (like in "Introduction to Algorithms"), it could introduce bugs!
	if (maxLeft > 0 && maxRight > 0) {
		return {
			maxSum: maxLeft + maxRight,
			leftIndex: leftIndex,
			rightIndex: rightIndex
		}
	} else if (maxLeft < 0) {
		return {
			maxSum: maxRight,
			leftIndex: mid + 1,
			rightIndex: rightIndex
		}
	} else {
		//max right < 0
		return {
			maxSum: maxLeft,
			leftIndex: leftIndex,
			rightIndex: mid
		}
	}
}

function maxSubArrayImpl(arr, lo, hi) {
	if (lo === hi) {
		return {maxSum: arr[lo], leftIndex: lo, rightIndex: hi};
	}
	
	var mid = Math.floor(lo + (hi - lo)/2),
		maxLeft = maxSubArrayImpl(arr, lo, mid),
		maxRight = maxSubArrayImpl(arr, mid + 1, hi),
		maxCrossSum = crossArraysMax(arr, lo, mid, hi);
	
	if (maxLeft.maxSum > maxRight.maxSum && maxLeft.maxSum > maxCrossSum.maxSum) {
		return maxLeft;
	} else if (maxRight.maxSum > maxLeft.maxSum && maxRight.maxSum > maxCrossSum.maxSum) {
		return maxRight;
	} else {
		return maxCrossSum;
	}
}

function maxSubArray(arr) {
	return maxSubArrayImpl(arr, 0, arr.length-1);
}

// TODO: test cases
