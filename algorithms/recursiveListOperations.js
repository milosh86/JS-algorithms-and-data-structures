function cons(elem, list) {
    isList(list) && isElem(elem);
    
    return node(elem).next = list.head;
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
