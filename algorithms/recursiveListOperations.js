var list = require('../lists/listSL.js');


function cons(elem, l) {
    return l.addFront(elem);
}

function head(l) {
    return list().addFront(l.first().data);
}

function tail(l) {
    return l.first().next;
}

function length(list) {
    if (list.isEmpty()) {
        return 0;
    }
    return 1 + length(tail(list));
}

function reverse(list) {
    if (list.isEmpty()) {
        return newList(); // empty list
    }
    return append(head(list), reverse(tail(list)));
}

function drop(n, list) {
    if (n === 0 || list.isEmpty()) {
        return list;
    }
    
    return drop(n - 1, tail(list));
}

function init(list) {
    if (length(list) === 1) {
        return newList();
    }
    return cons(head(list), init(tail(list)));
}

/**
 * Append list1 on list2
 * @param   {list} l1 
 * @param   {list} l2 
 * @returns {list} appended list
 */
function append(l1, l2) {
    if (l2.isEmpty()) {
        return l1;
    }
    cons(head(l1), append(tail(l1), l2));
}

function replicate(n, elem) {
    if (n === 0) {
        return newList();
    }
    cons(elem, replicate(n-1, elem));   
}

function map(f, list) {
    if (list.isEmpty()) {
        return newList();
    }
    cons(f(list.first()), map(f, tail(list)));
} 

function filter (p, list) {
    if (list.isEmpty()) {
        return newList();
    } else if (p(list.first())) {
        cons(list.first(), filter(p, tail(list)));
    } else {
        filter(p, tail(list));
    }
}

function foldr(f, v) {
    return function (list) {
        if (list.isEmpty()) {
            return v;
        } else {
            return f(list.first(), foldr(f, v, tail(list)));
        }
    }
}

var sum = foldr((a,b) => a + b, 0);
var map = (function() {
    return function (f, list) {
        return foldr((a,b) => cons(f(a), b), [], list);
    }
}());
