var stack = require('./stackList');

var s = stack();
QUnit.module('StackList API tests', {
  beforeEach: function() {
    console.log('Stack API tests: test starting...');
  },
  afterEach: function() {
    console.log('StackList API tests: test ending...');
  }
});
QUnit.test('stack initialization tests - initial state checking', function (assert) {
	assert.ok(s.isEmpty(), 'stack initially empty');
	assert.equal(s.size(), 0, 'size is 0');
	assert.strictEqual(s.peek(), null, 'empty stack, peek() returns null');
	assert.throws(function() {s.pop()}, /Stack underflow/, 'stack underflow error thrown');

// 'Non-empty stack state check'
	s.push(1);
	// check stacke state when it's not empty
	assert.equal(s.isEmpty(), false, 'stack not empty anymore');
	assert.equal(s.size(), 1, 'size is 1');
	assert.equal(s.peek(), 1, 'peek() returns 1');
	assert.equal(s.peek(), 1, 'peek() returns 1 again');


// 'Full stack state check'
	s.push(2);
	assert.equal(s.size(), 2, 'size is 2');
	s.push(3);
	s.push(4);
	s.push(5);
	// check state when stack is full
	assert.equal(s.size(), 5, 'size is 5');
	assert.equal(s.peek(), 5, 'peek() returns 5');
	assert.equal(s.peek(), 5, 'peek() returns 5 again');
	assert.equal(s.isEmpty(), false, 'stack not empty');
	
// 'Empty stack state check'
	s.pop();
	s.pop();
	s.pop();
	s.pop();
	s.pop();
	// check that everithing works the same as in initial state
	assert.ok(s.isEmpty(), 'stack is empty again');
	assert.equal(s.size(), 0, 'size is 0 again');
	assert.strictEqual(s.peek(), null, 'empty stack, peek() returns null');

// 'push/pop tests'
	s.push(1);
	assert.equal(s.peek(), 1, 'pushed 1');
	s.push(2);
	assert.equal(s.peek(), 2, 'pushed 2');
	s.push(3);
	assert.equal(s.peek(), 3, 'pushed 3');
	s.push(4);
	assert.equal(s.peek(), 4, 'pushed 4');
	s.push(5);
	assert.equal(s.peek(), 5, 'pushed 5');
	assert.equal(s.pop(), 5, 'poped 5');
	assert.equal(s.pop(), 4, 'poped 4');
	s.push(4);
	assert.equal(s.peek(), 4, 'pushed 4');
	assert.equal(s.pop(), 4, 'poped 4');
	assert.equal(s.pop(), 3, 'poped 3');
	assert.equal(s.pop(), 2, 'poped 2');
	assert.equal(s.pop(), 1, 'poped 1');
	s.push(1);
	assert.equal(s.peek(), 1, 'pushed 1');
	s.push(2);
	assert.equal(s.peek(), 2, 'pushed 2');
	assert.equal(s.pop(), 2, 'poped 2');
	assert.equal(s.pop(), 1, 'poped 1');
});








