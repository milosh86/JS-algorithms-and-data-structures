var q = queue(5);
QUnit.module('Queue API tests', {
  beforeEach: function() {
    console.log('Queue API tests: test starting...');
  },
  afterEach: function() {
    console.log('Queue API tests: test ending...');
  }
});

QUnit.test('queue initialization tests - initial state checking', function (assert) {
	assert.ok(q.isEmpty(), 'queue initially empty');
	assert.equal(q.isFull(), false, 'queue not full initially');
	assert.equal(q.capacity(), 5, 'capacity set correctly');
	assert.equal(q.size(), 0, 'size is 0');
	assert.strictEqual(q.peek(), null, 'empty stack, peek() returns null');
	assert.throws(function() {q.dequeue()}, /queue underflow/, 'queue underflow error thrown');
});

QUnit.test('Non-empty queue state check', function (assert) {
	q.enqueue(1);
	// check stacke state when it's not empty
	assert.equal(q.isEmpty(), false, 'queue not empty anymore');
	assert.equal(q.isFull(), false, 'queue not full yet');
	assert.equal(q.capacity(), 5, 'capacity should always be the same');
	assert.equal(q.size(), 1, 'size is 1');
	assert.equal(q.peek(), 1, 'peek() returns 1');
	assert.equal(q.peek(), 1, 'peek() returns 1 again');
});

QUnit.test('Full queue state check', function (assert) {
	q.enqueue(2);
	assert.equal(q.size(), 2, 'size is 2');
	q.enqueue(3);
	q.enqueue(4);
	q.enqueue(5);
	// check state when stack is full
	assert.equal(q.size(), 5, 'size is 5');
	assert.equal(q.capacity(), 5, 'capacity should always be the same');
	assert.equal(q.peek(), 1, 'peek() returns 1');
	assert.equal(q.peek(), 1, 'peek() returns 1 again');
	assert.equal(q.isEmpty(), false, 'queue not empty');
	assert.equal(q.isFull(), true, 'queue is full now');
	assert.throws(function() {q.enqueue(6)}, /queue overflow/, 'queue overflow error thrown');
});

QUnit.test('Empty queue state check', function (assert) {
	q.dequeue();
	q.dequeue();
	q.dequeue();
	q.dequeue();
	q.dequeue();
	// check that everithing works the same as in initial state
	assert.ok(q.isEmpty(), 'queue is empty again');
	assert.equal(q.isFull(), false, 'queue not full initially');
	assert.equal(q.capacity(), 5, 'capacity remains the same');
	assert.equal(q.size(), 0, 'size is 0 again');
	assert.strictEqual(q.peek(), null, 'empty queue, peek() returns null');
	assert.throws(function() {q.dequeue()}, /queue underflow/, 'queue underflow error thrown');
});

QUnit.test('enqueue/dequeue tests', function (assert) {
	q.enqueue(1);
	q.enqueue(2);
	q.enqueue(3);
	q.enqueue(4);
	q.enqueue(5);
	assert.equal(q.dequeue(), 1, 'dequeued 1');
	assert.equal(q.dequeue(), 2, 'dequeued 2');
	q.enqueue(6);
	assert.equal(q.dequeue(), 3, 'dequeued 3');
	assert.equal(q.dequeue(), 4, 'dequeued 4');
	assert.equal(q.dequeue(), 5, 'dequeued 5');
	assert.equal(q.dequeue(), 6, 'dequeued 6');
	q.enqueue(1);
	assert.equal(q.peek(), 1, 'enqueued 1');
	q.enqueue(2);
	assert.equal(q.dequeue(), 1, 'dequeued 1');
	assert.equal(q.dequeue(), 2, 'dequeued 2');
});