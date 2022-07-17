let obj = {
  name: "paul",
  last: "" ,
  nothing: null
}

console.log(obj.name)
console.log(obj.last)
console.log(obj.last === undefined)
console.log(obj.last === null)

console.log(obj.nothing === null)
console.log(obj.nothing === undefined)

console.log(obj.age === undefined)
console.log(obj.age === null)

console.log(obj.last === "")


/*
//buble sort
let arr = [10,9,5,3,4,8,7,6,1,2]

for (var i = 0; i < arr.length ; i++) {
  for (var j = 0; j < arr.length - 1 -i; j++) {
    if (arr[j+1] < arr[j]) [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
  } 
}
console.log(arr)


for (let i = 0; i < arr.length-1; i++) {
  let pos = i
  for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[pos])  pos = j
   }
   if (pos !== i) [arr[i], arr[pos]] = [arr[pos],arr[i]]
}
console.log(arr)



//selectionSort

const selectionSort = (arr, i) => {
  
  if (i === arr.length-1) return arr

  let minindex = i,min = arr[i]
      
  arr.forEach((n, index) => {
    if (index > i) {
      if (n < min) {
        minindex = index
        min = n
      }
    }
  })

  let swap = [arr[i],arr[minindex]] = [arr[minindex],arr[i]]
  return selectionSort(arr, i+1)
}

let array = [3,2,10,5,1,6,9,7,8,4]
console.log("selectionSort: ",selectionSort(array, 0))

*/
/*
//bubbleSort
const bubbleSort = (arr, i) => {

    if (i === 0) return arr
    
    arr.forEach((n,index) => {
      if (index < i) { 
        if (arr[index] > arr[index + 1]) {
          [arr[index],arr[index+1]] = [arr[index+1],arr[index]]
        } 
      }
    })

    return bubbleSort(arr, i - 1)
}

let array = [3,2,10,4,5,1,6,9,7,8]
console.log("bubbleSort: ",bubbleSort(array, array.length-1))
*/

/*
//merge sort
function mergeSort(arr) {

  if (arr.length === 1) return arr;
  
  const merge = (left,right) => {
    let arr = [];
    while (left.length && right.length) {
       left[0] < right[0] ? arr.push(left.shift()) : arr.push(right.shift())
      }
    return arr.concat(left.concat(right));
   }

  let middle = Math.floor(arr.length/2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  let mergeLeft = mergeSort(left);
  let mergeRight = mergeSort(right)

  return merge(mergeLeft, mergeRight);
}

const array = [9, 2, 8, 3, 6, 1, 4, 10, 7, 5];
console.log("mergeSort: ",mergeSort(array))
*/


/*
var outerValue = 'ninja';
 var later;
 function outerFunction() { 
  var innerValue = 'samurai';

 function innerFunction(paramValue) {
 console.log(outerValue)
 console.log(innerValue)

 console.log("wakizashi", paramValue)
  console.log("tooLate ronin", tooLate)

}
 later = innerFunction;
 }
 console.log("tooLate undefined", tooLate)
 var tooLate = 'ronin';
   console.log("tooLate ronin", tooLate)

 outerFunction();
 later('wakizashi');



function addMethod(object, name, fn) {
 var old = object[name];
 object[name] = function(){
 if (fn.length == arguments.length)
 return fn.apply(this, arguments)
 else if (typeof old == 'function')
 return old.apply(this, arguments);
 };
}
var ninjas = {
 values: ["Dean Edwards", "Sam Stephenson", "Alex Russell"]
 };
 addMethod(ninjas, "find", function(){
 return this.values;
 });
 addMethod(ninjas, "find", function(name){
 var ret = [];
 for (var i = 0; i < this.values.length; i++)
 if (this.values[i].indexOf(name) == 0)
 ret.push(this.values[i]);
 return ret;
 });
 addMethod(ninjas, "find", function(first, last){
 var ret = [];
 for (var i = 0; i < this.values.length; i++)
 if (this.values[i] == (first + " " + last))
 ret.push(this.values[i]);
 return ret;
 });

*/

/*
console.log('cafe\u0301'); // => 'café'
console.log('café');       // => 'café'
const str0 = '\x4A\x61vaScript';
console.log(str0);                    // => 'JavaScript
const str = 'I\u0020learn \u0055nicode';
console.log(str);
const str2 = 'My face \uD83D\uDE00';
console.log(str2); // => 'My face 😀

console.log("\u060E");
console.log("\u{060E}");

*/

/*
let arr = [
  {name: 'animal', parent: "0"},
  {name: 'mamamal', parent: "animal"},
  {name: 'dog', parent: "mamamal"},
  {name: 'cat', parent: "mamamal"},
  {name: 'boxer', parent: "dog"},
  {name: 'buudog', parent: "dog"},
  {name: 'persian', parent: "cat"},
  {name: 'pussy', parent: "cat"},

]


function makeTree1(arr, parent) {
  let node = {}
  arr.filter(obj => obj.parent === parent)
  .forEach(obj => {
    node[obj.name] = makeTree1(arr, obj.name)
  })
  return node
}
let tree1 = makeTree1(arr, '0')
console.log(JSON.stringify(tree1, null,2))


function makeTree2(arr, parent) {
  let node = []
  arr.filter(obj => obj.parent === parent)
  .forEach(obj => {
    let children = makeTree2(arr, obj.name)
    if (children.length) obj['children'] = children
    node.push(obj)
  })
  return node
}

let tree2 = makeTree2(arr, '0')
console.log(JSON.stringify(tree2, null,2))
*/

/*
function formatAmount(n) {
     return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 
console.log(formatAmount(123456789.99))


function trim(str) {
 return (str || "").replace(/^\s+|\s+$/g, "");
 }
 
console.log("trim:", trim(" abcd  "))

let arr = ['a','b','c']
let str = arr.join(/\n/)
console.log(str)
let arr0 = str.split('\n')
console.log(arr0)
*/

/*
function getFile(file) {
  
  return new Promise(function(resolve,reject) {
    fs.readFile(file, "utf8",function(err,data) {
      if (err) {
        reject(err)
      }else {
       resolve(data)
      }
    })
    
  })
}

async function afunc(file) {
  try {
    const json = await getFile(file)
  const data = await JSON.parse(json)
  console.log(data)
  } catch(err) {
  console.log(data)
  }  
}
  
afunc("testData.json")   
*/


/*getFile("testData.json").then(function(json) {
  return JSON.parse(json)
}).then(function(data) {
  console.log(data)
}).catch(function(e) {
    console.log(e)
})*/


/*
const http = require('http');
const fs = require('fs');
const async = require('async');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let p = '.' + req.url
  async.waterfall([
    function(callback) {
        fs.stat(p, callback)          
    },
    function(stat,callback) {
        if (!stat.isFile()) {
            return callback(new Error("not a file"))
          }
          callback(null)        
    },
    function(callback) {
        fs.readFile(p,'utf8',callback)
    }
],
// optional callback
  function(err, result) {
      if (err) {
        console.log(err)
        res.end("server error")
      }else {
        //let stream = fs.createReadStream(result)
        //stream.pipe(res)
        res.write(result)
        res.end()
      }

  });

  async.series([
    function(callback) {
        fs.stat(p, function(err,stat) {
          if (err) {
            return callback(err)
          }
          if (!stat.isFile()) {
            return callback(new Error("not a file"))
          }
          callback(null,"null");

        })
    },
    function(callback) {
        fs.readFile(p,'utf8',function(err,data) {
          if (err) {
            return callback(err)
          }
          callback(null, data);
        })
        
    }
],
// optional callback
  function(err, results) {
      if (err) {
        console.log(err)
        res.end("server error")
      }else {
        console.log(results)
        res.write(results[1])
        res.end()
      }

  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
/*

 

//test - get all accts by steps str.split(/\s+/)
console.log("Beginning...")
let fs = require("fs")
//step1
let step1 = fs.readFileSync("acct.txt",{encoding:'utf8'})
.trim()
.split(/\r\n/)
//.split("\n")
//.split("\r")
console.log("step1:",JSON.stringify(step1,null,2))

//step2
let step2 = step1.map(function(line) {return line.split(/\s+/)})
.map
console.log("step12:",JSON.stringify(step2,null,2))

/step3
let step3 =step2.reduce(function(reducearr,arr) {
 reducearr.push(arr[0]);
 return reducearr;
},[])
console.log("step3:",JSON.stringify(step3,null,2))

//step4
let step4 = step3.map(function(line) { 
  return line.split("\t")
})
console.log("step4:",JSON.stringify(step4,null,2))

//step5
let step5 = step4.map(function(arr) {
  return arr.join("\t")
})
console.log("step5:",JSON.stringify(step5,null,2))

//step6
let step6 = step5.map(function(line) {
  return line.split("\t")
})
console.log("step6:",JSON.stringify(step6,null,2))

//step7 
let step7 = step6.reduce(function(reduceobj,arr) { 
  if (arr[0].length === 4) {
    reduceobj[arr[0]] = reduceobj[arr[0]] || [];
    reduceobj[arr[0]].push(
      {
       cacctname: arr[1],
       eacctname: arr[2]
      }
   )
  }         
  return reduceobj;
},{})
console.log("step7:",JSON.stringify(step7,null,2))
*/


/*
//quickSort
const unsortedArr = [31, 27, 28, 42, 13, 8, 11, 30, 17, 41, 15, 43, 1, 36, 9, 16, 20, 35, 48, 37, 7, 26, 34, 21, 22, 6, 29, 32, 49, 10, 12, 19, 24, 38, 5, 14, 44, 40, 3, 50, 46, 25, 18, 33, 47, 4, 45, 39, 23, 2];
const pivot = (arr, start = 0, end = arr.length + 1) => {
  const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]];

  let pivot = arr[start],
      pointer = start;

  for (let i = start; i < arr.length; i++) {
    if (arr[i] < pivot  ) {
      pointer++;
      swap(arr, pointer, i);
    }
  };
  swap(arr, start, pointer);

  return pointer;
}

const quickSort = (arr, start = 0, end = arr.length) => {
  let pivotIndex = pivot(arr, start, end);

  if (start >= end) return arr;
  quickSort(arr, start, pivotIndex);
  quickSort(arr, pivotIndex + 1, end);

  return arr;
};

//console.log(quickSort(unsortedArr));


//insertionSort
const insertionSort = (arr, i) => {

    if (i === arr.length) return arr

    let unsortedArr = arr.slice(0,i+1)
    let len = unsortedArr.length - 1
    for (let j = len; j >= 0; j--) {
      if (arr[j] < arr[j-1]) {
        [arr[j-1],arr[j]] = [arr[j],arr[j-1]]
      }
    }
    
    return insertionSort(arr, i+1)
}

let array = [3,2,10,5,1,6,9,7,8,4] 
console.log("insertionSort: ",insertionSort(array, 0))

//selectionSort
const selectionSort = (arr, i) => {
  
  if (i === arr.length) return arr

  let minindex = i
  let min = arr[i]
  arr.forEach((n, index) => {
    if (index > i) {
      if (n < min) {
        minindex = index
        min = n
      }
    }
  })

  let swap = [arr[i],arr[minindex]] = [arr[minindex],arr[i]]
  return selectionSort(arr, i+1)
}

array = [3,2,10,5,1,6,9,7,8,4]
console.log("selectionSort: ",selectionSort(array, 0))

//bubbleSort
const bubbleSort = (arr, i) => {

    if (i === 0) return arr
    
    arr.forEach((n,index) => {
      if (index < i - 1) { 
        if (arr[index] > arr[index + 1]) {
          [arr[index],arr[index+1]] = [arr[index+1],arr[index]]
        } 
      }
    })

    return bubbleSort(arr, i - 1)
}

array = [3,2,10,4,5,1,6,9,7,8]
console.log("bubbleSort: ",bubbleSort(array, array.length))


//merge sort
function mergeSort(arr) {

  if (arr.length === 1) return arr;
  
  const merge = (left,right) => {
    let arr = [];
    while (left.length && right.length) {
       left[0] < right[0] ? arr.push(left.shift()) : arr.push(right.shift())
      }
    return arr.concat(left.concat(right));
   }

  let middle = Math.floor(arr.length/2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle);
  let mergeLeft = mergeSort(left);
  let mergeRight = mergeSort(right)

  return merge(mergeLeft, mergeRight);
}

array = [9, 2, 8, 3, 6, 1, 4, 10, 7, 5];
console.log("mergeSort: ",mergeSort(array))

const fibonacci = (num, memo) => {
  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num < 2) return num;

  return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
};

*/

