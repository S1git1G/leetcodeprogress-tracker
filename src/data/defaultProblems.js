// Curated set of standard Data Structures & Algorithms (DSA) problems
// Inspired by Striver's A2Z DSA sheet and other standard roadmaps.

export const defaultProblems = [
  // ARRAYS
  {
    id: 'arr-1',
    name: 'Two Sum',
    url: 'https://leetcode.com/problems/two-sum/',
    difficulty: 'Easy',
    topic: 'Arrays'
  },
  {
    id: 'arr-2',
    name: 'Best Time to Buy and Sell Stock',
    url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    difficulty: 'Easy',
    topic: 'Arrays'
  },
  {
    id: 'arr-3',
    name: 'Sort Colors (75 Sort)',
    url: 'https://leetcode.com/problems/sort-colors/',
    difficulty: 'Medium',
    topic: 'Arrays'
  },
  {
    id: 'arr-4',
    name: 'Majority Element',
    url: 'https://leetcode.com/problems/majority-element/',
    difficulty: 'Easy',
    topic: 'Arrays'
  },
  {
    id: 'arr-5',
    name: 'Maximum Subarray (Kadane\'s Algorithm)',
    url: 'https://leetcode.com/problems/maximum-subarray/',
    difficulty: 'Medium',
    topic: 'Arrays'
  },
  {
    id: 'arr-6',
    name: 'Merge Intervals',
    url: 'https://leetcode.com/problems/merge-intervals/',
    difficulty: 'Medium',
    topic: 'Arrays'
  },
  {
    id: 'arr-7',
    name: '3Sum',
    url: 'https://leetcode.com/problems/3sum/',
    difficulty: 'Medium',
    topic: 'Arrays'
  },

  // STRINGS
  {
    id: 'str-1',
    name: 'Reverse String',
    url: 'https://leetcode.com/problems/reverse-string/',
    difficulty: 'Easy',
    topic: 'Strings'
  },
  {
    id: 'str-2',
    name: 'Valid Anagram',
    url: 'https://leetcode.com/problems/valid-anagram/',
    difficulty: 'Easy',
    topic: 'Strings'
  },
  {
    id: 'str-3',
    name: 'Longest Palindromic Substring',
    url: 'https://leetcode.com/problems/longest-palindromic-substring/',
    difficulty: 'Hard',
    topic: 'Strings'
  },
  {
    id: 'str-4',
    name: 'Group Anagrams',
    url: 'https://leetcode.com/problems/group-anagrams/',
    difficulty: 'Medium',
    topic: 'Strings'
  },
  {
    id: 'str-5',
    name: 'Longest Substring Without Repeating Characters',
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    difficulty: 'Medium',
    topic: 'Strings'
  },

  // STACKS & QUEUES
  {
    id: 'stq-1',
    name: 'Valid Parentheses',
    url: 'https://leetcode.com/problems/valid-parentheses/',
    difficulty: 'Easy',
    topic: 'Stacks & Queues'
  },
  {
    id: 'stq-2',
    name: 'Implement Queue using Stacks',
    url: 'https://leetcode.com/problems/implement-queue-using-stacks/',
    difficulty: 'Easy',
    topic: 'Stacks & Queues'
  },
  {
    id: 'stq-3',
    name: 'Min Stack',
    url: 'https://leetcode.com/problems/min-stack/',
    difficulty: 'Medium',
    topic: 'Stacks & Queues'
  },
  {
    id: 'stq-4',
    name: 'Next Greater Element I',
    url: 'https://leetcode.com/problems/next-greater-element-i/',
    difficulty: 'Easy',
    topic: 'Stacks & Queues'
  },
  {
    id: 'stq-5',
    name: 'Daily Temperatures',
    url: 'https://leetcode.com/problems/daily-temperatures/',
    difficulty: 'Medium',
    topic: 'Stacks & Queues'
  },
  {
    id: 'stq-6',
    name: 'Largest Rectangle in Histogram',
    url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    difficulty: 'Hard',
    topic: 'Stacks & Queues'
  },

  // BINARY SEARCH
  {
    id: 'bs-1',
    name: 'Binary Search',
    url: 'https://leetcode.com/problems/binary-search/',
    difficulty: 'Easy',
    topic: 'Binary Search'
  },
  {
    id: 'bs-2',
    name: 'Search in Rotated Sorted Array',
    url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    difficulty: 'Medium',
    topic: 'Binary Search'
  },
  {
    id: 'bs-3',
    name: 'Find First and Last Position of Element in Sorted Array',
    url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
    difficulty: 'Medium',
    topic: 'Binary Search'
  },
  {
    id: 'bs-4',
    name: 'Find Minimum in Rotated Sorted Array',
    url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    difficulty: 'Medium',
    topic: 'Binary Search'
  },
  {
    id: 'bs-5',
    name: 'Median of Two Sorted Arrays',
    url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    difficulty: 'Hard',
    topic: 'Binary Search'
  },

  // LINKED LISTS
  {
    id: 'll-1',
    name: 'Reverse Linked List',
    url: 'https://leetcode.com/problems/reverse-linked-list/',
    difficulty: 'Easy',
    topic: 'Linked Lists'
  },
  {
    id: 'll-2',
    name: 'Merge Two Sorted Lists',
    url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    difficulty: 'Easy',
    topic: 'Linked Lists'
  },
  {
    id: 'll-3',
    name: 'Linked List Cycle',
    url: 'https://leetcode.com/problems/linked-list-cycle/',
    difficulty: 'Easy',
    topic: 'Linked Lists'
  },
  {
    id: 'll-4',
    name: 'Remove Nth Node From End of List',
    url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    difficulty: 'Medium',
    topic: 'Linked Lists'
  },
  {
    id: 'll-5',
    name: 'Add Two Numbers',
    url: 'https://leetcode.com/problems/add-two-numbers/',
    difficulty: 'Medium',
    topic: 'Linked Lists'
  },

  // TREES
  {
    id: 'tree-1',
    name: 'Invert Binary Tree',
    url: 'https://leetcode.com/problems/invert-binary-tree/',
    difficulty: 'Easy',
    topic: 'Trees'
  },
  {
    id: 'tree-2',
    name: 'Maximum Depth of Binary Tree',
    url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    difficulty: 'Easy',
    topic: 'Trees'
  },
  {
    id: 'tree-3',
    name: 'Binary Tree Level Order Traversal',
    url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    difficulty: 'Medium',
    topic: 'Trees'
  },
  {
    id: 'tree-4',
    name: 'Lowest Common Ancestor of a Binary Tree',
    url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
    difficulty: 'Medium',
    topic: 'Trees'
  },
  {
    id: 'tree-5',
    name: 'Serialize and Deserialize Binary Tree',
    url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    difficulty: 'Hard',
    topic: 'Trees'
  },

  // GRAPHS
  {
    id: 'graph-1',
    name: 'Number of Islands',
    url: 'https://leetcode.com/problems/number-of-islands/',
    difficulty: 'Medium',
    topic: 'Graphs'
  },
  {
    id: 'graph-2',
    name: 'Clone Graph',
    url: 'https://leetcode.com/problems/clone-graph/',
    difficulty: 'Medium',
    topic: 'Graphs'
  },
  {
    id: 'graph-3',
    name: 'Course Schedule',
    url: 'https://leetcode.com/problems/course-schedule/',
    difficulty: 'Medium',
    topic: 'Graphs'
  },
  {
    id: 'graph-4',
    name: 'Rotting Oranges',
    url: 'https://leetcode.com/problems/rotting-oranges/',
    difficulty: 'Medium',
    topic: 'Graphs'
  },
  {
    id: 'graph-5',
    name: 'Word Ladder',
    url: 'https://leetcode.com/problems/word-ladder/',
    difficulty: 'Hard',
    topic: 'Graphs'
  },

  // DYNAMIC PROGRAMMING
  {
    id: 'dp-1',
    name: 'Climbing Stairs',
    url: 'https://leetcode.com/problems/climbing-stairs/',
    difficulty: 'Easy',
    topic: 'Dynamic Programming'
  },
  {
    id: 'dp-2',
    name: 'Coin Change',
    url: 'https://leetcode.com/problems/coin-change/',
    difficulty: 'Medium',
    topic: 'Dynamic Programming'
  },
  {
    id: 'dp-3',
    name: 'Longest Increasing Subsequence',
    url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    difficulty: 'Medium',
    topic: 'Dynamic Programming'
  },
  {
    id: 'dp-4',
    name: '0-1 Knapsack Problem (Partition Equal Subset Sum)',
    url: 'https://leetcode.com/problems/partition-equal-subset-sum/',
    difficulty: 'Medium',
    topic: 'Dynamic Programming'
  },
  {
    id: 'dp-5',
    name: 'Longest Common Subsequence',
    url: 'https://leetcode.com/problems/longest-common-subsequence/',
    difficulty: 'Medium',
    topic: 'Dynamic Programming'
  },
  {
    id: 'dp-6',
    name: 'Edit Distance',
    url: 'https://leetcode.com/problems/edit-distance/',
    difficulty: 'Hard',
    topic: 'Dynamic Programming'
  }
];

export const topicsList = [
  'Arrays',
  'Strings',
  'Stacks & Queues',
  'Binary Search',
  'Linked Lists',
  'Trees',
  'Graphs',
  'Dynamic Programming'
];
