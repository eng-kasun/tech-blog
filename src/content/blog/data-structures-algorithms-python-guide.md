---
title: "Data Structures & Algorithms: A Complete Guide with Python Examples"
description: "Master the fundamental data structures and algorithms every programmer needs — theory, intuition, and concise Python examples."
date: 2026-04-24
category: computer-science
tags: ["data-structures", "algorithms", "python", "DSA", "programming"]
image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80"
featured: true
draft: false
---

## Why Data Structures and Algorithms Matter

Imagine you need to find a word in a dictionary. You wouldn't start from page one and read every word — you'd open it roughly in the middle, check if you're too far forward or behind, and narrow down. That intuition is **binary search**, and it's the difference between checking 100,000 words one by one versus finding your answer in just 17 steps.

Every piece of software you use relies on carefully chosen data structures and algorithms. They determine whether your program runs in milliseconds or minutes, whether it scales to millions of users or crashes at a hundred. Understanding them is the single most important skill in computer science.

## Arrays: The Foundation of Everything

An **array** is the simplest data structure — a contiguous block of memory where elements are stored side by side, each accessible by its position (index).

Think of it like a row of numbered lockers. If you know the locker number, you can open it instantly — that's $O(1)$ access. But if you need to find which locker contains a specific item, you must check them one by one — that's $O(n)$ search.

The key tradeoff: arrays give you **fast access by position** but **slow insertions and deletions** in the middle, because all subsequent elements must shift over.

```python
fruits = ["apple", "banana", "cherry", "date"]

# Instant access by index
print(fruits[2])  # cherry

# Searching requires scanning
print("banana" in fruits)  # True

# Inserting in the middle shifts everything after it
fruits.insert(1, "blueberry")
print(fruits)  # ['apple', 'blueberry', 'banana', 'cherry', 'date']
```

## Linked Lists: Trading Access for Flexibility

A **linked list** solves the array's insertion problem. Instead of storing elements contiguously, each element (called a **node**) holds its data and a pointer to the next node — like a treasure hunt where each clue leads to the next.

This means inserting or deleting a node is $O(1)$ if you already have a reference to the right position — you just rewire the pointers. But finding a specific element requires walking the chain from the beginning, making search $O(n)$.

**When to use linked lists**: when you need frequent insertions/deletions at arbitrary positions and don't need random access. They're the backbone of stacks, queues, and many other structures.

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Build a chain: 10 -> 20 -> 30
head = Node(10)
head.next = Node(20)
head.next.next = Node(30)

# Walk the chain
current = head
while current:
    print(current.data, end=" -> ")
    current = current.next
# Output: 10 -> 20 -> 30 ->
```

## Stacks: Last In, First Out

A **stack** is like a stack of plates — you can only add or remove from the top. The last item placed on top is the first one taken off. This principle is called **LIFO** (Last-In, First-Out).

Stacks are everywhere in computing:
- **Function calls**: when a function calls another function, the current state is pushed onto the call stack. When the inner function returns, the state is popped back.
- **Undo operations**: each action is pushed onto a stack; pressing Ctrl+Z pops the most recent one.
- **Expression evaluation**: compilers use stacks to parse mathematical expressions and check balanced brackets.

The two core operations are **push** (add to top) and **pop** (remove from top), both $O(1)$.

```python
stack = []
stack.append("first")
stack.append("second")
stack.append("third")

print(stack.pop())  # third  (last in, first out)
print(stack.pop())  # second
print(stack)        # ['first']
```

### Classic application: checking balanced parentheses

```python
def is_balanced(expr):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for char in expr:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
    return len(stack) == 0

print(is_balanced("{[()]}"))  # True
print(is_balanced("{[(])}"))  # False
```

## Queues: First In, First Out

A **queue** works like a line at a coffee shop — the first person in line is the first one served. This is **FIFO** (First-In, First-Out).

Queues are essential for:
- **Task scheduling**: operating systems queue processes waiting for CPU time
- **Breadth-first search**: exploring a graph level by level
- **Message systems**: requests are processed in the order they arrive
- **Buffering**: streaming data is queued before playback

The two core operations are **enqueue** (add to back) and **dequeue** (remove from front).

```python
from collections import deque

queue = deque()
queue.append("Alice")     # enqueue
queue.append("Bob")
queue.append("Charlie")

print(queue.popleft())    # Alice  (first in, first out)
print(queue.popleft())    # Bob
```

**Why `deque`?** Using a regular list with `pop(0)` is $O(n)$ because every element shifts. `deque` (double-ended queue) gives $O(1)$ for both ends.

## Hash Tables: The $O(1)$ Lookup Machine

A **hash table** (Python's `dict`) is perhaps the most practically important data structure. It maps **keys** to **values** using a **hash function** — a function that converts any key into an array index.

The magic: instead of searching through data to find what you want, you compute where it *should* be and go directly there. Average-case lookup, insertion, and deletion are all $O(1)$.

**How it works internally:**
1. You provide a key (e.g., `"Alice"`)
2. The hash function converts it to an integer (e.g., `4837261`)
3. That integer is mapped to an array index (e.g., `4837261 % 64 = 29`)
4. The value is stored at index 29

**Collisions** occur when two keys hash to the same index. Common solutions include **chaining** (storing a list at each index) and **open addressing** (probing for the next empty slot).

```python
# Python dict is a hash table
phonebook = {
    "Alice": "555-0101",
    "Bob": "555-0102",
    "Charlie": "555-0103",
}

# O(1) lookup
print(phonebook["Alice"])      # 555-0101
print("Bob" in phonebook)      # True

# O(1) insert and delete
phonebook["Diana"] = "555-0104"
del phonebook["Charlie"]
```

## Trees: Hierarchical Data

A **tree** is a hierarchical structure where each node has zero or more children. The topmost node is called the **root**, nodes with no children are **leaves**, and the connections are **edges**.

Trees model naturally hierarchical data: file systems, HTML documents, organizational charts, and decision processes.

### Binary Search Trees (BST)

A **BST** enforces one rule: for every node, all values in its left subtree are smaller, and all values in its right subtree are larger. This property enables $O(\log n)$ search on average — at each step, you eliminate half the remaining tree.

However, if elements are inserted in sorted order, the tree degenerates into a linked list with $O(n)$ performance. Self-balancing variants like **AVL trees** and **Red-Black trees** solve this by automatically restructuring after insertions.

```python
class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

def search(root, val):
    if not root:
        return False
    if val == root.val:
        return True
    elif val < root.val:
        return search(root.left, val)
    else:
        return search(root.right, val)

# Build tree: insert 50, 30, 70, 20, 40
root = None
for v in [50, 30, 70, 20, 40]:
    root = insert(root, v)

print(search(root, 40))   # True
print(search(root, 45))   # False
```

### Tree Traversals

There are three classic ways to visit every node:
- **Inorder** (Left → Root → Right) — produces sorted output for a BST
- **Preorder** (Root → Left → Right) — useful for copying a tree
- **Postorder** (Left → Right → Root) — useful for deleting a tree

```python
def inorder(node):
    if node:
        inorder(node.left)
        print(node.val, end=" ")
        inorder(node.right)

inorder(root)  # 20 30 40 50 70
```

## Heaps: Fast Access to the Extreme

A **heap** is a specialized tree where the parent is always smaller (min-heap) or larger (max-heap) than its children. This guarantees that the minimum (or maximum) element is always at the root — accessible in $O(1)$.

Heaps power **priority queues**, where elements are processed not in arrival order but by priority. Operating systems use them for job scheduling; Dijkstra's shortest path algorithm depends on them; and any "find the top K" problem is a heap problem.

Insertion and extraction both take $O(\log n)$ because the heap property is restored by "bubbling" elements up or down.

```python
import heapq

tasks = []
heapq.heappush(tasks, (3, "Low priority task"))
heapq.heappush(tasks, (1, "Critical task"))
heapq.heappush(tasks, (2, "Medium task"))

# Always get the highest-priority (lowest number) first
print(heapq.heappop(tasks))  # (1, 'Critical task')
print(heapq.heappop(tasks))  # (2, 'Medium task')
```

## Graphs: Modeling Connections

A **graph** consists of **vertices** (nodes) and **edges** (connections). Unlike trees, graphs can have cycles, and edges can be directed or undirected, weighted or unweighted.

Graphs model social networks (who follows whom), road maps (cities and distances), web pages (links), dependencies (which tasks must complete before others), and countless other real-world systems.

### Representation

The two main ways to store a graph:
- **Adjacency list**: each vertex stores a list of its neighbors. Space-efficient for sparse graphs.
- **Adjacency matrix**: a 2D grid where `matrix[i][j] = 1` means an edge from vertex `i` to `j`. Fast edge lookup but uses $O(V^2)$ space.

### BFS and DFS

**Breadth-First Search (BFS)** explores all neighbors of the current node before moving deeper — like ripples spreading from a stone dropped in water. It finds the **shortest path** in unweighted graphs.

**Depth-First Search (DFS)** dives as deep as possible along one branch before backtracking — like exploring a maze by always turning left. It's useful for detecting cycles, topological sorting, and finding connected components.

```python
from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D', 'E'],
    'D': ['B', 'C'],
    'E': ['C'],
}

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    result = [start]
    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    return result

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E']
print(dfs(graph, 'A'))  # ['A', 'B', 'D', 'C', 'E']
```

## Sorting: Putting Things in Order

Sorting is one of the most studied problems in computer science. A sorted dataset enables binary search, simplifies duplicate detection, and makes many problems dramatically easier.

### Bubble Sort — $O(n^2)$

The simplest sorting algorithm. It repeatedly walks through the list, comparing adjacent elements and swapping them if they're in the wrong order. Each pass "bubbles" the largest unsorted element to its correct position.

It's intuitive but painfully slow for large datasets. Useful only for educational purposes or nearly-sorted data.

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

print(bubble_sort([64, 34, 25, 12]))  # [12, 25, 34, 64]
```

### Merge Sort — $O(n \log n)$

A **divide-and-conquer** algorithm. It splits the array in half, recursively sorts each half, then **merges** the two sorted halves. The merge step is the key insight — combining two sorted arrays into one sorted array takes only $O(n)$ time.

Merge sort guarantees $O(n \log n)$ in all cases, making it reliable when worst-case performance matters. The tradeoff is $O(n)$ extra space for the temporary arrays.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

print(merge_sort([38, 27, 43, 3, 9]))  # [3, 9, 27, 38, 43]
```

### Quick Sort — $O(n \log n)$ average

Quick sort picks a **pivot** element, partitions the array into elements smaller and larger than the pivot, then recursively sorts each partition. It's typically the fastest in practice due to excellent cache performance, and Python's built-in `sorted()` uses Timsort — a hybrid of merge sort and insertion sort.

The weakness: if the pivot is consistently the smallest or largest element, it degrades to $O(n^2)$. Randomized pivot selection avoids this in practice.

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + mid + quick_sort(right)

print(quick_sort([10, 7, 8, 9, 1]))  # [1, 7, 8, 9, 10]
```

### Comparison

| Algorithm  | Best           | Average        | Worst          | Space        | Stable |
|-----------|----------------|----------------|----------------|-------------|--------|
| Bubble    | $O(n)$         | $O(n^2)$       | $O(n^2)$       | $O(1)$      | Yes    |
| Merge     | $O(n \log n)$  | $O(n \log n)$  | $O(n \log n)$  | $O(n)$      | Yes    |
| Quick     | $O(n \log n)$  | $O(n \log n)$  | $O(n^2)$       | $O(\log n)$ | No     |

## Searching: Finding What You Need

### Linear Search — $O(n)$

Check every element one by one. Works on any data, sorted or not. Simple but slow for large datasets.

### Binary Search — $O(\log n)$

Requires a **sorted** array. Compare the target with the middle element — if smaller, search the left half; if larger, search the right half. Each step eliminates half the remaining data, giving logarithmic performance.

For a dataset of 1 billion elements, binary search finds the answer in at most 30 comparisons.

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

data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(data, 23))   # 5
print(binary_search(data, 100))  # -1
```

## Dynamic Programming: Remembering the Past

**Dynamic programming (DP)** is a technique for solving problems that can be broken into overlapping subproblems. Instead of recomputing the same subproblem repeatedly, you store (cache) its result and reuse it.

The classic example is the **Fibonacci sequence**. The naive recursive approach has $O(2^n)$ complexity because it recalculates the same values exponentially many times. With DP, it drops to $O(n)$.

```python
# Naive: O(2^n) — each call branches into two
def fib_naive(n):
    if n <= 1: return n
    return fib_naive(n-1) + fib_naive(n-2)

# DP (bottom-up): O(n) time, O(1) space
def fib(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fib(50))  # 12586269025 (instant)
```

The DP mindset applies to hundreds of problems: shortest paths, text alignment, knapsack optimization, string matching, and more. The key question is always: **can I express this problem in terms of smaller versions of itself?**

## Complexity Cheat Sheet

| Notation       | Name          | Example                              |
|---------------|---------------|--------------------------------------|
| $O(1)$        | Constant      | Hash table lookup, array access      |
| $O(\log n)$   | Logarithmic   | Binary search                        |
| $O(n)$        | Linear        | Linear search, single loop           |
| $O(n \log n)$ | Linearithmic  | Merge sort, efficient sorting        |
| $O(n^2)$      | Quadratic     | Bubble sort, nested loops            |
| $O(2^n)$      | Exponential   | Naive recursion, power set           |
| $O(n!)$       | Factorial     | Brute-force permutations             |

The jump between these categories is dramatic. For $n = 1{,}000{,}000$: a linear algorithm does 1 million operations, a quadratic one does 1 trillion, and an exponential one... would outlast the universe.

## Where to Go From Here

This guide covers the foundational building blocks. To deepen your understanding:

- **Practice problem-solving** on LeetCode, HackerRank, or Codeforces — reading about data structures isn't enough; you need to use them
- **Learn advanced structures** like tries (for prefix search), segment trees (for range queries), and disjoint sets (for connected components)
- **Study graph algorithms** like Dijkstra's shortest path, A* search, and topological sort
- **Master DP patterns** — longest common subsequence, edit distance, and matrix chain multiplication

The most important takeaway: **choosing the right data structure often matters more than writing clever code**. A hash table turns an $O(n)$ search into $O(1)$. A heap makes finding the minimum $O(1)$ instead of $O(n)$. Know your tools, and the solutions become obvious.
