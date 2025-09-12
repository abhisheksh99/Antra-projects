// 1. Reverse a number
// Question: Write a JavaScript function that reverses a number. Example: x = 32243 → Output: 34223
function reverseNumber(num) {
  return Number(num.toString().split('').reverse().join(''));
}
console.log("1:", reverseNumber(32243));

// 2. Palindrome check
// Question: Write a JavaScript function that checks whether a string is a palindrome.
function isPalindrome(str) {
  str = str.replace(/\s+/g, '').toLowerCase();
  return str === str.split('').reverse().join('');
}
console.log("2:", isPalindrome("madam"));
console.log("2:", isPalindrome("nurses run"));

// 3. All combinations of a string
// Question: Write a JavaScript function that generates all possible combinations of a string. Example: "dog".
function allCombinations(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j <= str.length; j++) {
      result.push(str.slice(i, j));
    }
  }
  return result;
}
console.log("3:", allCombinations("dog"));

// 4. Alphabetical order
// Question: Write a JavaScript function that returns a string with its letters in alphabetical order.
function sortString(str) {
  return str.split('').sort().join('');
}
console.log("4:", sortString("webmaster"));

// 5. Capitalize first letter
// Question: Write a JavaScript function that converts the first letter of each word to uppercase.
function capitalizeWords(str) {
  return str.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
console.log("5:", capitalizeWords("the quick brown fox"));

// 6. Longest word in string
// Question: Write a JavaScript function that finds the longest word in a string.
function longestWord(str) {
  let words = str.split(' ');
  return words.reduce((a, b) => a.length > b.length ? a : b);
}
console.log("6:", longestWord("Web Development Tutorial"));

// 7. Count vowels
// Question: Write a JavaScript function that counts the number of vowels in a string.
function countVowels(str) {
  return (str.match(/[aeiou]/gi) || []).length;
}
console.log("7:", countVowels("The quick brown fox"));

// 8. Prime number check
// Question: Write a JavaScript function that checks if a number is prime.
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
console.log("8:", isPrime(7), isPrime(10));

// 9. Return type of argument
// Question: Write a JavaScript function that returns the type of its argument.
function typeOf(value) {
  return typeof value;
}
console.log("9:", typeOf(123), typeOf("Hello"), typeOf({}));

// 10. Identity matrix
// Question: Write a JavaScript function that returns an identity matrix of size n x n.
function identityMatrix(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push(i === j ? 1 : 0);
    }
    matrix.push(row);
  }
  return matrix;
}
console.log("10:", identityMatrix(3));

// 11. Second lowest & second greatest
// Question: Write a JavaScript function to find the second lowest and second greatest numbers in an array.
function secondLowHigh(arr) {
  arr = [...new Set(arr)].sort((a, b) => a - b);
  return [arr[1], arr[arr.length - 2]];
}
console.log("11:", secondLowHigh([1, 2, 3, 4, 5]));

// 12. Perfect number
// Question: Write a JavaScript function that checks if a number is a perfect number.
function isPerfect(n) {
  let sum = 0;
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0) sum += i;
  }
  return sum === n;
}
console.log("12:", isPerfect(6), isPerfect(28));

// 13. Factors of a number
// Question: Write a JavaScript function to compute the factors of a positive integer.
function factors(n) {
  let f = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) f.push(i);
  }
  return f;
}
console.log("13:", factors(12));

// 14. Amount to coins
// Question: Write a JavaScript function to convert an amount into coins.
function amountToCoins(amount, coins) {
  let result = [];
  for (let c of coins) {
    while (amount >= c) {
      result.push(c);
      amount -= c;
    }
  }
  return result;
}
console.log("14:", amountToCoins(46, [25, 10, 5, 2, 1]));

// 15. Compute b^n
// Question: Write a JavaScript function to compute b^n (power).
function power(b, n) {
  return Math.pow(b, n);
}
console.log("15:", power(2, 5));

// 16. Unique characters in string
// Question: Write a JavaScript function to extract unique characters from a string.
function uniqueChars(str) {
  return [...new Set(str)].join('');
}
console.log("16:", uniqueChars("thequickbrownfoxjumpsoverthelazydog"));

// 17. Occurrences of each letter
// Question: Write a JavaScript function to count the occurrences of each letter in a string.
function charOccurrences(str) {
  let obj = {};
  for (let char of str) {
    obj[char] = (obj[char] || 0) + 1;
  }
  return obj;
}
console.log("17:", charOccurrences("hello world"));

// 18. Binary search
// Question: Write a JavaScript function to search an array using binary search.
function binarySearch(arr, val) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === val) return mid;
    else if (arr[mid] < val) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
console.log("18:", binarySearch([1, 2, 3, 4, 5], 4));

// 19. Array elements larger than a number
// Question: Write a JavaScript function that returns array elements larger than a number.
function largerThan(arr, num) {
  return arr.filter(x => x > num);
}
console.log("19:", largerThan([1, 3, 5, 7, 9], 4));

// 20. Random string ID
// Question: Write a JavaScript function to generate a random string ID of specified length.
function randomId(len) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
console.log("20:", randomId(8));

// 21. Subset combinations
// Question: Write a JavaScript function to get all subsets of a fixed length from an array.
function subsets(arr, n) {
  let result = [];
  function helper(start, comb) {
    if (comb.length === n) {
      result.push([...comb]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      comb.push(arr[i]);
      helper(i + 1, comb);
      comb.pop();
    }
  }
  helper(0, []);
  return result;
}
console.log("21:", subsets([1, 2, 3], 2));

// 22. Count occurrences of a letter
// Question: Write a JavaScript function that counts the occurrences of a letter in a string.
function countLetter(str, letter) {
  return str.split(letter).length - 1;
}
console.log("22:", countLetter("microsoft.com", "o"));

// 23. First non-repeated character
// Question: Write a JavaScript function to find the first non-repeated character in a string.
function firstUniqueChar(str) {
  for (let char of str) {
    if (str.indexOf(char) === str.lastIndexOf(char)) return char;
  }
  return null;
}
console.log("23:", firstUniqueChar("abacddbec"));

// 24. Bubble sort
// Question: Write a JavaScript function that sorts an array using Bubble Sort (descending order).
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
console.log("24:", bubbleSort([12, 345, 4, 546, 122, 84, 98, 64, 9, 1, 3223, 455, 23, 234, 213]));

// 25. Longest country name
// Question: Write a JavaScript function that returns the longest country name in an array.
function longestCountryName(arr) {
  return arr.reduce((a, b) => a.length > b.length ? a : b);
}
console.log("25:", longestCountryName(["Australia", "Germany", "United States of America"]));

// 26. Longest substring without repeating characters
// Question: Write a JavaScript function to find the longest substring in a string without repeating characters.
function longestUniqueSubstring(str) {
  let seen = {}, start = 0, maxLen = 0, maxStr = "";
  for (let i = 0; i < str.length; i++) {
    if (seen[str[i]] >= start) start = seen[str[i]] + 1;
    seen[str[i]] = i;
    if (i - start + 1 > maxLen) {
      maxLen = i - start + 1;
      maxStr = str.slice(start, i + 1);
    }
  }
  return maxStr;
}
console.log("26:", longestUniqueSubstring("abcabcbb"));

// 27. Longest palindromic substring
// Question: Write a JavaScript function to find the longest palindromic substring in a given string.
function longestPalindrome(s) {
  let start = 0, maxLen = 1;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        start = l;
        maxLen = r - l + 1;
      }
      l--; r++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}
console.log("27:", longestPalindrome("bananas"));

// 28. Function as parameter
// Question: Write a JavaScript program to pass a function as a parameter.
function execute(fn, value) {
  return fn(value);
}
console.log("28:", execute(x => x * 2, 5));

// 29. Get function name
// Question: Write a JavaScript function that returns the name of a function.
function sampleFunc() {}
function getFuncName(fn) {
  return fn.name;
}
console.log("29:", getFuncName(sampleFunc));
