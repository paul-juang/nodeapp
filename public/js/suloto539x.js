//print UL winning numbers statistic summary

$(function() {
  let filterarr = loto539.filter(function(obj) {
    return obj["summary"];
  });
  
  let arrofnum539 = filterarr.reduce((reduceNum,numobj)=> {
    let temparr = [];

    let date = numobj.date.substr(6,5);
    let summary = numobj.summary;
    temparr.push(date,summary);
    reduceNum.push(temparr)
    return reduceNum;
  },[]);


  renderUl(arrofnum539)

});

function renderUl(arrofnum539) {  

  let numArr = [],max = 40;
  for (let i = 1; i < max ; i++) {
    let n = i;
    if (n < 10) { 
     n = "0" + n;
   }else {
     n = String(n);
   }
   numArr.push(n);
 }

console.log("numArr:",numArr);
let uiArr = numArr.reduce(function(numarr,cn) {

              let count = 0;
              let datearr = [];

              arrofnum539.forEach((arr)=> {
                 let date = arr[0];
                 let summary = arr[1];


                 summary.forEach((obj)=>{
                   if (obj.num === cn) {
                    count += 1;
                    datearr.push(date);
                   }
                 })
 
              })
              let temparr = [];  
              temparr.push(cn,count,datearr);
              numarr.push(temparr)
              return numarr;

},[])


console.log("uiArr:",uiArr);

$("<br>").appendTo('body');

$("<label>").css({fontWeight:"bold",color:"blue"}).text("備註:").appendTo('body');

$("<ul>").attr({id: "ul"}).appendTo('body');

uiArr.forEach((arr)=>{
  let num = arr[0];
  let count = arr[1];
  let date = arr[2].join(',');
  
    if (count < 10) {
      ccount = String(count) + "\u2002";
    }else{
      ccount = String(count);
    }

    let mtxt = num + "  次數:  " + ccount  + "  日期: " + date;
      
    $("<li>").css({fontWeight:"bold",color:"blue"}).text(mtxt).appendTo($("#ul"));

  })

} //end of renderUl

