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
}

type Answer = {
  description: string;
  examples: (string | { code: string; language: string })[];
};

const flowQuestions: { [key: string]: Question } = {
  question1: { text: "Is it a graph?", yes: "question2", no: "question8" },
  question2: { text: "Is it a tree?", yes: "answer1", no: "question3" },
  question3: {
    text: "Is the problem related to directed acyclic graphs?",
    yes: "answer2",
    no: "question4",
  },
  question4: {
    text: "Is the problem related to shortest paths?",
    yes: "question5",
    no: "question6",
  },
  question5: {
    text: "Is the graph Weighted?",
    yes: "answer3",
    no: "answer4",
  },
  question6: {
    text: "Does the problem involve connectivity?",
    yes: "answer5",
    no: "question7",
  },
  question7: {
    text: "Does the problem have small constraints?",
    yes: "answer6",
    no: "answer4",
  },
  question8: {
    text: "Need to solve for kth smallest/largest?",
    yes: "answer7",
    no: "question9",
  },
  question9: {
    text: "Involves Linked List?",
    yes: "answer8",
    no: "question10",
  },
  question10: {
    text: "Small constraint bounds?",
    yes: "question11",
    no: "question12",
  },
  question11: {
    text: "Is brute force fast enough?",
    yes: "answer9",
    no: "answer10",
  },
  question12: {
    text: "About subarrays or substrings?",
    yes: "question13",
    no: "question14",
  },
  question13: {
    text: "Deals with sums or additives",
    yes: "answer11",
    no: "answer12",
  },
  question14: {
    text: "Calculating max/min of something?",
    yes: "question2",
    no: "question18",
  },
  question15: {
    text: "Monotonic condition?",
    yes: "answer13",
    no: "question16",
  },
  question16: {
    text: "Can be split into sub-components?",
    yes: "answer10",
    no: "question17",
  },
  question17: {
    text: "Greedily calculate answer?",
    yes: "answer14",
    no: "question8",
  },
  question18: {
    text: "Asking for number of ways?",
    yes: "question19",
    no: "question20",
  },
  question19: {
    text: "Is brute force fast enough?",
    yes: "answer9",
    no: "answer10",
  },
  question20: {
    text: "Multiple Sequences?",
    yes: "question21",
    no: "question23",
  },
  question21: {
    text: "Monotonic conditions?",
    yes: "answer8",
  },
  question22: {
    text: "Can split into sub-problems?",
    yes: "answer10",
  },
  question23: {
    text: "Find or enumerate indices?",
    yes: "question24",
    no: "question25",
  },
  question24: {
    text: "Monotonic condition?",
    yes: "answer8",
  },
  question25: {
    text: "O(1) memory required",
    yes: "question26",
  },
  question26: {
    text: "Involves monotonic condition?",
    yes: "answer8",
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
