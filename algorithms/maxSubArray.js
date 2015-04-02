/*
 Problem statement: Find contiguous subarray within array A which has the largest sum.
 
 First solution is using divide-and-conquer algorithm. If we divide given array A to A[0..mid] and A[mid+1, A.length-1], then maximal subarray is either in:
 1) part 1
 2) part 2
 3) crossing both parts
 
 Key procedure, which is used in combine part, is 'crossArraysMax'. This procedure finds maximal subarray that crosses two arrays.
 
 Divide: two equal parts
 Conquer: solve sub-problems recursively. Base case: array with one item is trivial solution. 
 Combine: crossArraysMax procedure + finding max(maxLeft, maxRight, maxCross)
 
 Second solution is based on Kadene's algorithm which solves the problem in linear time. 
 If we define state Si as maximum sum subsequence that ends on element on position i. 
 Element i can be start of new sequence or can be part of previous sequence. 
 If maximum that ends on element i is bigger than current maximum, it is new maximum.
*/

function crossArraysMax(arr, lo, mid, hi) {
	"use strict";
	var sumLeft = 0, maxLeft = Number.NEGATIVE_INFINITY, leftIndex,
		sumRight = 0, maxRight = Number.NEGATIVE_INFINITY, rightIndex,
		i,
		j;
	
	for (i = mid; i >= lo; i -= 1) {
		sumLeft += arr[i];
		if (sumLeft > maxLeft) {
			maxLeft = sumLeft;
			leftIndex = i;
		}
	}
	
	for (j = mid + 1; j <= hi; j += 1) {
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
		};
	} else if (maxLeft < 0) {
		return {
			maxSum: maxRight,
			leftIndex: mid + 1,
			rightIndex: rightIndex
		};
	} else {
		//max right < 0
		return {
			maxSum: maxLeft,
			leftIndex: leftIndex,
			rightIndex: mid
		};
	}
}

function maxSubArrayImpl(arr, lo, hi) {
	"use strict";
	if (lo === hi) {
		return {maxSum: arr[lo], leftIndex: lo, rightIndex: hi};
	}
	
	var mid = Math.floor(lo + (hi - lo) / 2),
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
	"use strict";
	return maxSubArrayImpl(arr, 0, arr.length - 1);
}
// ************************************************************************
//
// Kadene's algorithm variation - linear time solution
function maxSubArrayLinear(arr) {
	"use strict";
	var maxEndingHere = arr[0],
		maxSoFar = maxEndingHere,
		i,
		n = arr.length,
		leftIndex = 0,
		//rightIndex = 0,
		maxLeft = 0,
		maxRight = 0;
	// original Kadene's algorithm sets start of new sequence to 0 instead of arr[i], so it don't support case when array has only negative elements! 
	// in this implementation left and right index of subarray is added also.
	for (i = 1; i < n; i += 1) {
		if (maxEndingHere > 0) {
			maxEndingHere += arr[i];
			//rightIndex = i;
		} else {
			maxEndingHere = arr[i];
			leftIndex = i;
		}
		
		if (maxEndingHere > maxSoFar) {
			maxSoFar = maxEndingHere;
			maxLeft = leftIndex;
			maxRight = i;
		}
	}
	return {maxSum: maxSoFar, leftIndex: maxLeft, rightIndex: maxRight};
}
// TODO: test case
