// Show how to implement a queue using two stacks. 
// Analyze the running time of the queue operations.
//--------------------------------------------------
// Solution: Let's assign a role of "enqueue stack" to one of stacks and a role of "dequeue stack" to other one.
// For every enqueue operation, we will push a value to "enqueue stack".
// For every dequeue operation we will do the following:
//		- if "dequeue stack" is empty, pop all values from "enqueue stack" and push it on "dequeue stack".
//		- pop a value from "dequeue stack"
//
// running time analysis:
//		- Running time for every enqueue operation is O(1), since it is only one push operation on "enqueue stack".
//		- Let's say that when dequeue operation is executed, a "dequeue stack" is empty and "enqueue stack" contains k values.
//		  It requires a k pop and k push operations on "enqueue stack" and "dequeue stack" respectively and one pop operation on "dequeue stack", 
//		  but next k-1 dequeue operations require only one pop operation on "dequeue stack".
//		  Is this amortized O(1) running time!?
