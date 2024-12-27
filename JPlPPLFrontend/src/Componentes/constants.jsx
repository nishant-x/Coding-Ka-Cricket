export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};

export const PROBLEM_STATEMENTS = [
  {
    id: 1,
    title: "Reverse a String",
    description:
      "Write a function `reverseString(s)` that takes a string `s` and returns the string reversed.",
    testCases: [
      { input: '"hello"', expectedOutput: '"olleh"' },
      { input: '"world"', expectedOutput: '"dlrow"' },
      { input: '"racecar"', expectedOutput: '"racecar"' },
      { input: '"OpenAI"', expectedOutput: '"IAnepO"' },
    ],
  },
  {
    id: 2,
    title: "Find the Factorial of a Number",
    description:
      "Write a function `factorial(n)` that takes a number `n` and returns the factorial of `n`. The factorial of a number `n` is the product of all positive integers less than or equal to `n`.",
    testCases: [
      { input: "5", expectedOutput: "120" },
      { input: "7", expectedOutput: "5040" },
      { input: "0", expectedOutput: "1" },
      { input: "1", expectedOutput: "1" },
    ],
  },
  {
    id: 3,
    title: "Check if a Number is Prime",
    description:
      "Write a function `isPrime(n)` that takes a number `n` and returns `true` if `n` is a prime number, otherwise returns `false`. A prime number is a number greater than 1 that has no divisors other than 1 and itself.",
    testCases: [
      { input: "5", expectedOutput: "true" },
      { input: "10", expectedOutput: "false" },
      { input: "13", expectedOutput: "true" },
      { input: "1", expectedOutput: "false" },
    ],
  },
  {
    id: 4,
    title: "Fibonacci Sequence",
    description:
      "Write a function `fibonacci(n)` that takes a number `n` and returns the `n`th Fibonacci number. The Fibonacci sequence starts with 0, 1, 1, 2, 3, 5, 8, 13, ..., where each number is the sum of the previous two.",
    testCases: [
      { input: "5", expectedOutput: "5" },
      { input: "7", expectedOutput: "13" },
      { input: "0", expectedOutput: "0" },
      { input: "1", expectedOutput: "1" },
    ],
  },
  {
    id: 5,
    title: "Palindrome Checker",
    description:
      "Write a function `isPalindrome(s)` that takes a string `s` and returns `true` if the string is a palindrome (reads the same forwards and backwards), otherwise returns `false`.",
    testCases: [
      { input: '"madam"', expectedOutput: "true" },
      { input: '"racecar"', expectedOutput: "true" },
      { input: '"hello"', expectedOutput: "false" },
      { input: '"OpenAI"', expectedOutput: "false" },
    ],
  },
  {
    id: 6,
    title: "Sum of Array Elements",
    description:
      "Write a function `sumArray(arr)` that takes an array `arr` of numbers and returns the sum of all the elements in the array.",
    testCases: [
      { input: "[1, 2, 3, 4]", expectedOutput: "10" },
      { input: "[5, 5, 5, 5]", expectedOutput: "20" },
      { input: "[0, 0, 0, 0]", expectedOutput: "0" },
      { input: "[1, 1, 1, 1]", expectedOutput: "4" },
    ],
  },
  {
    id: 7,
    title: "Count Vowels in a String",
    description:
      "Write a function `countVowels(s)` that takes a string `s` and returns the number of vowels (a, e, i, o, u) in the string.",
    testCases: [
      { input: '"hello"', expectedOutput: "2" },
      { input: '"world"', expectedOutput: "1" },
      { input: '"aeiou"', expectedOutput: "5" },
      { input: '"OpenAI"', expectedOutput: "3" },
    ],
  },
  {
    id: 8,
    title: "Find the Largest Number in an Array",
    description:
      "Write a function `findLargest(arr)` that takes an array `arr` and returns the largest number in the array.",
    testCases: [
      { input: "[1, 2, 3, 4]", expectedOutput: "4" },
      { input: "[5, 2, 7, 1]", expectedOutput: "7" },
      { input: "[0, 0, 0, 0]", expectedOutput: "0" },
      { input: "[-5, -2, -7, -1]", expectedOutput: "-1" },
    ],
  },
];


