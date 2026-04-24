---
title: "Data Structures & Algorithms: A Complete Guide with Python Examples"
description: "Master the fundamental data structures and algorithms every programmer needs, with clear Python implementations and complexity analysis."
date: 2026-04-24
category: computer-science
tags: ["data-structures", "algorithms", "python", "DSA", "programming"]
image: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=800&q=80"
featured: true
draft: false
---

## Why Data Structures and Algorithms Matter

Every piece of software you use — from Google Search to Instagram's feed — relies on carefully chosen data structures and algorithms. They determine whether your program runs in milliseconds or minutes, whether it handles 100 users or 100 million.

This guide covers the essential data structures and algorithms with Python implementations you can run, modify, and learn from.

## Arrays and Lists

An array stores elements in contiguous memory. Python's `list` is a dynamic array that resizes automatically.

```python
# Creating and manipulating lists
numbers = [10, 20, 30, 40, 50]

# Access by index - O(1)
print(numbers[2])  # 30

# Append - O(1) amortized
numbers.append(60)

# Insert at position - O(n)
numbers.insert(0, 5)

# Remove by value - O(n)
numbers.remove(30)

# Search - O(n)
print(20 in numbers)  # True

# Slicing - O(k) where k is slice size
subset = numbers[1:4]
print(subset)  # [10, 20, 40]
```

**Time Complexity:**
| Operation | Average |
|-----------|---------|
| Access    | $O(1)$  |
| Search    | $O(n)$  |
| Insert    | $O(n)$  |
| Append    | $O(1)$  |

## Linked Lists

A linked list stores elements as nodes, each pointing to the next. Unlike arrays, insertions and deletions at known positions are $O(1)$, but random access is $O(n)$.

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data):
        if not self.head:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next

    def search(self, data):
        current = self.head
        while current:
            if current.data == data:
                return True
            current = current.next
        return False

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements))

# Usage
ll = LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)
ll.prepend(5)
ll.display()       # 5 -> 10 -> 20 -> 30
ll.delete(20)
ll.display()       # 5 -> 10 -> 30
print(ll.search(10))  # True
```

## Stacks

A stack follows **Last-In, First-Out (LIFO)** — like a stack of plates. The last element added is the first one removed.

```python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Usage
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.peek())  # 3
print(stack.pop())   # 3
print(stack.pop())   # 2
print(stack.size())  # 1
```

### Practical example: Balanced parentheses checker

```python
def is_balanced(expression):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}

    for char in expression:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()

    return len(stack) == 0

print(is_balanced("({[()]})"))   # True
print(is_balanced("({[()]}"))    # False
print(is_balanced(")("))         # False
```

## Queues

A queue follows **First-In, First-Out (FIFO)** — like a line at a store.

```python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()

    def front(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Usage
q = Queue()
q.enqueue("Alice")
q.enqueue("Bob")
q.enqueue("Charlie")
print(q.dequeue())  # Alice
print(q.front())    # Bob
print(q.size())     # 2
```

## Hash Tables (Dictionaries)

Hash tables map keys to values using a hash function, giving $O(1)$ average-case lookups.

```python
# Python's dict is a hash table
phonebook = {}

# Insert - O(1)
phonebook["Alice"] = "555-0101"
phonebook["Bob"] = "555-0102"
phonebook["Charlie"] = "555-0103"

# Lookup - O(1)
print(phonebook["Alice"])  # 555-0101

# Check existence - O(1)
print("Bob" in phonebook)  # True

# Delete - O(1)
del phonebook["Charlie"]

# Iterate - O(n)
for name, number in phonebook.items():
    print(f"{name}: {number}")
```

### Building a hash table from scratch

```python
class HashTable:
    def __init__(self, size=64):
        self.size = size
        self.table = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        self.table[index].append((key, value))

    def get(self, key):
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        raise KeyError(key)

    def delete(self, key):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index].pop(i)
                return
        raise KeyError(key)

# Usage
ht = HashTable()
ht.put("name", "Alice")
ht.put("age", 30)
print(ht.get("name"))  # Alice
print(ht.get("age"))   # 30
```

## Trees

### Binary Search Tree (BST)

A BST maintains the property: left child < parent < right child, enabling $O(\log n)$ search on average.

```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = TreeNode(value)
        else:
            self._insert(self.root, value)

    def _insert(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert(node.right, value)

    def search(self, value):
        return self._search(self.root, value)

    def _search(self, node, value):
        if node is None:
            return False
        if value == node.value:
            return True
        elif value < node.value:
            return self._search(node.left, value)
        else:
            return self._search(node.right, value)

    def inorder(self):
        """Returns sorted elements"""
        result = []
        self._inorder(self.root, result)
        return result

    def _inorder(self, node, result):
        if node:
            self._inorder(node.left, result)
            result.append(node.value)
            self._inorder(node.right, result)

    def preorder(self):
        result = []
        self._preorder(self.root, result)
        return result

    def _preorder(self, node, result):
        if node:
            result.append(node.value)
            self._preorder(node.left, result)
            self._preorder(node.right, result)

    def postorder(self):
        result = []
        self._postorder(self.root, result)
        return result

    def _postorder(self, node, result):
        if node:
            self._postorder(node.left, result)
            self._postorder(node.right, result)
            result.append(node.value)

# Usage
bst = BinarySearchTree()
for val in [50, 30, 70, 20, 40, 60, 80]:
    bst.insert(val)

print(bst.inorder())    # [20, 30, 40, 50, 60, 70, 80]
print(bst.preorder())   # [50, 30, 20, 40, 70, 60, 80]
print(bst.postorder())  # [20, 40, 30, 60, 80, 70, 50]
print(bst.search(40))   # True
print(bst.search(45))   # False
```

## Heaps and Priority Queues

A **min-heap** is a complete binary tree where every parent is smaller than its children. It gives $O(1)$ access to the minimum and $O(\log n)$ insert/delete.

```python
import heapq

# Min-heap using heapq
heap = []
heapq.heappush(heap, 30)
heapq.heappush(heap, 10)
heapq.heappush(heap, 50)
heapq.heappush(heap, 20)

print(heap[0])           # 10 (minimum element)
print(heapq.heappop(heap))  # 10
print(heapq.heappop(heap))  # 20

# Build heap from list - O(n)
nums = [40, 10, 30, 50, 20]
heapq.heapify(nums)
print(nums)  # [10, 20, 30, 50, 40]

# Find k largest elements - O(n log k)
data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
print(heapq.nlargest(3, data))   # [9, 6, 5]
print(heapq.nsmallest(3, data))  # [1, 1, 2]
```

## Graphs

Graphs model relationships between objects. Here's an implementation with BFS and DFS traversals.

```python
from collections import defaultdict, deque

class Graph:
    def __init__(self, directed=False):
        self.adj_list = defaultdict(list)
        self.directed = directed

    def add_edge(self, u, v):
        self.adj_list[u].append(v)
        if not self.directed:
            self.adj_list[v].append(u)

    def bfs(self, start):
        """Breadth-First Search - explore level by level"""
        visited = set([start])
        queue = deque([start])
        order = []

        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in self.adj_list[node]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        return order

    def dfs(self, start):
        """Depth-First Search - explore as deep as possible"""
        visited = set()
        order = []
        self._dfs_helper(start, visited, order)
        return order

    def _dfs_helper(self, node, visited, order):
        visited.add(node)
        order.append(node)
        for neighbor in self.adj_list[node]:
            if neighbor not in visited:
                self._dfs_helper(neighbor, visited, order)

    def has_path(self, start, end):
        """Check if path exists between two nodes"""
        visited = set()
        return self._has_path(start, end, visited)

    def _has_path(self, current, end, visited):
        if current == end:
            return True
        visited.add(current)
        for neighbor in self.adj_list[current]:
            if neighbor not in visited:
                if self._has_path(neighbor, end, visited):
                    return True
        return False

# Usage
g = Graph()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)
g.add_edge(3, 4)

print(g.bfs(0))         # [0, 1, 2, 3, 4]
print(g.dfs(0))         # [0, 1, 3, 2, 4]
print(g.has_path(0, 4)) # True
print(g.has_path(4, 0)) # True
```

## Sorting Algorithms

### Bubble Sort — $O(n^2)$

Simple but slow. Repeatedly swaps adjacent elements that are out of order.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# [11, 12, 22, 25, 34, 64, 90]
```

### Merge Sort — $O(n \log n)$

Divide-and-conquer: split the array in half, sort each half, then merge.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# [3, 9, 10, 27, 38, 43, 82]
```

### Quick Sort — $O(n \log n)$ average

Pick a pivot, partition elements into smaller/larger groups, recurse.

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([10, 7, 8, 9, 1, 5]))
# [1, 5, 7, 8, 9, 10]
```

### Sorting comparison

| Algorithm    | Best       | Average        | Worst          | Space    | Stable |
|-------------|------------|----------------|----------------|----------|--------|
| Bubble Sort | $O(n)$     | $O(n^2)$       | $O(n^2)$       | $O(1)$   | Yes    |
| Merge Sort  | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$   | Yes    |
| Quick Sort  | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$      | $O(\log n)$ | No  |
| Python sort | $O(n)$     | $O(n \log n)$ | $O(n \log n)$  | $O(n)$   | Yes    |

## Searching Algorithms

### Linear Search — $O(n)$

```python
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

print(linear_search([4, 2, 7, 1, 9], 7))  # 2
print(linear_search([4, 2, 7, 1, 9], 5))  # -1
```

### Binary Search — $O(\log n)$

Requires a sorted array. Eliminates half the search space each step.

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

sorted_arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(sorted_arr, 23))   # 5
print(binary_search(sorted_arr, 100))  # -1
```

### Binary Search (Recursive)

```python
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1

    if left > right:
        return -1

    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

print(binary_search_recursive([1, 3, 5, 7, 9, 11], 7))  # 3
```

## Dynamic Programming

Dynamic programming solves complex problems by breaking them into overlapping subproblems and caching results.

### Fibonacci — from $O(2^n)$ to $O(n)$

```python
# Naive recursive - O(2^n) - DON'T use this
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# Memoized (top-down DP) - O(n)
def fib_memo(n, cache={}):
    if n in cache:
        return cache[n]
    if n <= 1:
        return n
    cache[n] = fib_memo(n - 1) + fib_memo(n - 2)
    return cache[n]

# Tabulated (bottom-up DP) - O(n) time, O(n) space
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# Space-optimized - O(n) time, O(1) space
def fib_optimal(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fib_optimal(50))  # 12586269025
```

### 0/1 Knapsack Problem

Given items with weights and values, find the maximum value that fits in a knapsack of capacity $W$.

```python
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i
            dp[i][w] = dp[i - 1][w]
            # Take item i (if it fits)
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                )

    return dp[n][capacity]

weights = [2, 3, 4, 5]
values  = [3, 4, 5, 6]
capacity = 8
print(knapsack(weights, values, capacity))  # 10
```

## Recursion Essentials

### Tower of Hanoi

```python
def tower_of_hanoi(n, source='A', auxiliary='B', target='C'):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    tower_of_hanoi(n - 1, source, target, auxiliary)
    print(f"Move disk {n} from {source} to {target}")
    tower_of_hanoi(n - 1, auxiliary, source, target)

tower_of_hanoi(3)
# Move disk 1 from A to C
# Move disk 2 from A to B
# Move disk 1 from C to B
# Move disk 3 from A to C
# Move disk 1 from B to A
# Move disk 2 from B to C
# Move disk 1 from A to C
```

## Complexity Cheat Sheet

| Complexity     | Name         | Example                        |
|---------------|--------------|--------------------------------|
| $O(1)$        | Constant     | Hash table lookup              |
| $O(\log n)$   | Logarithmic  | Binary search                  |
| $O(n)$        | Linear       | Linear search                  |
| $O(n \log n)$ | Linearithmic | Merge sort, Quick sort         |
| $O(n^2)$      | Quadratic    | Bubble sort, nested loops      |
| $O(2^n)$      | Exponential  | Naive Fibonacci, power set     |
| $O(n!)$       | Factorial    | Brute-force permutations       |

## Where to Go From Here

This guide covers the foundations. To go deeper:

- **Practice**: Solve problems on LeetCode, HackerRank, or Codeforces
- **Learn advanced structures**: AVL trees, Red-Black trees, Tries, Segment trees
- **Study graph algorithms**: Dijkstra's, A*, topological sort, minimum spanning trees
- **Master DP patterns**: LCS, edit distance, matrix chain multiplication

The key insight is that **choosing the right data structure is often more important than writing clever code**. A hash table turns an $O(n)$ search into $O(1)$. A heap turns finding the minimum from $O(n)$ to $O(1)$. Know your tools, and the solutions become obvious.
