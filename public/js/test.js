$(function() { 
   //let imgUrl = "https://apod.nasa.gov/apod/image/2006/VenusSet_Kananovich_1000.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1910/cheshirecat_chandra_complg.jpg";
   let imgUrl = "https://apod.nasa.gov/apod/image/2105/AgCar_HubbleSchmidt_2212.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/2102/NGC1350_crop.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1909/DaVinciRisingLikaiLin.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1811/1809112022d850cZeilamoonset1024.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/2102/NGC1350_crop.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1811/46PCherney_NoText_Small.jpg";

   let accountingArr = [
      {text:'普通分錄', href:'/ledger'},
      {text:'總帳目表', href:'/ledgerdraw'},
      {text:'試算表', href:'/trialbalance'},
      {text:'損益表', href:'/incomestatement'},
      {text:'資產負債表', href:'/balancesheet'},
      {text:'會計科目', href:'/setacctchart'}   
   ]

   let treeArr = [
      {text:'傳銷登錄', href:'/treedata'},
      {text:'傳銷細目', href:'/agkdraw'},
      {text:'列印圖表', href:'/drawtree'}   
   ]

   let lotoArr = [
      {text:'大樂透投注', href:'/loto649'},
      {text:'大樂透中獎比對', href:'/asloto649'},
      {text:'大樂透中獎摘要', href:'/coloto649'},
      {text:'今彩539投注', href:'/loto539'},
      {text:'今彩539中獎比對', href:'/asloto539'},
      {text:'今彩539中獎摘要', href:'/coloto539'}   
   ]

   let lotostatArr = [
      {text:'大樂透中獎統計', href:'/suloto649'},
      {text:'大樂透統計分析', href:'/suloto649x'}, 
      {text:'大樂透號碼摘要', href:'/preloto649'},
      {text:'今彩539中獎統計', href:'/suloto539'}, 
      {text:'今彩539統計分析', href:'/suloto539x'},
      {text:'今彩539號碼摘要', href:'/preloto539'}   
   ]
   
   $('body').css({'background-image':`url(${imgUrl})`})
   /* for dropdown bars
   <input type="checkbox" id="check">
        <label for="check" class="checkbtn"><i class="fas fa-bars" id="bars"></i></label>
*/
   $('<nav>') //.attr({class:"nav-bar"})
    .html(` 
          
        <input type="checkbox" id="check">
        <label for="check" class="checkbtn"><i class="fa fa-bars" id="bars"></i></label>
        <ul>
              
              <li>
                 <a href='#'>會計系統
                    <i class='fa fa-caret-down'></i>
                 </a>
                                    
                   <ul>
                      ${accountingArr.map(function(obj) {
                        return `
                            <li>
                              <a href=${obj.href}>${obj.text}</a>
                            </li>
                        `
                      }).join('')}
                   </ul>
              </li>

              <li>
                 <a href='#'>金融傳銷
                    <i class='fa fa-caret-down'></i>
                 </a>
                   <ul>
                      ${treeArr.map(function(obj) {
                        return `
                            <li>
                              <a href=${obj.href}>${obj.text}</a>
                            </li>
                        `
                      }).join('')}
                   </ul>
              </li>

              <li>
                 <a href='/d3test'>統計圖表</a>
              </li>

              <li>
                 <a href='/imggallery'>太空圖集</a>
              </li>
             
              <li>
                 <a href='#'>台灣彩券
                    <i class='fa fa-caret-down'></i>
                 </a>
                   <ul>
                      ${lotoArr.map(function(obj) {
                        return `
                            <li>
                              <a href=${obj.href}>${obj.text}</a>
                            </li>
                        `
                      }).join('')}
                   </ul>
              </li>

              <li>
                 <a href='#'>統計預測
                    <i class='fa fa-caret-down'></i>
                 </a>
                   <ul>
                      ${lotostatArr.map(function(obj) {
                        return `
                            <li>
                              <a href=${obj.href}>${obj.text}</a>
                            </li>
                        `
                      }).join('')}
                   </ul>
              </li>
              
           </ul>
        
      `)

   .appendTo('body');


/*
 //flex propertys exercise 
  let imgUrlArrFav = [
     imgFav01,imgFav02,imgFav03,imgFav04,imgFav05,imgFav06,imgFav07,imgFav08,imgFav09,imgFav10,
     imgFav11,imgFav12,imgFav13,imgFav14,imgFav15,imgFav16,imgFav17,imgFav18,imgFav19,imgFav20    
  ];

  $("<div>").attr({id:"displaydiv"})
  .css({'max-width':'1400px',height:'840px',display:'flex','justify-content':'space-evenly',
        'align-content':'space-between','flex-wrap':'wrap',margin:'20px 86px'}
   )
  .appendTo("body");
  $("#displaydiv").html(`
                 ${imgUrlArrFav.map((url) => {
                     return `
                        <img src=${url} class='img' style='width:200px;height:200px;border:2px solid #4133FF;'>
                     `
                 }).join('')}

    `)

    $('#displaydiv').on("dblclick",".img",function(e) {
    e.stopPropagation();
    let imgheight = $(this).css("height");
    if (imgheight === "200px") {
      $(this).css({width: "100vw", height:"100vh"});
      $('#displaydiv').css("margin","20px 0")
    }
    else {
      $(this).css({width:200,height:200,marginTop:10,marginLeft:10});
      $('#displaydiv').css("margin","30px 86px")
    }
  })
*/
    
/* 
//display with grid
let imgUrlArrFav = [
     imgFav01,imgFav02,imgFav03,imgFav04,imgFav05,imgFav06,imgFav07,imgFav08,imgFav09,imgFav10,
     imgFav11,imgFav12,imgFav13,imgFav14,imgFav15,imgFav16,imgFav17,imgFav18,imgFav19,imgFav20    
  ];

$("<div>").attr({class:"img-container"})
  .css({'max-width':'1200px',display:'grid','grid-template-columns':'repeat(auto-fit, minmax(200px, 1fr))'}

   )
  .html(`<div id='displaydiv' class='img-items' style='margin:10px 86px;'>
         </div>`)
  .appendTo("body");
          
$("#displaydiv").html(`
                 ${imgUrlArrFav.map(url => {
                     return `
                        <img src=${url} class='img' style='width:200px;height:200px;border:1px solid #4133FF;'>
                     `
                 }).join('')}

    `)

*/

/*
  //display with flex
  let imgUrlArrFav = [
     imgFav01,imgFav02,imgFav03,imgFav04,imgFav05,imgFav06,imgFav07,imgFav08,imgFav09,imgFav10,
     imgFav11,imgFav12,imgFav13,imgFav14,imgFav15,imgFav16,imgFav17,imgFav18,imgFav19,imgFav20    
  ];
  //'align-items':'center','justify-content':'space-around',
  $("<div>").attr({id:"displaydiv", class:"img-container"})
  .css({'max-width': '1400px',margin:'10px 86px',display:'flex',
         'flex-wrap': 'wrap'}
   )
  .appendTo("body");
  $("#displaydiv").html(`
                 ${imgUrlArrFav.map((url, i) => {
                     return `
                      <div>
                        <img src=${url} style='width:200px;height:200px;margin-top:10px;margin-left:10px;border:2px solid #4133FF;'>
                      </div>
                     `
                 }).join('')}

    `)

    $('#displaydiv').on("dblclick",".img",function(e) {
    e.stopPropagation();
    let imgheight = $(this).css("height");
    if (imgheight === "200px") {
      $(this).css({width: "100vw", height:"100vh"});
      $('#displaydiv').css("margin","20px 0")
    }
    else {
      $(this).css({width:200,height:200,marginTop:10,marginLeft:10});
      $('#displaydiv').css("margin","20px 86px")
    }
  })
*/
 


/*
  let result = jsonarr.map(async (json) => {

        //let elm = fetch(json).then(res => res.json())
        //.then(data => data)
        //return elm

        const res = await fetch(json)
        const data = await res.json()
        return data    
        
     })
  console.log("result: ", result) // an array of fulfilled promises
  */
  
  

 /*
async function afetch(url) {
  const res = await fetch(url)
  const data = await res.json()
  return data
}

let obj = fetch("testData.json").then(function(res) {
  return res.json()
}).then(function(data) {
  console.log("data",data)

  //return data
})
  console.log("obj",obj)
*/

/*let jsonarr = ["testData.json","trialBalance.json"]

let objarr = jsonarr.map(async (json)=> {
  const res = await fetch(json)
  const data = await res.json()
  //console.log(data) 
  return data
})

console.log(objarr)

objarr.forEach( (promise) => {
  
  console.log(promise)
}) 
*/
        
 



/*let jsonarr = ["testData.json","trialBalance.json"];

   async.map(jsonarr, (json, callback) => {
   

    fetch(json).then(function(res) { 
      return res.json()
    }).then(function(data) {
      callback(null,data)
    })          
  },
  function(err,result) {
    if (err) {
      console.log(err)
    }
    let result0 = result[0];
    let result1 = result[1];
        console.log("result0: ", result[0])
        console.log("result1: ", result[1])

  })*/

  


/*
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(`Your current position is: ${latitude},${longitude}`);
    
    const res = await fetch(`/xyz/${latitude},${longitude}`)
    const data = await res.json()
    console.log(data)
   },error,options);
  */

/*
    $.ajax({
        url: '/tree',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ arrOfobj: json }),
        success: function(response) {
          console.log(response);         
        }
      });*/

 // })



/*
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

console.log("length1: ",ninjas.find().length);
console.log("length2:",ninjas.find("Sam").length);
console.log("length3:",ninjas.find("Dean", "Edwards").length);
console.log(ninjas.find("Alex", "Russell", "Jr")




let arr649 = [
    "01","02","03","04","05","06","07","08","09","10",
    "11","12","13","14","15","16","17","18","19","20",
    "21","22","23","24","25","26","27","28","29","30",
    "31","32","33","34","35","36","37","38","39","40",
    "41","42","43","44","45","46","47","48","49"
];

let randomArr = [];
let totalNum = 6;
let max = arr649.length;

while(randomArr.length !== totalNum) {
  let n = Math.floor(Math.random()*max);
  if (randomArr.indexOf(arr649[n]) == -1) {
          randomArr.push(arr649[n]);
     }
}
randomArr.sort(function(a,b) { return a - b })

console.log("randomArr: ", randomArr)
*/  



 /* 
let n = factorial(7)
let r = factorial(5)
let nr = factorial(2)
let combin = n/(r*nr)
let cost = combin * 50
console.log("combin7: ",combin)
console.log("cost7:   ",cost)


n = factorial(22)
r = factorial(5)
nr = factorial(17)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin22: ",combin)
console.log("cost22:   ",cost)


n = factorial(23)
r = factorial(5)
nr = factorial(18)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin23: ",combin)
console.log("cost23:   ",cost)

n = factorial(24)
r = factorial(5)
nr = factorial(19)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin24: ",combin)
console.log("cost24:   ",cost)



n = factorial(8)
r = factorial(5)
nr = factorial(3)
combin = n/(r*nr)
cost = combin * 50
console.log("combin8: ",combin)
console.log("cost8:   ",cost)  
  
n = factorial(9)
r = factorial(5)
nr = factorial(4)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin9: ",combin)
console.log("cost9:   ",cost)

n = factorial(10)
r = factorial(5)
nr = factorial(5)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin10: ",combin)
console.log("cost10:   ",cost)

n = factorial(11)
r = factorial(5)
nr = factorial(6)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin11: ",combin)
console.log("cost11:   ",cost)

n = factorial(12)
r = factorial(5)
nr = factorial(7)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin12: ",combin)
console.log("cost12:   ",cost)

n = factorial(13)
r = factorial(5)
nr = factorial(8)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin13: ",combin)
console.log("cost13:   ",cost)

n = factorial(14)
r = factorial(5)
nr = factorial(9)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin14: ",combin)
console.log("cost14:   ",cost)

n = factorial(25)
r = factorial(5)
nr = factorial(20)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin25: ",combin)
console.log("cost25:   ",cost)

n = factorial(26)
r = factorial(5)
nr = factorial(21)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin26: ",combin)
console.log("cost26:   ",cost)

n = factorial(27)
r = factorial(5)
nr = factorial(22)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin27: ",combin)
console.log("cost27:   ",cost)

console.log('For Loto649')
n = factorial(7)
r = factorial(6)
nr = factorial(1)
combin = n/(r*nr)
cost = combin * 50
console.log("combin7: ",combin)
console.log("cost7:   ",cost)

n = factorial(8)
r = factorial(6)
nr = factorial(2)
combin = n/(r*nr)
cost = combin * 50
console.log("combin8: ",combin)
console.log("cost8:   ",cost)  
  
n = factorial(9)
r = factorial(6)
nr = factorial(3)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin9: ",combin)
console.log("cost9:   ",cost)

n = factorial(10)
r = factorial(6)
nr = factorial(4)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin10: ",combin)
console.log("cost10:   ",cost)

n = factorial(11)
r = factorial(6)
nr = factorial(5)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin11: ",combin)
console.log("cost11:   ",cost)

n = factorial(12)
r = factorial(6)
nr = factorial(6)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin12: ",combin)
console.log("cost12:   ",cost)

n = factorial(13)
r = factorial(6)
nr = factorial(7)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin13: ",combin)
console.log("cost13:   ",cost)

n = factorial(14)
r = factorial(6)
nr = factorial(8)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin14: ",combin)
console.log("cost14:   ",cost)

n = factorial(25)
r = factorial(6)
nr = factorial(19)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin25: ",combin)
console.log("cost25:   ",cost)

n = factorial(26)
r = factorial(6)
nr = factorial(20)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin26: ",combin)
console.log("cost26:   ",cost)

n = factorial(27)
r = factorial(6)
nr = factorial(21)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin27: ",combin)
console.log("cost27:   ",cost)

n = factorial(28)
r = factorial(6)
nr = factorial(22)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin28: ",combin)
console.log("cost28:   ",cost)

n = factorial(29)
r = factorial(6)
nr = factorial(23)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin29: ",combin)
console.log("cost29:   ",cost)

n = factorial(30)
r = factorial(6)
nr = factorial(24)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin30: ",combin)
console.log("cost30:   ",cost)

n = factorial(31)
r = factorial(6)
nr = factorial(25)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin31: ",combin)
console.log("cost31:   ",cost)

n = factorial(32)
r = factorial(6)
nr = factorial(26)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin32: ",combin)
console.log("cost32:   ",cost)
 */
/*
function sendHttpRequest(method,url,data) {
      
        return new Promise(function(resolve,reject) {
          var xhr = new XMLHttpRequest();
               console.log(xhr)

          xhr.open(method, url, true)


          if (data) {
            xhr.responseType = 'text'
            xhr.setRequestHeader("Contain-Type","application/json")
          }

          xhr.onload = function() {
            resolve(xhr.response)
          }
          xhr.onerror = function() {
            reject("error")
          }
          xhr.send(data ? JSON.stringify(data) : null)
        })
      }

async function displayfile(url) {
  try {
     let js = await sendHttpRequest("GET", url, true)
     console.log("textfile", js)
  }
  catch(err){
    console.log(err)
  }
}

async function displayjson(url) {
  try {
     let json = await $.getJSON(url)
     console.log("jsonfile", json)
  }
  catch(err){
    console.log(err)
  }
}
displayfile("/js/num539.js")
displayjson("testData.json")


fetch("https://api.exchangeratesapi.io/latest?base=USD")
.then(response => response.json())
.then(data =>console.log("data",JSON.stringify(data,null,2))
)
*/

    
/*
  const objarr = [
  {name: "1",parent: "0"},
  {name: "2",parent: "1"},
  {name: "3",parent: "1"},
  {name: "4",parent: "2"},
  {name: "5",parent: "2"},
  {name: "6",parent: "3"},
  {name: "7",parent: "3"}
];

const makeTreex = (data) => {

  let treeData = [];
  let dataMap = data.reduce((map, node) => {
    map[node.name] = node;
    return map;
  }, {});

  data.forEach((node,index) => {   
    let parent = dataMap[node.parent];

    if (parent) {
        (parent.children || (parent.children = []))
        .push(node)
    }
    else {
      treeData.push(node);
    }

  })

  return treeData;
}

let result = makeTreex(objarr);
console.log("result",JSON.stringify(result,null,2))
console.log("objarr",JSON.stringify(objarr,null,2))
*/
/*
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
*/
 
/*
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

let array = [3,2,10,5,1,6,9,7,8,4]
console.log("selectionSort: ",selectionSort(array, 0))
*/

/*
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

let array = [3,2,10,4,5,1,6,9,7,8]
console.log("bubbleSort: ",bubbleSort(array, array.length))
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


//

/*
let n = factorial(7)
let r = factorial(5)
let nr = factorial(2)
let combin = n/(r*nr)
let cost = combin * 50
console.log("combin7: ",combin)
console.log("cost7:   ",cost)


n = factorial(22)
r = factorial(5)
nr = factorial(17)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin22: ",combin)
console.log("cost22:   ",cost)


n = factorial(23)
r = factorial(5)
nr = factorial(18)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin23: ",combin)
console.log("cost23:   ",cost)

n = factorial(24)
r = factorial(5)
nr = factorial(19)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin24: ",combin)
console.log("cost24:   ",cost)



n = factorial(8)
r = factorial(5)
nr = factorial(3)
combin = n/(r*nr)
cost = combin * 50
console.log("combin8: ",combin)
console.log("cost8:   ",cost)  
  
n = factorial(9)
r = factorial(5)
nr = factorial(4)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin9: ",combin)
console.log("cost9:   ",cost)

n = factorial(10)
r = factorial(5)
nr = factorial(5)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin10: ",combin)
console.log("cost10:   ",cost)

n = factorial(11)
r = factorial(5)
nr = factorial(6)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin11: ",combin)
console.log("cost11:   ",cost)

n = factorial(12)
r = factorial(5)
nr = factorial(7)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin12: ",combin)
console.log("cost12:   ",cost)

n = factorial(13)
r = factorial(5)
nr = factorial(8)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin13: ",combin)
console.log("cost13:   ",cost)

n = factorial(14)
r = factorial(5)
nr = factorial(9)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin14: ",combin)
console.log("cost14:   ",cost)

n = factorial(25)
r = factorial(5)
nr = factorial(20)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin25: ",combin)
console.log("cost25:   ",cost)

n = factorial(26)
r = factorial(5)
nr = factorial(21)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin26: ",combin)
console.log("cost26:   ",cost)

n = factorial(27)
r = factorial(5)
nr = factorial(22)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin27: ",combin)
console.log("cost27:   ",cost)

console.log('For Loto649')
n = factorial(7)
r = factorial(6)
nr = factorial(1)
combin = n/(r*nr)
cost = combin * 50
console.log("combin7: ",combin)
console.log("cost7:   ",cost)

n = factorial(8)
r = factorial(6)
nr = factorial(2)
combin = n/(r*nr)
cost = combin * 50
console.log("combin8: ",combin)
console.log("cost8:   ",cost)  
  
n = factorial(9)
r = factorial(6)
nr = factorial(3)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin9: ",combin)
console.log("cost9:   ",cost)

n = factorial(10)
r = factorial(6)
nr = factorial(4)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin10: ",combin)
console.log("cost10:   ",cost)

n = factorial(11)
r = factorial(6)
nr = factorial(5)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin11: ",combin)
console.log("cost11:   ",cost)

n = factorial(12)
r = factorial(6)
nr = factorial(6)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin12: ",combin)
console.log("cost12:   ",cost)

n = factorial(13)
r = factorial(6)
nr = factorial(7)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin13: ",combin)
console.log("cost13:   ",cost)

n = factorial(14)
r = factorial(6)
nr = factorial(8)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin14: ",combin)
console.log("cost14:   ",cost)

n = factorial(25)
r = factorial(6)
nr = factorial(19)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin25: ",combin)
console.log("cost25:   ",cost)

n = factorial(26)
r = factorial(6)
nr = factorial(20)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin26: ",combin)
console.log("cost26:   ",cost)

n = factorial(27)
r = factorial(6)
nr = factorial(21)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin27: ",combin)
console.log("cost27:   ",cost)

n = factorial(28)
r = factorial(6)
nr = factorial(22)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin28: ",combin)
console.log("cost28:   ",cost)

n = factorial(29)
r = factorial(6)
nr = factorial(23)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin29: ",combin)
console.log("cost29:   ",cost)

n = factorial(30)
r = factorial(6)
nr = factorial(24)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin30: ",combin)
console.log("cost30:   ",cost)

n = factorial(31)
r = factorial(6)
nr = factorial(25)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin31: ",combin)
console.log("cost31:   ",cost)

n = factorial(32)
r = factorial(6)
nr = factorial(26)
combin = n/(r*nr)
cost = combin * 50;
console.log("combin32: ",combin)
console.log("cost32:   ",cost)
*/
/*
  let arr = ["01","02","03","04","05","06","07","08","09"];
  let comb5 = k_combinations(arr,5);
  let comb6 = k_combinations(arr,6);
  let n = 9,r1 = 5, r2 = 6;
  //total combinations = n!/r!*(n-r)!
  let ttl1 = factorial(n)/(factorial(r1)*factorial(n-r1));
  let ttl2 = factorial(n)/(factorial(r2)*factorial(n-r2));

  console.log(comb5);
  console.log(ttl1);
  console.log(comb6);
  console.log(ttl2);
  */
}) //end of $(function()















function k_combinations(set, k) { 

  if (k > set.length || k <= 0) {
    return [];
  }

  if (k == set.length) {
    return [set];
  }

  if (k == 1) {
    let temp = [];
    set.forEach(function(mem) {
     temp.push([mem]);    
   })
    return temp;
  }

  var combs = [];
  set.forEach(function(mem,index) {
    var head = set.slice(index, index + 1);
    var tailcombs = k_combinations(set.slice(index + 1), k - 1);
    tailcombs.forEach(function(mem){
      combs.push(head.concat(mem));  
    })
  })  
  return combs;
}

function factorial(num) {
  return num == 1 ? 1: num * factorial(num - 1)
}

function sortAndUnique(arr) {
  arr = arr.sort((a,b)=> a-b);
  let newarr = [];
  arr.forEach((line)=> {
    if (newarr.indexOf(line) === -1) {
      newarr.push(line);
    }
  })

      //simpler but confusing - closure created
      //let newarr = arr.filter((line, index) => {
      //     return arr.indexOf(line) == index;
      //    })
  return newarr;
}
