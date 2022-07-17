$(function() { 
console.log("hello");
  

/*
 let arrofarr = getArrOfRandomArr(arrleng,max,totalarr); 
    console.log("arrofarr",arrofarr)          
    numarr = arrofarr.reduce((lotoarr,lotonum) => {
      let obj = {};
      obj['lotonum'] = lotonum;
      lotoarr.push(obj);
      return lotoarr;
    },[]);
    console.log('numarr',numarr)
    return numarr;
  }) (arrleng,max,1,[]);*/

//

})

 function getArrOfRandomArr(arrlength,max,totalarr) {
   var arrOfRandomArr = [];
   while(arrOfRandomArr.length !== totalarr) {
    var randomArr = [];
    while(randomArr.length !== arrlength) {
      var n = Math.floor(Math.random()*max);
      if (n > 0) {
        if (n < 10) {
          n = "0" + n;
        } else {
          n = String(n);
        }
        if (randomArr.indexOf(n) == -1) {
          randomArr.push(n);
        }
      }
    }
    randomArr.sort(function(a,b) { return a - b })
    arrOfRandomArr.push(randomArr)
  }
  return arrOfRandomArr;
}