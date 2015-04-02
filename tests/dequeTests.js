var dq = deque(5);
QUnit.module('Deque API tests');

QUnit.test('deque tests', function (assert) {
	assert.ok(dq.isEmpty(), 'deque initially empty');
	assert.equal(dq.isFull(), false, 'deque not full initially');
	assert.equal(dq.capacity(), 5, 'capacity set correctly');
	assert.equal(dq.size(), 0, 'size is 0');
	assert.strictEqual(dq.peekFront(), null, 'empty deque, peekFront() returns null');
	assert.strictEqual(dq.peekBack(), null, 'empty deque, peekBack() returns null');
	assert.throws(function() {dq.popBack()}, /deque underflow/, 'deque underflow error thrown');

//'Non-empty deque state check'
	dq.pushBack(1);
	// check stacke state when it's not empty
	assert.equal(dq.isEmpty(), false, 'deque not empty anymore');
	assert.equal(dq.isFull(), false, 'deque not full yet');
	assert.equal(dq.capacity(), 5, 'capacity should always be the same');
	assert.equal(dq.size(), 1, 'size is 1');
	assert.equal(dq.peekFront(), 1, 'peekFront() returns 1');
	assert.equal(dq.peekBack(), 1, 'peekBack() also returns 1');

//'Full deque state check'
	dq.pushBack(2);
	assert.equal(dq.size(), 2, 'size is 2');
	dq.pushBack(3);
	dq.pushBack(4);
	dq.pushBack(5);
	// check state when stack is full
	assert.equal(dq.size(), 5, 'size is 5');
	assert.equal(dq.capacity(), 5, 'capacity should always be the same');
	assert.equal(dq.peekFront(), 1, 'peekFront() returns 1');
	console.log('PUSH: ', dq.peekBack(), dq._arr, dq._tail)
	assert.equal(dq.peekBack(), 5, 'peekBack() returns 5');
	assert.equal(dq.isEmpty(), false, 'deque not empty');
	assert.equal(dq.isFull(), true, 'deque is full now');
	assert.throws(function() {dq.pushBack(6)}, /deque overflow/, 'deque overflow error thrown');

// 'Empty queue state check'
	dq.popBack();
	dq.popFront();
	dq.popBack();
	dq.popFront();
	dq.popBack();
	// check that everithing works the same as in initial state
	assert.ok(dq.isEmpty(), 'deque is empty again');
	assert.equal(dq.isFull(), false, 'deque not full initially');
	assert.equal(dq.capacity(), 5, 'capacity remains the same');
	assert.equal(dq.size(), 0, 'size is 0 again');
	assert.strictEqual(dq.peekFront(), null, 'empty deque, peek() returns null');
	assert.strictEqual(dq.peekBack(), null, 'empty deque, peek() returns null');
	assert.throws(function() {dq.popBack()}, /deque underflow/, 'deque underflow error thrown');

//'pushBack - popBack
	dq.pushBack(1);
	dq.pushBack(2);
	dq.pushBack(3);
	dq.pushBack(4);
	assert.equal(dq.pushBack(5), true, 'pushBack returns true');
	assert.equal(dq.pushBack(null), false, 'null: pushBack returns false, nothing added');
	assert.equal(dq.pushBack(), false, 'undefined: pushBack returns false, nothing added');
	assert.equal(dq.pushBack(''), false, '"": pushBack returns false, nothing added');
	assert.equal(dq.popBack(), 5, 'popBack 5');
	assert.equal(dq.popBack(), 4, 'popBack 4');
	assert.equal(dq.popBack(), 3, 'popBack 3');
	assert.equal(dq.popBack(), 2, 'popBack 2');
	assert.equal(dq.popBack(), 1, 'popBack 1');
	assert.throws(function() {dq.popBack()}, /deque underflow/, 'popBack: deque underflow error thrown');
	
	// pushBack - popFront
	dq.pushBack(1);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushBack(2);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 2, 'peek() returns 2');
	dq.pushBack(3);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 3, 'peek() returns 3');
	dq.pushBack(4);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 4, 'peek() returns 4');
	
	assert.equal(dq.pushBack(5), true, 'pushBack returns true');
	
	assert.equal(dq.popFront(), 1, 'popFront 1');
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popFront(), 2, 'popFront 2');
	assert.equal(dq.popFront(), 3, 'popFront 3');
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popFront(), 4, 'popFront 4');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popFront(), 5, 'popFront 5');
	assert.throws(function() {dq.popFront()}, /deque underflow/, 'popFront: deque underflow error thrown');
	
	// pushFront - popBack
	dq.pushFront(1);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(2);
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(3);
	assert.strictEqual(dq.peekFront(), 3, 'peek() returns 3');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(4);
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	
	assert.equal(dq.pushFront(5), true, 'pushBack returns true');
	
	assert.equal(dq.popBack(), 1, 'popBack 1');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 2, 'peek() returns 2');
	assert.equal(dq.popBack(), 2, 'popBack 2');
	assert.equal(dq.popBack(), 3, 'popBack 3');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 4, 'peek() returns 4');
	assert.equal(dq.popBack(), 4, 'popBack 4');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popBack(), 5, 'popBack 5');
	assert.strictEqual(dq.peekFront(), null, 'peek() returns null');
	assert.strictEqual(dq.peekBack(), null, 'peek() returns null');
	assert.throws(function() {dq.popBack()}, /deque underflow/, 'popFront: deque underflow error thrown');
	
	// pushFront - popFront
	dq.pushFront(1);
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(2);
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(3);
	assert.strictEqual(dq.peekFront(), 3, 'peek() returns 3');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	dq.pushFront(4);
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	
	assert.equal(dq.pushFront(5), true, 'pushBack returns true');
	
	assert.equal(dq.popFront(), 5, 'popFront 5');
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	assert.equal(dq.popFront(), 4, 'popFront 4');
	assert.equal(dq.popFront(), 3, 'popFront 3');
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	assert.equal(dq.popFront(), 2, 'popFront 2');
	assert.strictEqual(dq.peekFront(), 1, 'peek() returns 1');
	assert.strictEqual(dq.peekBack(), 1, 'peek() returns 1');
	assert.equal(dq.popFront(), 1, 'popFront 1');
	assert.throws(function() {dq.popFront()}, /deque underflow/, 'popFront: deque underflow error thrown');
	
	// pushBack-PopFront in steps - moving to left
	dq.pushBack(1);
	dq.pushBack(2);
	dq.pushBack(3);
	dq.pushBack(4);
	assert.equal(dq.popFront(), 1, 'popFront 1');
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 4, 'peek() returns 4');
	dq.pushBack(5);
	assert.strictEqual(dq.peekFront(), 2, 'peek() returns 2');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	assert.equal(dq.popFront(), 2, 'popFront 2');
	assert.strictEqual(dq.peekFront(), 3, 'peek() returns 3');
	assert.strictEqual(dq.peekBack(), 5, 'peek() returns 5');
	dq.pushBack(6);
	assert.equal(dq.popFront(), 3, 'popFront 3');
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 6, 'peek() returns 6');
	dq.pushBack(7);
	assert.equal(dq.popFront(), 4, 'popFront 4');
	dq.pushBack(8);
	assert.equal(dq.popFront(), 5, 'popFront 5');
	assert.strictEqual(dq.peekFront(), 6, 'peek() returns 6');
	assert.strictEqual(dq.peekBack(), 8, 'peek() returns 8');
	dq.pushBack(9);
	assert.equal(dq.popFront(), 6, 'popFront 6');
	assert.equal(dq.popFront(), 7, 'popFront 7');
	assert.strictEqual(dq.peekFront(), 8, 'peek() returns 8');
	assert.strictEqual(dq.peekBack(), 9, 'peek() returns 9');
	assert.equal(dq.popFront(), 8, 'popFront 8');
	assert.equal(dq.popFront(), 9, 'popFront 9');
	
	
	// pushFront-popBack in steps - moving to right
	dq.pushFront(1);
	dq.pushFront(2);
	dq.pushFront(3);
	dq.pushFront(4);
	assert.equal(dq.popBack(), 1, 'popBack 1');
	assert.strictEqual(dq.peekFront(), 4, 'peek() returns 4');
	assert.strictEqual(dq.peekBack(), 2, 'peek() returns 2');
	dq.pushFront(5);
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 2, 'peek() returns 2');
	assert.equal(dq.popBack(), 2, 'popBack 2');
	assert.strictEqual(dq.peekFront(), 5, 'peek() returns 5');
	assert.strictEqual(dq.peekBack(), 3, 'peek() returns 3');
	dq.pushFront(6);
	assert.equal(dq.popBack(), 3, 'popBack 3');
	assert.strictEqual(dq.peekFront(), 6, 'peek() returns 6');
	assert.strictEqual(dq.peekBack(), 4, 'peek() returns 4');
	dq.pushFront(7);
	assert.equal(dq.popBack(), 4, 'popBack 4');
	dq.pushFront(8);
	assert.equal(dq.popBack(), 5, 'popBack 5');
	assert.strictEqual(dq.peekFront(), 8, 'peek() returns 8');
	assert.strictEqual(dq.peekBack(), 6, 'peek() returns 6');
	dq.pushFront(9);
	assert.equal(dq.popBack(), 6, 'popBack 6');
	assert.equal(dq.popBack(), 7, 'popBack 7');
	assert.strictEqual(dq.peekFront(), 9, 'peek() returns 9');
	assert.strictEqual(dq.peekBack(), 8, 'peek() returns 8');
	assert.equal(dq.popBack(), 8, 'popBack 8');
	assert.equal(dq.popBack(), 9, 'popBack 9');
	
	
});