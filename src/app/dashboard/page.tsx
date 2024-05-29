"use client";
import React, { useState } from "react";
import FlowQuestion from "./components/flow-question";
import AnswerDetails from "./components/answer-details";

interface Question {
  text: string;
  yes?: string;
  no?: string;
  yesAnswer?: string;
  noAnswer?: string;
  example?: Array<string> | undefined;
}

type Answer = {
  description: string;
  examples: (string | { code: string; language: string })[];
};

const flowQuestions: { [key: string]: Question } = {
  question1: {
    text: "Is it a graph?",
    yes: "question2",
    no: "question8",
    example: [
      "A graph is a collection of nodes and edges that connect pairs of nodes.",
      "Example usage: Representing a social network with users as nodes and connections as edges.",
    ],
  },
  question2: {
    text: "Is it a tree?",
    yes: "answer1",
    no: "question3",
    example: [
      "A tree is a type of graph where each node has exactly one parent, except for the root node which has none.",
      "Example usage: Representing hierarchical data like file systems or organizational structures.",
    ],
  },
  question3: {
    text: "Is the problem related to directed acyclic graphs?",
    yes: "answer2",
    no: "question4",
    example: [
      "Directed acyclic graphs (DAGs) are graphs where edges have a direction and there are no cycles.",
      "Example usage: Representing dependencies between tasks in a project management system.",
    ],
  },
  question4: {
    text: "Is the problem related to shortest paths?",
    yes: "question5",
    no: "question6",
    example: [
      "Shortest paths refer to finding the most efficient route between two points in a graph.",
      "Example usage: Finding the quickest route for a delivery truck to reach its destination.",
    ],
  },
  question5: {
    text: "Is the graph Weighted?",
    yes: "answer3",
    no: "answer4",
    example: [
      "Weighted graphs have a value associated with each edge, indicating the cost or distance between nodes.",
      "Example usage: Modeling distances between cities in a map.",
    ],
  },
  question6: {
    text: "Does the problem involve connectivity?",
    yes: "answer5",
    no: "question7",
    example: [
      "Connectivity problems relate to determining whether all nodes in a graph are reachable from one another.",
      "Example usage: Checking if there is a path between two users in a social network.",
    ],
  },
  question7: {
    text: "Does the problem have small constraints?",
    yes: "answer6",
    no: "answer4",
    example: [
      "Problems with small constraints typically involve inputs of limited size, making brute-force solutions feasible.",
      "Example usage: Searching for the shortest path in a small maze.",
    ],
  },
  question8: {
    text: "Need to solve for kth smallest/largest?",
    yes: "answer7",
    no: "question9",
    example: [
      "Problems involving finding the kth smallest or largest element in a collection.",
      "Example usage: Finding the median of a list of numbers.",
    ],
  },
  question9: {
    text: "Involves Linked List?",
    yes: "answer8",
    no: "question10",
    example: [
      "Linked lists are data structures where each element points to the next in a sequence.",
      "Example usage: Implementing a queue or stack.",
    ],
  },
  question10: {
    text: "Small constraint bounds?",
    yes: "question11",
    no: "question12",
    example: [
      "Similar to question 7, this refers to problems with small input sizes.",
      "Example usage: Sorting a small array of integers.",
    ],
  },
  question11: {
    text: "Is brute force fast enough?",
    yes: "answer9",
    no: "answer10",
    example: [
      "Brute force is a straightforward problem-solving technique that involves trying all possible solutions exhaustively to find the desired outcome. In computational terms, it entails iterating through all possible combinations or permutations of elements until the correct solution is identified. While conceptually simple and easy to implement, brute force methods may not always be the most efficient approach, particularly for problems with large input sizes, as they can be computationally expensive and time-consuming.",
      "Example usage: Determining if a given problem can be solved efficiently using brute force methods, such as checking if a Sudoku puzzle can be solved by trying all possible number combinations.",
    ],
  },
  question12: {
    text: "About subarrays or substrings?",
    yes: "question13",
    no: "question14",
    example: [
      "Problems involving finding or manipulating contiguous sections of an array or string.",
      "Example usage: Finding the longest palindromic(word reads backwards or forward) substring in a string.",
    ],
  },
  question13: {
    text: "Deals with sums or additives",
    yes: "answer11",
    no: "answer12",
    example: [
      "Problems that involve calculating the sum of elements in an array or a series of additive operations.",
      "Example usage: Finding the contiguous subarray with the largest sum.",
    ],
  },
  question14: {
    text: "Calculating max/min of something?",
    yes: "question2",
    no: "question18",
    example: [
      "Problems that require finding the maximum or minimum value among a set of elements.",
      "Example usage: Finding the maximum value in an array of integers.",
    ],
  },
  question15: {
    text: "Monotonic condition?",
    yes: "answer13",
    no: "question16",
    example: [
      "Problems where elements exhibit a specific trend or pattern, such as being non-decreasing or non-increasing.",
      "Example usage: Determining if an array is sorted in non-decreasing order.",
    ],
  },
  question16: {
    text: "Can be split into sub-components?",
    yes: "answer10",
    no: "question17",
    example: [
      "Problems that can be divided into smaller, more manageable sub-problems.",
      "Example usage: Implementing merge sort to sort an array.",
    ],
  },
  question17: {
    text: "Greedily calculate answer?",
    yes: "answer14",
    no: "question8",
    example: [
      "Problems where choosing the locally optimal solution at each step leads to a globally optimal solution.",
      "Example usage: Finding the minimum number of coins needed to make change.",
    ],
  },
  question18: {
    text: "Asking for number of ways?",
    yes: "question19",
    no: "question20",
    example: [
      "Problems that require counting the number of possible outcomes or arrangements.",
      "Example usage: Finding the number of ways to climb a staircase with certain step sizes.",
    ],
  },
  question19: {
    text: "Is brute force fast enough?",
    yes: "answer9",
    no: "answer10",
    example: [
      "Similar to question 11, this refers to determining if brute-force methods are feasible for solving the problem.",
      "Example usage: Testing if a given chess position can be won by trying all possible moves.",
    ],
  },
  question20: {
    text: "Multiple Sequences?",
    yes: "question21",
    no: "question23",
    example: [
      "Problems that involve multiple sequences or sets of data.",
      "Example usage: Finding the longest common subsequence between two strings.",
    ],
  },
  question21: {
    text: "Monotonic conditions?",
    yes: "answer8",
    no: "question1",
    example: [
      "Similar to question 15, this relates to problems with monotonic(varying in such a way that it either never decreases or never increases.) trends or patterns.",
      "Example usage: Checking if a given array is monotonic(varying in such a way that it either never decreases or never increases.).",
    ],
  },
  question22: {
    text: "Can split into sub-problems?",
    yes: "answer10",
    no: "question1",
    example: [
      "Problems that can be divided into smaller, independent sub-problems.",
      "Example usage: Implementing dynamic programming to solve the Fibonacci sequence.",
    ],
  },
  question23: {
    text: "Find or enumerate indices?",
    yes: "question24",
    no: "question25",
    example: [
      "Problems that require finding or listing the indices of certain elements or conditions.",
      "Example usage: Finding all occurrences of a substring in a larger string.",
    ],
  },
  question24: {
    text: "Monotonic condition?",
    yes: "answer8",
    no: "question1",
    example: [
      "Similar to questions 15, 20, and 24, this relates to problems with monotonic trends or patterns.",
      "Example usage: Determining if an array is non-increasing.",
    ],
  },
  question25: {
    text: "O(1) memory required",
    yes: "question26",
    no: "question1",
    example: [
      "Problems where the memory usage must be constant, regardless of the input size.",
      "Example usage: Implementing an algorithm to reverse a linked list in place.",
    ],
  },
  question26: {
    text: "Involves monotonic condition?",
    yes: "answer8",
    no: "question1",
    example: [
      "Similar to questions 15 and 20, this relates to problems with monotonic trends or patterns.",
      "Example usage: Checking if an array is strictly increasing.",
    ],
  },
};

const answers: { [key: string]: Answer } = {
  answer1: {
    description: "Depth First Search",
    examples: [
      "Suppose you have a maze, and you want to find a path from the entrance to the exit. DFS could be used to explore the maze by recursively visiting adjacent cells until the exit is found.",
      {
        code: `
        function dfs(graph, node, visited) {
            if (!visited.has(node)) {
                console.log(node);
                visited.add(node);
                for (let neighbor of graph[node]) {
                    dfs(graph, neighbor, visited);
                }
            }
        }
        
        // Example usage:
        const graph = {
            'A': ['B', 'C'],
            'B': ['D', 'E'],
            'C': ['F'],
            'D': [],
            'E': ['F'],
            'F': []
        };
        const visited = new Set();
        dfs(graph, 'A', visited);
            `,
        language: "javascript",
      },
    ],
  },
  answer2: {
    description: "Topological Sort",
    examples: [
      "Consider a course schedule where certain courses have prerequisites. Topological sort can be used to order the courses in such a way that all prerequisites are taken before the courses that require them.",
      {
        code: `function topologicalSort(graph) {
            const visited = new Set();
            const stack = [];
        
            function dfs(node) {
                visited.add(node);
                for (let neighbor of graph[node]) {
                    if (!visited.has(neighbor)) {
                        dfs(neighbor);
                    }
                }
                stack.push(node);
            }
        
            for (let node in graph) {
                if (!visited.has(node)) {
                    dfs(node);
                }
            }
        
            return stack.reverse();
        }
        
        // Example usage:
        const graph = {
            'A': ['C'],
            'B': ['C', 'D'],
            'C': ['E'],
            'D': ['E'],
            'E': []
        };
        console.log(topologicalSort(graph));
        `,
        language: "javascript",
      },
    ],
  },
  answer3: {
    description: "Dijkstra's Algorithm",
    examples: [
      "Imagine you have a weighted graph representing cities and the distances between them. Dijkstra's algorithm can be applied to find the shortest path from one city to another.",
      {
        code: `function dijkstra(graph, start) {
            const distances = {};
            const priorityQueue = new PriorityQueue();
        
            for (let node in graph) {
                distances[node] = Infinity;
            }
            distances[start] = 0;
            priorityQueue.enqueue(start, 0);
        
            while (!priorityQueue.isEmpty()) {
                const [currentNode, currentDistance] = priorityQueue.dequeue();
        
                if (currentDistance > distances[currentNode]) {
                    continue;
                }
        
                for (let neighbor in graph[currentNode]) {
                    const distance = currentDistance + graph[currentNode][neighbor];
                    if (distance < distances[neighbor]) {
                        distances[neighbor] = distance;
                        priorityQueue.enqueue(neighbor, distance);
                    }
                }
            }
        
            return distances;
        }
        
        // Example usage:
        const graph = {
            'A': {'B': 1, 'C': 4},
            'B': {'A': 1, 'C': 2, 'D': 5},
            'C': {'B': 2, 'D': 1},
            'D': {'C': 1, 'B': 5}
        };
        const startNode = 'A';
        console.log(dijkstra(graph, startNode));
        `,
        language: "javascript",
      },
    ],
  },
  answer4: {
    description: "Breadth First Search",
    examples: [
      "In a social network, BFS could be used to find the shortest path or degree of separation between two users, exploring friends of friends until the target user is reached.",
      {
        code: `function bfs(graph, start) {
            const visited = new Set();
            const queue = [start];
            visited.add(start);
        
            while (queue.length > 0) {
                const node = queue.shift();
                console.log(node);
        
                for (let neighbor of graph[node]) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }
        
        // Example usage:
        const graph = {
            'A': ['B', 'C'],
            'B': ['D', 'E'],
            'C': ['F'],
            'D': [],
            'E': ['F'],
            'F': []
        };
        bfs(graph, 'A');
        `,
        language: "javascript",
      },
    ],
  },
  answer5: {
    description: "Disjoint Set Union",
    examples: [
      "In a network connectivity problem, disjoint set union can be used to efficiently determine if two nodes in a network are connected or not.",
      {
        code: `class DisjointSet {
            constructor(size) {
                this.parent = Array.from({ length: size }, (_, i) => i);
                this.rank = Array(size).fill(0);
            }
        
            find(x) {
                if (this.parent[x] !== x) {
                    this.parent[x] = this.find(this.parent[x]);
                }
                return this.parent[x];
            }
        
            union(x, y) {
                const rootX = this.find(x);
                const rootY = this.find(y);
        
                if (rootX !== rootY) {
                    if (this.rank[rootX] < this.rank[rootY]) {
                        this.parent[rootX] = rootY;
                    } else if (this.rank[rootX] > this.rank[rootY]) {
                        this.parent[rootY] = rootX;
                    } else {
                        this.parent[rootY] = rootX;
                        this.rank[rootX]++;
                    }
                }
            }
        }
        
        // Example usage:
        const ds = new DisjointSet(5);
        ds.union(0, 1);
        ds.union(2, 3);
        console.log(ds.find(1));  // Output: 0
        console.log(ds.find(3));  // Output: 2
        `,
        language: "javascript",
      },
    ],
  },
  answer6: {
    description: "DFS / Backtracking",
    examples: [
      "Solving a Sudoku puzzle can be done using backtracking. You can try placing numbers in empty cells, and if you reach a point where no number fits, you backtrack and try a different number.",
      {
        code: `function sudokuSolver(board) {
            function findEmptyCell() {
                for (let row = 0; row < 9; row++) {
                    for (let col = 0; col < 9; col++) {
                        if (board[row][col] === 0) {
                            return [row, col];
                        }
                    }
                }
                return null;
            }
        
            function isValidMove(row, col, num) {
                for (let i = 0; i < 9; i++) {
                    if (board[row][i] === num || board[i][col] === num) {
                        return false;
                    }
                }
                const startRow = Math.floor(row / 3) * 3;
                const startCol = Math.floor(col / 3) * 3;
                for (let i = startRow; i < startRow + 3; i++) {
                    for (let j = startCol; j < startCol + 3; j++) {
                        if (board[i][j] === num) {
                            return false;
                        }
                    }
                }
                return true;
            }
        
            const emptyCell = findEmptyCell();
            if (!emptyCell) {
                return true;
            }
        
            const [row, col] = emptyCell;
            for (let num = 1; num <= 9; num++) {
                if (isValidMove(row, col, num)) {
                    board[row][col] = num;
                    if (sudokuSolver(board)) {
                        return true;
                    }
                    board[row][col] = 0;
                }
            }
            return false;
        }
        
        // Example usage:
        const board = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ];
        sudokuSolver(board);
        // After this, the 'board' will be filled with a valid solution.
        `,
        language: "javascript",
      },
    ],
  },
  answer7: {
    description: "Heap / Sortings",
    examples: [
      "Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region.",
      {
        code: `
        function heapify(arr, n, i) {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
        
            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }
            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }
            if (largest !== i) {
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                heapify(arr, n, largest);
            }
        }
        
        function heapSort(arr) {
            const n = arr.length;
        
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                heapify(arr, n, i);
            }
        
            for (let i = n - 1; i > 0; i--) {
                [arr[0], arr[i]] = [arr[i], arr[0]];
                heapify(arr, i, 0);
            }
            return arr;
        }
        
        // Example usage:
        const arr = [12, 11, 13, 5, 6, 7];
        console.log(heapSort(arr)); // Output: [5, 6, 7, 11, 12, 13]
        `,
        language: "javascript",
      },
    ],
  },
  answer8: {
    description: "Two Pointers",
    examples: [
      "In the problem of finding pairs in a sorted array with a given sum, you can use two pointers—one starting from the beginning and one from the end—to efficiently find the pairs without needing nested loops.",
      {
        code: `function twoSum(nums, target) {
            let left = 0;
            let right = nums.length - 1;
            while (left < right) {
                const currentSum = nums[left] + nums[right];
                if (currentSum === target) {
                    return [left, right];
                } else if (currentSum < target) {
                    left++;
                } else {
                    right--;
                }
            }
            return [];
        }
        
        // Example usage:
        const nums = [-2, 1, 2, 4, 7, 11];
        const target = 13;
        console.log(twoSum(nums, target));  // Output: [2, 5]
        `,
        language: "javascript",
      },
    ],
  },
  answer9: {
    description: "Brute force / Backtracking",
    examples: [
      "In the traveling salesman problem, you could use brute force with backtracking to try all possible permutations of visiting cities and finding the shortest route.",
      {
        code: `function tspBruteForce(graph, start) {
            let shortestPath = null;
            let shortestDistance = Infinity;
        
            function backtrack(currentPath, remainingCities, currentDistance) {
                if (remainingCities.size === 0) {
                    currentDistance += graph[currentPath[currentPath.length - 1]][start];
                    if (currentDistance < shortestDistance) {
                        shortestDistance = currentDistance;
                        shortestPath = currentPath.slice();
                    }
                    return;
                }
        
                for (let city of remainingCities) {
                    const newPath = currentPath.concat(city);
                    const newDistance = currentDistance + graph[currentPath[currentPath.length - 1]][city];
                    const newRemaining = new Set(remainingCities);
                    newRemaining.delete(city);
                    backtrack(newPath, newRemaining, newDistance);
                }
            }
        
            backtrack([start], new Set(Object.keys(graph).filter(node => node !== start)), 0);
            return shortestPath;
        }
        
        // Example usage:
        const graph = {
            'A': {'B': 2, 'C': 3, 'D': 9},
            'B': {'A': 2, 'C': 2, 'D': 4},
            'C': {'A': 3, 'B': 2, 'D': 5},
            'D': {'A': 9, 'B': 4, 'C': 5}
        };
        const startNode = 'A';
        const path = tspBruteForce(graph, startNode);
        console.log("Shortest Path:", path);
        `,
        language: "javascript",
      },
    ],
  },
  answer10: {
    description: "Dynamic Programming",
    examples: [
      "Calculating the nth Fibonacci number can be optimized using dynamic programming, where you store previously calculated values to avoid redundant calculations.",
      {
        code: `function fibonacci(n) {
            if (n <= 1) return n;
            let fib = [0, 1];
            for (let i = 2; i <= n; i++) {
                fib[i] = fib[i - 1] + fib[i - 2];
            }
            return fib[n];
        }
        
        // Example usage:
        console.log(fibonacci(10));  // Output: 55
        `,
        language: "javascript",
      },
    ],
  },
  answer11: {
    description: "Prefix sums",
    examples: [
      "Given an array of integers, prefix sums can be used to efficiently calculate the sum of elements within a range.",
      {
        code: `function prefixSum(nums) {
            const prefix = [0];
            for (let i = 0; i < nums.length; i++) {
                prefix.push(prefix[i] + nums[i]);
            }
            return prefix;
        }
        
        // Example usage:
        const nums = [1, 2, 3, 4, 5];
        console.log(prefixSum(nums));  // Output: [0, 1, 3, 6, 10, 15]
        `,
        language: "javascript",
      },
    ],
  },
  answer12: {
    description: "Sliding Window",
    examples: [
      "Finding the maximum sum of a subarray of fixed size k in an array can be done efficiently using a sliding window approach.",
      {
        code: `function maxSumSubarray(nums, k) {
            let maxSum = -Infinity;
            let currentSum = 0;
            for (let i = 0; i < nums.length; i++) {
                currentSum += nums[i];
                if (i >= k - 1) {
                    maxSum = Math.max(maxSum, currentSum);
                    currentSum -= nums[i - k + 1];
                }
            }
            return maxSum;
        }
        
        // Example usage:
        const nums = [4, 2, 1, 7, 8, 1, 2, 8, 1, 0];
        const k = 3;
        console.log(maxSumSubarray(nums, k));  // Output: 16
        `,
        language: "javascript",
      },
    ],
  },
  answer13: {
    description: "Binary Search",
    examples: [
      "Searching for a specific element in a sorted array can be done using binary search, which repeatedly divides the search interval in half until the element is found.",
      {
        code: `function binarySearch(nums, target) {
            let left = 0;
            let right = nums.length - 1;
            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (nums[mid] === target) {
                    return mid;
                } else if (nums[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return -1;
        }
        
        // Example usage:
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const target = 5;
        console.log(binarySearch(nums, target));  // Output: 4
        `,
        language: "javascript",
      },
    ],
  },
  answer14: {
    description: "Greedy Algorithms",
    examples: [
      "The activity selection problem can be solved using a greedy algorithm. Given a set of activities with start and finish times, the greedy approach selects the activity with the earliest finish time and removes conflicting activities.",
      {
        code: `
        function activitySelection(activities) {
            activities.sort((a, b) => a[1] - b[1]);
            const selected = [activities[0]];
            for (let i = 1; i < activities.length; i++) {
                if (activities[i][0] >= selected[selected.length - 1][1]) {
                    selected.push(activities[i]);
                }
            }
            return selected;
        }
        
        // Example usage:
        const activities = [[1, 3], [2, 5], [3, 8], [5, 7], [8, 10]];
        console.log(activitySelection(activities));
        // Output: [[1, 3], [5, 7], [8, 10]]
        `,
        language: "javascript",
      },
    ],
  },
};

export default function DashboardPage() {
  const [currentId, setCurrentId] = useState<string>("question1");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (nextId: string) => {
    setCurrentId(nextId);
  };

  const currentQuestion = flowQuestions[currentId];
  const currentAnswer = answers[currentId];

  return (
    <div className="flex justify-center items-center h-screen">
      {selectedAnswer && (
        <AnswerDetails
          description={answers[selectedAnswer].description}
          examples={answers[selectedAnswer].examples}
          onClose={() => setSelectedAnswer(null)}
        />
      )}
      {currentQuestion ? (
        <FlowQuestion
          question={currentQuestion.text}
          example={
            currentQuestion.example ? currentQuestion.example[0] : undefined
          }
          yesQuestion={currentQuestion.yes}
          noQuestion={currentQuestion.no}
          yesAnswer={currentQuestion.yesAnswer}
          noAnswer={currentQuestion.noAnswer}
          onAnswer={handleAnswer}
        />
      ) : (
        <div className="text-center">
          <div
            className="font-bold cursor-pointer bg-slate-600 p-2 rounded text-sm text-white"
            onClick={() => setSelectedAnswer(currentId)}
          >
            {currentAnswer.description}
          </div>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentId("question1")}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
