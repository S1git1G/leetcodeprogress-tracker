// Curated set of standard Data Structures & Algorithms (DSA) problems
// Inspired by Striver's A2Z DSA sheet and other standard roadmaps.

export const defaultProblems = [
  // BASICS & SORTING
  { id: 'bsc-1', name: 'If Else statements', url: 'https://practice.geeksforgeeks.org/problems/java-if-else-decision-making0924/1', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-2', name: 'GCD Or HCF', url: 'https://practice.geeksforgeeks.org/problems/lcm-and-gcd4516/1', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-3', name: 'Check Palindrome', url: 'https://leetcode.com/problems/palindrome-number/', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-4', name: 'Reverse a Number', url: 'https://leetcode.com/problems/reverse-integer/', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-5', name: 'Check for Prime', url: 'https://practice.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-6', name: 'Print 1 to N using recursion', url: 'https://practice.geeksforgeeks.org/problems/print-1-to-n-without-using-loops-1587115620/1', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-7', name: 'Selection Sort', url: 'https://bit.ly/3ppA6YJ', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-8', name: 'Bubble Sort', url: 'https://bit.ly/3w6yQx8', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-9', name: 'Insertion Sort', url: 'https://bit.ly/3JVcqot', difficulty: 'Easy', topic: 'Basics & Sorting' },
  { id: 'bsc-10', name: 'Merge Sort', url: 'https://bit.ly/3A30Anw', difficulty: 'Medium', topic: 'Basics & Sorting' },
  { id: 'bsc-11', name: 'Quick Sort', url: 'https://bit.ly/3dsEbIK', difficulty: 'Medium', topic: 'Basics & Sorting' },

  // ARRAYS
  { id: 'arr-1', name: 'Largest Element in an Array', url: 'https://bit.ly/3Pld280', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-2', name: 'Second Largest Element in an Array without sorting', url: 'https://bit.ly/3pFvBcN', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-3', name: 'Check if the array is sorted', url: 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-4', name: 'Remove duplicates from Sorted array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-5', name: 'Left Rotate an array by one place', url: 'https://leetcode.com/problems/rotate-array/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-6', name: 'Move Zeros to end', url: 'https://leetcode.com/problems/move-zeroes/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-7', name: 'Find the Union', url: 'https://bit.ly/3Ap7Onp', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-8', name: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-9', name: 'Sort Colors (75 Sort)', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-10', name: 'Majority Element', url: 'https://leetcode.com/problems/majority-element/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-11', name: 'Maximum Subarray (Kadane\'s Algorithm)', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-12', name: 'Stock Buy and Sell', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-13', name: 'Next Permutation', url: 'https://leetcode.com/problems/next-permutation/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-14', name: 'Set Matrix Zeros', url: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-15', name: 'Rotate Matrix by 90 degrees', url: 'https://leetcode.com/problems/rotate-image/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-16', name: 'Print the matrix in spiral manner', url: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-17', name: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-18', name: 'Pascal\'s Triangle', url: 'https://leetcode.com/problems/pascals-triangle/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-19', name: '3-Sum Problem', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-20', name: 'Merge Overlapping Subintervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-21', name: 'Maximum Product Subarray', url: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium', topic: 'Arrays' },

  // STRINGS
  { id: 'str-1', name: 'Remove outermost Parentheses', url: 'https://leetcode.com/problems/remove-outermost-parentheses/', difficulty: 'Easy', topic: 'Strings' },
  { id: 'str-2', name: 'Reverse words in a given string', url: 'https://leetcode.com/problems/reverse-words-in-a-string/', difficulty: 'Medium', topic: 'Strings' },
  { id: 'str-3', name: 'Largest odd number in a string', url: 'https://leetcode.com/problems/largest-odd-number-in-string/', difficulty: 'Easy', topic: 'Strings' },
  { id: 'str-4', name: 'Longest Common Prefix', url: 'https://leetcode.com/problems/longest-common-prefix/', difficulty: 'Easy', topic: 'Strings' },
  { id: 'str-5', name: 'Isomorphic Strings', url: 'https://leetcode.com/problems/isomorphic-strings/', difficulty: 'Easy', topic: 'Strings' },
  { id: 'str-6', name: 'Check if two strings are anagram of each other', url: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy', topic: 'Strings' },
  { id: 'str-7', name: 'String to Integer (atoi)', url: 'https://leetcode.com/problems/string-to-integer-atoi/', difficulty: 'Medium', topic: 'Strings' },
  { id: 'str-8', name: 'Longest Palindromic Substring', url: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Hard', topic: 'Strings' },

  // STACKS & QUEUES
  { id: 'stq-1', name: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', topic: 'Stacks & Queues' },
  { id: 'stq-2', name: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium', topic: 'Stacks & Queues' },
  { id: 'stq-3', name: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy', topic: 'Stacks & Queues' },
  { id: 'stq-4', name: 'Next Greater Element I', url: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'Easy', topic: 'Stacks & Queues' },
  { id: 'stq-5', name: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium', topic: 'Stacks & Queues' },
  { id: 'stq-6', name: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard', topic: 'Stacks & Queues' },
  { id: 'stq-7', name: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard', topic: 'Stacks & Queues' },

  // BINARY SEARCH
  { id: 'bs-1', name: 'Binary Search to find X in sorted array', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', topic: 'Binary Search' },
  { id: 'bs-2', name: 'Search in Rotated Sorted Array I', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-3', name: 'Find minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-4', name: 'Find the first or last occurrence of a given number', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-5', name: 'Single element in a Sorted Array', url: 'https://leetcode.com/problems/single-element-in-a-sorted-array/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-6', name: 'Find peak element', url: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-7', name: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-8', name: 'Minimum days to make M bouquets', url: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-9', name: 'Capacity to Ship Packages within D Days', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-10', name: 'Median of 2 sorted arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard', topic: 'Binary Search' },
  { id: 'bs-11', name: 'Search in a 2 D matrix', url: 'https://leetcode.com/problems/search-a-2d-matrix/', difficulty: 'Medium', topic: 'Binary Search' },

  // LINKED LISTS
  { id: 'll-1', name: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', topic: 'Linked Lists' },
  { id: 'll-2', name: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', topic: 'Linked Lists' },
  { id: 'll-3', name: 'Middle of the Linked List', url: 'https://leetcode.com/problems/middle-of-the-linked-list/', difficulty: 'Easy', topic: 'Linked Lists' },
  { id: 'll-4', name: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'Medium', topic: 'Linked Lists' },
  { id: 'll-5', name: 'Copy List with Random Pointer', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/', difficulty: 'Medium', topic: 'Linked Lists' },
  { id: 'll-6', name: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers/', difficulty: 'Medium', topic: 'Linked Lists' },
  { id: 'll-7', name: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', topic: 'Linked Lists' },

  // GREEDY ALGORITHMS
  { id: 'gr-1', name: 'Assign Cookies', url: 'https://leetcode.com/problems/assign-cookies/', difficulty: 'Easy', topic: 'Greedy Algorithms' },
  { id: 'gr-2', name: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', topic: 'Greedy Algorithms' },
  { id: 'gr-3', name: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Medium', topic: 'Greedy Algorithms' },
  { id: 'gr-4', name: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', topic: 'Greedy Algorithms' },
  { id: 'gr-5', name: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', topic: 'Greedy Algorithms' },

  // BINARY TREES & BST
  { id: 'tree-1', name: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', topic: 'Binary Trees & BST' },
  { id: 'tree-2', name: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy', topic: 'Binary Trees & BST' },
  { id: 'tree-3', name: 'Same Tree', url: 'https://leetcode.com/problems/same-tree/', difficulty: 'Easy', topic: 'Binary Trees & BST' },
  { id: 'tree-4', name: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium', topic: 'Binary Trees & BST' },
  { id: 'tree-5', name: 'Lowest Common Ancestor of a Binary Tree', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'Medium', topic: 'Binary Trees & BST' },
  { id: 'tree-6', name: 'Validate Binary Search Tree', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium', topic: 'Binary Trees & BST' },
  { id: 'tree-7', name: 'Kth Smallest Element in a BST', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium', topic: 'Binary Trees & BST' },
  { id: 'tree-8', name: 'Serialize and Deserialize Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard', topic: 'Binary Trees & BST' },

  // GRAPHS
  { id: 'graph-1', name: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium', topic: 'Graphs' },
  { id: 'graph-2', name: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium', topic: 'Graphs' },
  { id: 'graph-3', name: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium', topic: 'Graphs' },
  { id: 'graph-4', name: 'Rotting Oranges', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium', topic: 'Graphs' },
  { id: 'graph-5', name: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard', topic: 'Graphs' },
  { id: 'graph-6', name: 'Flood Fill', url: 'https://leetcode.com/problems/flood-fill/', difficulty: 'Easy', topic: 'Graphs' },

  // DYNAMIC PROGRAMMING
  { id: 'dp-1', name: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', topic: 'Dynamic Programming' },
  { id: 'dp-2', name: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-3', name: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-4', name: 'Partition Equal Subset Sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-5', name: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-6', name: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Hard', topic: 'Dynamic Programming' },
  { id: 'dp-7', name: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-8', name: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium', topic: 'Dynamic Programming' },

  // HEAPS & BIT MANIPULATION
  { id: 'hp-1', name: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', topic: 'Heaps & Bit Manipulation' },
  { id: 'hp-2', name: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', topic: 'Heaps & Bit Manipulation' },
  { id: 'bit-1', name: 'Single Number', url: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy', topic: 'Heaps & Bit Manipulation' },
  { id: 'bit-2', name: 'Counting Bits', url: 'https://leetcode.com/problems/counting-bits/', difficulty: 'Easy', topic: 'Heaps & Bit Manipulation' },
  { id: 'bit-3', name: 'Number of 1 Bits', url: 'https://leetcode.com/problems/number-of-1-bits/', difficulty: 'Easy', topic: 'Heaps & Bit Manipulation' }
];

export const topicsList = [
  'Basics & Sorting',
  'Arrays',
  'Strings',
  'Stacks & Queues',
  'Binary Search',
  'Linked Lists',
  'Greedy Algorithms',
  'Binary Trees & BST',
  'Graphs',
  'Dynamic Programming',
  'Heaps & Bit Manipulation'
];
