// Curated set of standard Data Structures & Algorithms (DSA) problems
// Inspired by Striver's A2Z DSA sheet and other standard roadmaps.

export const defaultProblems = [
  // ARRAYS
  { id: 'arr-1', name: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-2', name: 'Best Time to Buy and Sell Stock', url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-3', name: 'Sort Colors (75 Sort)', url: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-4', name: 'Majority Element', url: 'https://leetcode.com/problems/majority-element/', difficulty: 'Easy', topic: 'Arrays' },
  { id: 'arr-5', name: 'Maximum Subarray (Kadane\'s Algorithm)', url: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-6', name: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-7', name: '3Sum', url: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-8', name: 'Next Permutation', url: 'https://leetcode.com/problems/next-permutation/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-9', name: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium', topic: 'Arrays' },
  { id: 'arr-10', name: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium', topic: 'Arrays' },

  // STRINGS
  { id: 'str-1', name: 'Reverse String', url: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy', topic: 'Strings' },
  { id: 'str-2', name: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy', topic: 'Strings' },
  { id: 'str-3', name: 'Longest Palindromic Substring', url: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Hard', topic: 'Strings' },
  { id: 'str-4', name: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium', topic: 'Strings' },
  { id: 'str-5', name: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium', topic: 'Strings' },
  { id: 'str-6', name: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy', topic: 'Strings' },
  { id: 'str-7', name: 'String to Integer (atoi)', url: 'https://leetcode.com/problems/string-to-integer-atoi/', difficulty: 'Medium', topic: 'Strings' },
  { id: 'str-8', name: 'Minimum Window Substring', url: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard', topic: 'Strings' },

  // STACKS & QUEUES
  { id: 'stq-1', name: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy', topic: 'Stacks & Queues' },
  { id: 'stq-2', name: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy', topic: 'Stacks & Queues' },
  { id: 'stq-3', name: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium', topic: 'Stacks & Queues' },
  { id: 'stq-4', name: 'Next Greater Element I', url: 'https://leetcode.com/problems/next-greater-element-i/', difficulty: 'Easy', topic: 'Stacks & Queues' },
  { id: 'stq-5', name: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium', topic: 'Stacks & Queues' },
  { id: 'stq-6', name: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard', topic: 'Stacks & Queues' },
  { id: 'stq-7', name: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard', topic: 'Stacks & Queues' },

  // BINARY SEARCH
  { id: 'bs-1', name: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/', difficulty: 'Easy', topic: 'Binary Search' },
  { id: 'bs-2', name: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-3', name: 'Find First and Last Position of Element in Sorted Array', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-4', name: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-5', name: 'Median of Two Sorted Arrays', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard', topic: 'Binary Search' },
  { id: 'bs-6', name: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/', difficulty: 'Medium', topic: 'Binary Search' },
  { id: 'bs-7', name: 'Search a 2D Matrix', url: 'https://leetcode.com/problems/search-a-2d-matrix/', difficulty: 'Medium', topic: 'Binary Search' },

  // LINKED LISTS
  { id: 'll-1', name: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy', topic: 'Linked Lists' },
  { id: 'll-2', name: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy', topic: 'Linked Lists' },
  { id: 'll-3', name: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/', difficulty: 'Easy', topic: 'Linked Lists' },
  { id: 'll-4', name: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'Medium', topic: 'Linked Lists' },
  { id: 'll-5', name: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers/', difficulty: 'Medium', topic: 'Linked Lists' },
  { id: 'll-6', name: 'Intersection of Two Linked Lists', url: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', difficulty: 'Easy', topic: 'Linked Lists' },
  { id: 'll-7', name: 'Copy List with Random Pointer', url: 'https://leetcode.com/problems/copy-list-with-random-pointer/', difficulty: 'Medium', topic: 'Linked Lists' },

  // GREEDY ALGORITHMS
  { id: 'gr-1', name: 'Assign Cookies', url: 'https://leetcode.com/problems/assign-cookies/', difficulty: 'Easy', topic: 'Greedy Algorithms' },
  { id: 'gr-2', name: 'Fractional Knapsack', url: 'https://practice.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1', difficulty: 'Medium', topic: 'Greedy Algorithms' },
  { id: 'gr-3', name: 'N meetings in one room', url: 'https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1', difficulty: 'Easy', topic: 'Greedy Algorithms' },
  { id: 'gr-4', name: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium', topic: 'Greedy Algorithms' },
  { id: 'gr-5', name: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium', topic: 'Greedy Algorithms' },
  { id: 'gr-6', name: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium', topic: 'Greedy Algorithms' },

  // BINARY TREES & BST
  { id: 'tree-1', name: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy', topic: 'Binary Trees & BST' },
  { id: 'tree-2', name: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy', topic: 'Binary Trees & BST' },
  { id: 'tree-3', name: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium', topic: 'Binary Trees & BST' },
  { id: 'tree-4', name: 'Lowest Common Ancestor of a Binary Tree', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'Medium', topic: 'Binary Trees & BST' },
  { id: 'tree-5', name: 'Serialize and Deserialize Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard', topic: 'Binary Trees & BST' },
  { id: 'tree-6', name: 'Same Tree', url: 'https://leetcode.com/problems/same-tree/', difficulty: 'Easy', topic: 'Binary Trees & BST' },
  { id: 'tree-7', name: 'Validate Binary Search Tree', url: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium', topic: 'Binary Trees & BST' },
  { id: 'tree-8', name: 'Kth Smallest Element in a BST', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium', topic: 'Binary Trees & BST' },

  // GRAPHS
  { id: 'graph-1', name: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium', topic: 'Graphs' },
  { id: 'graph-2', name: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium', topic: 'Graphs' },
  { id: 'graph-3', name: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium', topic: 'Graphs' },
  { id: 'graph-4', name: 'Rotting Oranges', url: 'https://leetcode.com/problems/rotting-oranges/', difficulty: 'Medium', topic: 'Graphs' },
  { id: 'graph-5', name: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard', topic: 'Graphs' },
  { id: 'graph-6', name: 'Flood Fill', url: 'https://leetcode.com/problems/flood-fill/', difficulty: 'Easy', topic: 'Graphs' },
  { id: 'graph-7', name: 'Pacific Atlantic Water Flow', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', difficulty: 'Medium', topic: 'Graphs' },

  // DYNAMIC PROGRAMMING
  { id: 'dp-1', name: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy', topic: 'Dynamic Programming' },
  { id: 'dp-2', name: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-3', name: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-4', name: '0-1 Knapsack (Partition Equal Subset Sum)', url: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-5', name: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-6', name: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Hard', topic: 'Dynamic Programming' },
  { id: 'dp-7', name: 'House Robber', url: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium', topic: 'Dynamic Programming' },
  { id: 'dp-8', name: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium', topic: 'Dynamic Programming' },

  // HEAPS / PRIORITY QUEUES
  { id: 'hp-1', name: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium', topic: 'Heaps / Priority Queues' },
  { id: 'hp-2', name: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium', topic: 'Heaps / Priority Queues' },
  { id: 'hp-3', name: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard', topic: 'Heaps / Priority Queues' },
  { id: 'hp-4', name: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard', topic: 'Heaps / Priority Queues' },

  // BIT MANIPULATION
  { id: 'bit-1', name: 'Number of 1 Bits', url: 'https://leetcode.com/problems/number-of-1-bits/', difficulty: 'Easy', topic: 'Bit Manipulation' },
  { id: 'bit-2', name: 'Counting Bits', url: 'https://leetcode.com/problems/counting-bits/', difficulty: 'Easy', topic: 'Bit Manipulation' },
  { id: 'bit-3', name: 'Single Number', url: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy', topic: 'Bit Manipulation' },
  { id: 'bit-4', name: 'Missing Number', url: 'https://leetcode.com/problems/missing-number/', difficulty: 'Easy', topic: 'Bit Manipulation' },
  { id: 'bit-5', name: 'Sum of Two Integers', url: 'https://leetcode.com/problems/sum-of-two-integers/', difficulty: 'Medium', topic: 'Bit Manipulation' }
];

export const topicsList = [
  'Arrays',
  'Strings',
  'Stacks & Queues',
  'Binary Search',
  'Linked Lists',
  'Greedy Algorithms',
  'Binary Trees & BST',
  'Graphs',
  'Dynamic Programming',
  'Heaps / Priority Queues',
  'Bit Manipulation'
];
