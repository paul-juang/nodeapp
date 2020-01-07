//load num649.js
$(function() { 
  $("<a>").attr({id:"return",title:"返回首頁"})
  .css({color: "rgb(0,0,255)"})
  .text("\u21B6").appendTo('body');
  $("<br>").appendTo('body');
  $("#betnum").hide();
  $("#winnum").hide();
  $("#bonus").hide();
  $("ul").hide();
  $("table").hide();

  $("#return").on("click",function() {
    $(this).attr("href","/")
  })

  $("#combstr").focus();

  $('#get-button').on('click', function() {
   renderTable();

 })


  
})

function renderTable(arrofobj) {  

  let combstr = $("#combstr").val().trim();
  let combarr = [];
  getTwo(combarr,combstr); //push num to combarr
  combarr = sortAndUnique(combarr) //sort and delete duplicate nums
  console.log("combarr",combarr);
  
  $("#betnum").css({fontSize:"2.2em", color: "blue"}).text(combarr.join(" "));
  $("#betnum").show();
  let winnum = loto649[0]["lotonum"];
  let windate = "         日期: " +loto649[0]["date"];
  let winbonus = loto649[0]["bonus"]
  let winbonustxt = "特別號:" + winbonus; //

  let wintext = '     中獎號碼: '+ winnum.join(' ') + windate;
  $("#winnum").css({fontSize:"1.8em",color: "red"}).text(wintext);
  $("#bonus").css({fontSize:"1.8em",color: "orange"}).text(winbonustxt);
  $("#winnum").show();
  $("#bonus").show();
  $("ul").show();
  let r = 6;
  let comb6 = k_combinations(combarr,r);
  console.log(comb6);

  let ttlwin1 = 0,ttlwin2 = 0,ttlwin3 = 0,ttlwin4 = 0,ttlwin5 = 0,ttlwin6 = 0,ttlwin7 = 0,ttlwin8 = 0;
  
  let reducearr = comb6.reduce((arrofobj,arr) => {
    let anywin = 0; //任n個
    let bonuswin = 0; 
    arr.forEach((num) => {
        if (num === winbonus) {  //check bonus
         bonuswin = 1;
       }
       winnum.forEach((wnum) => {
          if (num === wnum) {    //check winnin numbers
            anywin++
          }
        })
     })
    let win1 = 0,win2 = 0,win3 = 0,win4 = 0,win5 = 0,win6 = 0,win7 = 0,win8 = 0;
    let bonusfor7 =0;  
    switch (anywin) {
      case 6:
      win1 = 1;   //first prize
      ttlwin1++;
      break;
      case 5:     
      win3 = 1;   //any 5,third prize 
      ttlwin3++;
      break;
      case 4:
      win5 = 1; //any 4,fifth prize
      ttlwin5++;
      break;
      case 3:        
      win8 = 1;   //any 3 eighth prize
      ttlwin8++;
      break;
      case 2:
      bonusfor7 = 1;   //ready for any 2+bonus             
      break;
    }

    //任5個＋特別號 任5個  任4個 ＋特別號

    // any 5 + bonus
    if (win3 && bonuswin) {
      win2 = 1  //second prize
      ttlwin2++;
      win3 = 0;
    }

    // any 4 + bonus
    if (win5 && bonuswin) {
      win4 = 1  //fourth prize
      ttlwin4++;
      win5 = 0;

    }
    // any 3 + bonus
    if (win8 && bonuswin) {
      win6 = 1  //sixth prize
      ttlwin8++;
      win8 = 0;
    }

    // any 2 + bonus
    if (bonusfor7 && bonuswin) {
      win7 = 1  //seventh prize
      ttlwin7++;
    }

    let obj = {};
    let num = arr.join(" ");


    obj["num"] = num;
    obj["win1"] = win1 ? win1 : "";
    obj["win2"] = win2 ? win2 : "";
    obj["win3"] = win3 ? win3 : "";
    obj["win4"] = win4 ? win4 : "";
    obj["win5"] = win5 ? win5 : "";
    obj["win6"] = win6 ? win6 : "";
    obj["win7"] = win7 ? win7 : "";
    obj["win8"] = win8 ? win8 : "";

    arrofobj.push(obj)
    return arrofobj;
  },[])
  console.log("reducearr",reducearr)

  $('tbody').empty();
  reducearr.forEach((obj) =>{

    $("<tr>")
    .append($("<td>").css({width: "80px"}).text(obj.num))
    .append($("<td>").css({color: "red",width: "40px"}).text(obj.win1))
    .append($("<td>").css({color: "red",width: "40px"}).text(obj.win2))
    .append($("<td>").css({color: "red",width: "40px"}).text(obj.win3))
    .append($("<td>").css({width: "40px"}).text(obj.win4))
    .append($("<td>").css({width: "40px"}).text(obj.win5))
    .append($("<td>").css({width: "40px"}).text(obj.win6))
    .append($("<td>").css({width: "40px"}).text(obj.win7))
    .append($("<td>").css({width: "40px"}).text(obj.win8))
    .appendTo($('tbody'))
  })

  $("table").show();
  $("#combstr").val("");
  let liarr = [];
  liarr.push("投注總數: " + reducearr.length);
  liarr.push("頭獎: "+ ttlwin1);
  liarr.push("貳獎: "+ ttlwin2);
  liarr.push("參獎: "+ ttlwin3);
  liarr.push("肆獎: "+ ttlwin4);
  liarr.push("伍獎: "+ ttlwin5);
  liarr.push("陸獎: "+ ttlwin6);
  liarr.push("柒獎: "+ ttlwin7);
  liarr.push("普獎: "+ ttlwin8);
  document.querySelectorAll("li").forEach(function(li,index) {
    li.innerHTML = liarr[index];
  })



  } //end of renderTable


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


  function getTwo(arr,str) {
    if (!str) {
      return;
    }
    let two = str.substr(0,2)
    str = str.substr(2)
    arr.push(two)
    return getTwo(arr,str);
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
