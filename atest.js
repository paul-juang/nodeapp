const k_comb = (arr, k) => { 

      if (k > arr.length || k <= 0) {
        return [];
      }

      if (k == arr.length) {
        return [arr];
      }

      if (k == 1) {
        let temp = [];
        arr.forEach(n => temp.push([n]))
        return temp;
      }

      let combs = [];

      arr.forEach((x, i, a) => {
        let head = a.slice(i, i+1);
        let tail = a.slice(i+1);
        let tailcomb = k_comb(tail, k-1);
        tailcomb.forEach(arr => combs.push([...head,...arr]))
      })  
      return combs;
}

let arr = ["1","2","3","4","5"]
let res = k_comb(arr, 3)
console.log(res)

//-- Demo of async examples --//
/* ======================
const fs = require('fs')
const async = require("async");

function readFileasync(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file,"utf8", (err,res) => {
          if (err)  reject(err)
           else  resolve(res)
          });
    });
}


readFileasync('acctclassx.json').then(res => {
  let jsonfile = JSON.parse(res)
  console.log(JSON.stringify(jsonfile,null,2))
})

async function readJson(file) {
   let res = await readFileasync(file)
   let jsonfile = JSON.parse(res)
   console.log(JSON.stringify(jsonfile,null,2))
 }
 
readJson('acctchart.json')

const jsonarr = ['acctchart.json', 'acctclassx.json']

async.reduce(jsonarr, [], function(reducearr, json, callback) {
  
  fs.readFile(json, 'utf8', function(err, data) {
    if (err) return callback(err)

    let res = JSON.parse(data)
    reducearr.push(res)
    callback(null, reducearr)
  })
}, 
function(err, result) {
  if (err) return console.log(err)
    result.forEach(jsonfile => console.log(JSON.stringify(jsonfile,null,2)))
    console.log("reduce operartion success!!!")
    console.log(`${result.length} json file reduced`)

});

async.map(jsonarr, function(json, callback) {
    fs.readFile(json, (err, data) => {
      if (err) return callback(err)
      let jsonfile = JSON.parse(data)
      callback(null, jsonfile)
    })     
  },
  function(err,result) {
    if (err) return console.log(err);
    result.forEach(jsonfile => console.log(JSON.stringify(jsonfile,null,2)) )
  });


async.waterfall(
  [
    function(callback) {
      fs.readFile("acctclassx.json", "utf8", function(err,data) {
        if (err) return callback(err)
        let json = JSON.parse(data)
        callback(null, json)
      })
    },
    function(arg1,callback) {
      fs.readFile("acctchart.json", "utf8", function(err,data) {
        if (err) return callback(err)
        let arg2 = JSON.parse(data)
        let jsonarr = []
        jsonarr.push(arg1,arg2)
        callback(null, jsonarr)
      })
    }
  ],
  function(err,result) {
    if (err) return console.log(err)
    result.forEach(json => console.log(JSON.stringify(json,null,2)))
    console.log('all operation success!!!')
  }   
)

*/


/*
let urlarr = 
[
  "https://apod.nasa.gov/apod/image/1505/MWTree_Toledano_1080.png",
  "https://apod.nasa.gov/apod/image/1902/VenusEarth_MagellanApollo17_3000.png",
  "https://apod.nasa.gov/apod/image/1912/solar-can-Matrix_Solstice.gif",
  "https://apod.nasa.gov/apod/image/1812/BaikalBubbles.gif",
]
console.log('arr len', urlarr.length)

let regx = /(\/(\w+)-?(\w+)-?(\w+)-?(\w+)\.(jpg|png|gif)$)/

urlarr.forEach(url => {
  let fname = url.match(regx)
  if (fname) console.log(fname[0])
    else console.log(url)
})
*/

/*
//Lookahead assertion
console.log('text'.match(/t(?=e)/));
console.log('text'.replace(/t(?=e)/,"e"));

//Lookbehind assertion
console.log('text'.match(/(?<=x)t/));

console.log('text'.replace(/(?<=x)t/,"x"));

const regexpWords = /\b\w+\b/g;

const text = "If the multilineis flag is set to true"

console.log(text.match(regexpWords));

function formatAmount(n) {
     return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } 
console.log(formatAmount(123456789.99))

console.log("border-bottom-width".replace(/-(\w)/g, function() {
  console.log('arguments[0]', arguments[0])
  console.log('arguments[1]', arguments[1])
  console.log('arguments[2]', arguments[2])
  console.log('arguments[3]', arguments[3])
  return arguments[1].toUpperCase()
}))

console.log("match:", "border-bottom-width".match(/-(\w)/))

console.log("exec:",/-(\w)/.exec("border-bottom-width"))

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
const fs = require('fs');
const async = require('async');

const jsonarr = ["testData.json", "treeData.json"]
async.map(jsonarr, (json, callback) => {
 fs.readFile(json,"utf8", callback)
},
(err, result) => {
  if (err)  return
  let map = result.map(json => JSON.parse(json))
  console.log(map)
})
*/

/*async.series([
  function(callback) {
    fs.readFile("testData.json","utf8", callback)
  },
  function(callback) {
    fs.readFile("treeData.json","utf8", callback)
  }],
  function(err,result) {
    if (err) {
      return err
    }
    let map = result.map(function(json) {
      return JSON.parse(json)
    })
    console.log(map)
  })

*/



/*
function num(n) {
  if (n > 0) {
    if (n > 10) {
      return "n > 10"
    } else {
       return "0 < n < 10"
    }
  }else{
    if (n > -10) {
      return " -10 < n < 0"
    } else {
       return "n < - 10"
    }
  }
}

function num2(n) {
  let result = n > 0 ? (n > 10 ? "n > 10" : "0 < n < 10") :
   (n > -10 ? " -10 < n < 0" : "n < - 10")
  return result
}

console.log(num(11))
console.log(num(9))
console.log(num(-9))
console.log(num(-11))
console.log("===============")
console.log(num2(11))
console.log(num2(9))
console.log(num2(-9))
console.log(num(-11))


function f1(n) {
  if (n > 100) {
    return "n > 100"
  } else if (n > 90) {
    return "n > 90"
  } else if (n > 80) {
    return "n > 80"
  } else if (n > 70) {
    return "n > 70"
  }else {
      return "n <= 70"
  }
}

function f2(n) {
  let result = n > 100 ? "n > 100" : n > 90 ? "n > 90" :
  n > 80 ? "n > 80" : n > 70 ? "n > 70" : "n <= 70"
  return result
}

console.log("===============")
console.log("===============")
console.log(f1(101))
console.log(f1(91))
console.log(f1(81))
console.log(f1(71))
console.log(f1(70))
console.log("===============")
console.log(f2(101))
console.log(f2(91))
console.log(f2(81))
console.log(f2(71))
console.log(f2(70))
console.log("===============")


arr = [ 51,5,61,6,5,6,100]
arr.sort(function(a,b) {
  return (a > b) ? 1 : (a < b) ? -1 : 0
})
console.log("arr sorted",arr)

*/
      
/*
function collatz(n) {
  if (n === 1) {return "1"}
    else if ((n % 2) === 0) {return n + " -> " + collatz(n/2)}
      else { return n + " -> " + collatz(3*n + 1)}
}
let str = collatz(10)
console.log(`steps for getting to 1: ${str}`)
*/

/*
//insertionSort
const insertionSort = (arr, i) => {

    if (i === arr.length) return arr

    let sortedArr = arr.slice(0,i+1),lastidx = sortedArr.length - 1
        
    for (let j = lastidx; j >= 0; j--) {
      if (arr[j] < arr[j-1]) [arr[j-1],arr[j]] = [arr[j],arr[j-1]]        
      else break
    }
    
    return insertionSort(arr, i+1)
}

let array = [11,3,2,10,5,1,6,9,7,8,4,0] 
console.log("insertionSort: ",insertionSort(array, 0))
*/
 
/*
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
//binarySearch
const binarySearch = (arr,val) => {

  let idx = Math.floor(arr.length / 2)

  if (idx === 0 && val !== arr[idx]) return `${val} not found`
    
  if (val === arr[idx]) return `${val} found`

  return (val < arr[idx]) ? binarySearch(arr.slice(0,idx), val)
   : binarySearch(arr.slice(idx), val)
}
const list = [2, 5, 8, 6, 4, 7, 3, 9, 10, 1]
const listsorted = list.sort((a,b) => a-b) 
console.log("result: ", binarySearch(listsorted, 99))
*/

/*
//binary search tree

class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BST {
  constructor(value) {
    this.root = new Node(value)
    this.count = 1
  }

  create(value) {
    this.count++

    let newNode = new Node(value)

    const searchTree = node => {
      if (value < node.value) 
        return (!node.left) ? node.left = newNode : searchTree(node.left)      
      if (value > node.value)
        return (!node.right) ? node.right = newNode : searchTree(node.right)
    }

    searchTree(this.root)
  }

  
find(value) {

    const traversal = (currentNode) => {
      console.log("currentNode: ", JSON.stringify(currentNode,null,2));

      if (!currentNode) 
        return `Did not find ${value}`;
      if (value === currentNode.value)
        return `Find ${value}`;
      if (value < currentNode.value) 
        return traversal(currentNode.left);    
      if (value > currentNode.value)
        return traversal(currentNode.right);           
    }
    
    return traversal(this.root)  
  }
 
}

let tree = new BST(10); 
tree.create(12);
tree.create(14);
tree.create(16);
tree.create(9);
tree.create(11);
tree.create(13);
tree.create(15);
console.log("tree: ", JSON.stringify(tree,null,2));
console.log("find result: ", tree.find(15));

*/


/*
//recursive traversal
function sumSalaries(department) {

  let sum = 0;

  if (Array.isArray(department)) { 
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } 

  Object.values(department)
  .forEach(mem => sum += sumSalaries(mem))

  return sum;
 }

let company = { 
    sales: [
            {name: 'John', salary: 1000}, 
            {name: 'Alice', salary: 1600 }
           ],
    devel: {
       sites: [
               {name: 'Peter', salary: 2000}, 
               {name: 'Alex', salary: 1800 }
              ],
       inter: [
               {name: 'Jack', salary: 1300}
              ]
  }
};

console.log("sumSalaries", sumSalaries(company));
console.log("Object.values", JSON.stringify(Object.values(company),null,2));

//makeTree for d3.js
const makeTree = (arr,parent) => {
  
       let node = [];
       
       arr.filter(obj => obj.parent === parent)
       .forEach(obj => {       
             let children = makeTree(arr,obj.name);           
             if (children.length) obj["children"] = children;
             node.push(obj);   
          })
 
      return node;
   } 

let objarr = [
  {name: "1",parent: "0"},
  {name: "2",parent: "1"},
  {name: "3",parent: "1"},
  {name: "4",parent: "2"},
  {name: "5",parent: "2"},
  {name: "6",parent: "3"},
  {name: "7",parent: "3"},
];

let result = makeTree(objarr,"0");
console.log("result:",JSON.stringify(result,null,2))

//for object tree structure
const makeTree = (arr,parent) => {
       let node = {};
       arr.filter(obj => obj.parent === parent)
          .forEach(obj => node[obj.name] = makeTree(arr,obj.name))
       
       return node;
   } 

let categories = [
  {name: "animal",parent: null},
  {name: "mammal",parent: "animal"},
  {name: "cats",parent: "mammal"},
  {name: "dogs",parent: "mammal"},
  {name: "chiwawa",parent: "dogs"},
  {name: "laborer",parent: "dogs"},
  {name: "persian",parent: "cats"},
  {name: "siamese",parent: "cats"}
];

let result = makeTree(categories,null);
console.log("result:",JSON.stringify(result,null,2))



// *********** Convert flat data into a tree object***************
// *********** Alternative solution to makeTree - ambiguous and hard to follow
let data = [
  {name: "1",parent: "0"},
  {name: "2",parent: "1"},
  {name: "3",parent: "1"},
  {name: "4",parent: "2"},
  {name: "5",parent: "2"},
  {name: "6",parent: "3"},
  {name: "7",parent: "3"},
];
const makeTreex = (data) => {

  let treeData = [];
  let dataMap = data.reduce((map, node) => {
    map[node.name] = node;
    return map;
  }, {});

  data.forEach((node,index) => {  

    let parent = dataMap[node.parent];

    parent ? (parent.children || (parent.children = [])).push(node)
           : treeData.push(node);
    //if (parent) (parent.children || (parent.children = [])).push(node);
    //else treeData.push(node);
    
  })

  return treeData;
}
let result = makeTreex(data);
console.log("result",JSON.stringify(result,null,2))

//k_combination
const k_comb = (arr, k) => { 

     if (k > arr.length || k <= 0) {
        return [];
      }

      if (k == arr.length) {
        return [arr];
      }

      if (k == 1) {
        let temp = [];
        arr.forEach(n => temp.push([n]))
        return temp;
      }

      let combs = [];

      arr.forEach((n, i) => {
        let head = arr.slice(i, i+1);
        let tail = arr.slice(i+1);
        let tailcomb = k_comb(tail, k-1);
        tailcomb.forEach(n => combs.push([...head,...n]))
      })  
      return combs;

}

let arr = ["01","02","03","04","05"];
let combx = k_comb(arr,4);
console.log("combx: ",combx)
*/

/*
function reverse(str) {
    
   return str.length == 1 ? str : str.substr(str.length -1) + reverse(str.substr(0,str.length - 1));

  }
console.log(reverse("abcdefg"))
//
function collatz(n) {
  if (n === 1) {return "1"}
    else if ((n % 2) === 0) {return n + " -> " + collatz(n/2)}
      else { return n + " -> " + collatz(3*n + 1)}
}
let str = collatz(10)
console.log(str)
//
class Person {
   constructor(name) {
      this.name = name;
   }
   greeting() {
      console.log(`Hi. My name is ${this.name}.`);
   }
}

const person = new Person("John");
person.greeting(); // Hi. My name is John.
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('someEvent', () => {
  console.log('The "someEvent" event was fired (emitted)');
});
myEmitter.emit('someEvent'); // This will call the callback function above.

const fs = require("fs")

function readFile(path, callback) {
 fs.readFile(path,"utf8",function(err,res) {
   if (err) {
    callback(err)
   }else {
    callback(res)
   }
 })
 
}

function log(arg) {
  console.log(arg)
}


const mypromisefun = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file,"utf8", (err,res) => {
  	           if (err) { reject(err)}
 		       else { resolve(res)}
          });
    });
}


mypromisefun("./app.js").then(function(res) {
  console.log(res)
})
.catch(function(err) {
    console.log(err)
})



async function myasyncfun() {
	try {
		const result = await mypromisefun("treedata.json");
    const result2 =  JSON.parse(result);
      console.log(result)
	    console.log(result2)
	}
	catch(err){
		console.log(err)
	}
 	
 }  

function getfile(url) {
      
        return new Promise(function(resolve,reject) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET",url, true)
          xhr.onload = function() {
            resolve(xhr.responseText)
          }
          xhr.onerror = function() {
            reject("error")
          }
          xhr.send()
        })
      }

async function displayfile(url) {
  try {
     let js = await getfile(url)
     console.log(js)
  }
  catch(err){
    console.log(err)
  }
}

displayfile("/js/num649.js")

async function myasynctest() {
 	return "result of async"
 }  

async function myasynctest2() {
 	return "done"
 } 

const myasync = async () => {
	const result1 = await myasynctest();
	const result2 = await myasynctest2();
}

*/

