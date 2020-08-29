
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
//bubble sort
const bubbleSort = (arr, i) => {

    if (i === 0) return arr
    
    arr.forEach((n,index) => {
      if (index < i - 1) { 
        if (arr[index] > arr[index + 1]) {
          arr[index] = arr[index + 1]
          arr[index + 1] = n
        } 
      }
    })

    return bubbleSort(arr, i - 1)
}

let array = [3,2,10,4,5,1,6,9,7,8]

console.log("bubbleSort: ",bubbleSort(array))

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

let tree = new BST(10); //vs tree = new BST()

console.log("create val 10: ", JSON.stringify(tree,null,2));

tree.create(12);
console.log("create val 12: ", JSON.stringify(tree,null,2));

tree.create(14);
console.log("create val 14: ", JSON.stringify(tree,null,2));

tree.create(16);
console.log("create val 16: ", JSON.stringify(tree,null,2));

tree.create(9);
console.log("create val 9: ", JSON.stringify(tree,null,2));

tree.create(11);
console.log("create val 11: ", JSON.stringify(tree,null,2));

tree.create(13);
console.log("create val 13: ", JSON.stringify(tree,null,2));

tree.create(15);
console.log("create val 15: ", JSON.stringify(tree,null,2));

console.log("tree: ", JSON.stringify(tree,null,2));


console.log("find result: ", tree.find(15));

console.log("tree root.keys: ", Object.keys(tree.root));
console.log("tree root.values: ", Object.values(tree.root));
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



//makeTree
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


//k_combination
const k_combinations = (set, k) => { 

  let combs = [];

  if (k > set.length || k <= 0) {
    return [];
  }  

  if (k == set.length) {
    combs = [set];
    return combs;
  }

  if (k == 1) {
    set.forEach(mem => combs.push([mem]))
    return combs;
  }

  set.forEach((mem, index) => {
    let head = set.slice(index, index + 1);
    let tailcombs = k_combinations(set.slice(index + 1), k - 1);
    tailcombs.forEach(mem => combs.push(head.concat(mem)))
  })  

  return combs;

}

let arr = ["01","02","03","04","05"];
let combx = k_combinations(arr,4);
console.log("combx: ",combx)

*/

/*

function reverse(str) {
    
   return str.length == 1 ? str : str.substr(str.length -1) + reverse(str.substr(0,str.length - 1));

  }
console.log(reverse("abcdefg"))

function collatz(n) {
  if (n === 1) {return "1"}
    else if ((n % 2) === 0) {return n + " -> " + collatz(n/2)}
      else { return n + " -> " + collatz(3*n + 1)}
}

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

//readFile("./app.js",log)



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

//myasyncfun();



async function myasynctest() {
 	return "result of async"
 }  

async function myasynctest2() {
 	return "done"
 } 

const myasync = async () => {

			console.log("start")

	const result1 = await myasynctest();
		console.log(result1)

	const result2 = await myasynctest2();
		console.log(result2)

		console.log("done")

}
//myasync()

*/

