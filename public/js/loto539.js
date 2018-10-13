//for app
$(function() {
    $("h6").hide();
    $("ul").hide();
    $("table").hide();

    $("<a>").attr({id:"return",title:"返回首頁"})
    .css({color: "rgb(0,0,255)"})
    .text("\u21B6").appendTo('body');
    $("<br>").appendTo('body');

    $("#return").on("click",function() {
      $(this).attr("href","/home")
    })

let option = "539",arrleng = 5, max = 40;
let jsonarr = ["loto539.json","loto649.json"];

$('#get-button').on('click', function() {
  async.map(jsonarr,function(json,callback) {
    $.getJSON(json,function(result) {
      callback(null,result)
    })        
  },
  function(err,result) {
     if (err) {
      console.log(err)
     }
     let loto539 = result[0];
     let loto649 = result[1];
     $('#div1').hide();
     renderTable(loto539);
  })

/*
  $.ajax({
    url: '/lotodata/' + option,  
    contentType: 'application/json',
    success: function(response) {
             renderTable(response.arrOfLotonum);
             //$('#post').hide();
            // $('#check').hide();
             $('#div1').hide();

      } //sucess function
  }); //end of ajax
*/

}); //end of onclick

function renderTable(arrofobj) {

  $("h6").show();
  $("ul").show();
  $("table").show();

  let arrofarr = arrofobj.reduce((numarr,numobj)=> {
    let num = numobj.lotonum;
    numarr.push(num)
    return numarr;
  },[]);

  console.log(arrofarr);

  let numarr = [];
  for (let i = 1; i < max ; i++) {
    let n = i;
    if (n < 10) { 
     n = "0" + n;
    }else {
     n = String(n);
    }
    numarr.push(n);
  }

  //set p of each number appearing and mean of count in totalarr
  let p = 0, mean = 0,totalarr = arrofobj.length;
  if (arrleng === 5) {
      p = 1/39 + 1/38 + 1/37 + 1/36 + 1/35;
    }else {
      p = 1/49 + 1/48 + 1/47 + 1/46 + 1/45 + 1/44;
    }
    mean = Math.floor(totalarr * p);

  let resultobj = numarr.reduce((obj,cn) => {
        let count = 0;
        let position = [];
        arrofarr.forEach((arr,index) => {
          arr.forEach((cx) => {
           if (cx === cn) {
            count += 1;
            position.push(index + 1);
           }
          })
        })
        let tempobj = {},
        neardistance = position.length === 0 ? totalarr : totalarr - position[position.length - 1],
        deviation = count - mean;
        tempobj["count"] = count;  
        tempobj['mean'] = mean;
        tempobj["deviation"] = deviation;
        tempobj["position"] = position; //position === [] -  cn does not appear during max period
        tempobj["neardist"] = neardistance;
        tempobj["prob"] = 1 - Math.pow(1-p,neardistance+1);
        obj[cn] = tempobj;
       return obj;
     },{});
    console.log(resultobj); 

    $("<tbody>").empty();
     numarr.forEach((cn) =>{
      let no = cn,
          count = resultobj[cn].count,
          mean = resultobj[cn].mean,
          diff = resultobj[cn].deviation,
          position = resultobj[cn].position.join(','),
          neardist =  resultobj[cn].neardist,
          prob =  resultobj[cn].prob;
          $("<tr>")
           .append($("<td>").attr("class","no").text(String(no)))
           .append($("<td>").attr("class","count").text(String(count)))
           .append($("<td>").attr("class","mean").text(String(mean)))
           .append($("<td>").attr("class","diff").text(String(diff)))  
           .append($("<td>").attr("class","position").text(position)) 
           .append($("<td>").attr("class","neardist").text(String(neardist)))  
           .append($("<td>").attr("class","prob").text(String(prob).substr(0,6)))
          .appendTo($('tbody'))
    })

    let diff1 = document.querySelectorAll(".diff");
    let diff2 = $(".diff")
    console.log("selector")
    console.log(diff1.constructor)
    console.log(diff1.length)
    console.log("query")
    console.log(diff2.constructor)
    console.log(diff2.length)
    // set td.style.color for class diff and prob
    document.querySelectorAll(".diff").forEach(function(td) {
      let txt = td.innerHTML;
      txt = Number(txt);
      if (txt < 0) {
        td.style.color = "red";
      }
    })

    document.querySelectorAll(".prob").forEach(function(td) {
      let txt = td.innerHTML;
      txt = Number(txt);
      if (txt >= 0.90) {
        td.style.color = "red";
      }
    })
 
/*
    // use jquery - set td.style.color for class diff and prob
    let tddiff = $("tr .diff")
    for (let i = 0; i < tddiff.length; i++) {
      let txt = $(tddiff[i]).text();
      txt = Number(txt);
      if (txt < 0) {
        $(tddiff[i]).css("color","red")
      }
    }

    let tdprob = $("tr .prob")
    for (let i = 0; i < tdprob.length; i++) {
      let txt = $(tdprob[i]).text();
      txt = Number(txt);
      if (txt >= 0.90) {
        $(tdprob[i]).css("color","red")
      }
    }
 */   

  } //end of renderTable


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

});   //end of (function())
