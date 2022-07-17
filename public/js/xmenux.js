/*

<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>

  <title>Animate
  demo</title>
  <link rel="stylesheet" type="text/css" href="xxtemp2.css" media="screen">

<link rel="stylesheet" type="text/css" href="report.css" />
<script src="jQueryLib.js"></script>


  <script type="text/javascript" src="xxmenu1.js"></script>
<style>
#button
{
    background-color:#56aaff;
font-size:18px;
font-family:Comic Sans MS;
font-weight:bold;
color:#000000;

}

</style>

</head>
<body>

<div id="box">Hello!</div>


<span class="span"><p>選項:
  <button id= "button1" type="submit">1</button>
  <button id= "button2" type="submit">2</button>

  <button id= "button3" type="submit">3</button>

  <button id= "button4" type="submit">4</button>

  <button id= "button5" type="submit">5</button>

  <button id= "button6" type="submit">6</button>

  <button id= "button7" type="submit">7</button>
  </p></span>


<span id = "textarea">

<p id="note">今彩539 單一號碼下注1-10次</p>
<p id="note2">幸運號碼 = <input id = "text1" type="text" width = "80"  size = "12" class="textBox"/>
      次數 =    <input id = "text2" type="text" width = "80"
      size = "6" class="textBox"/> 
  <input id= "button" type="button"  value="按這裏" style="position:relative;left:10px"  /> </p>

  </span>

<form id="wrapper2"></form>
  <img id = "img2" src="mobile-apps.jpg" alt="code07">

</body>


</html>


*/




$(function() {

$('#img2').slideUp(2000);
var top1 = 76;
$('#textarea').hide();


$( "#box" )
.animate({
top: [ 160, "linear" ],
    left: [ 280, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 62, "linear" ],
    left: [ 352, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#button1').css({color:'red'});
  $('#textarea').show();
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 340, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 380, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  var num = getLucky5();
  $('#text1').val(num);
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 460, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 548, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#text2').val("10")
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 640, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
    $('#button').css({color:'red'});
next();
})
.animate({
top: [ 250, "linear" ],
    left: [ 680, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
    $('#button').css({color:'#000000'});
    $(this).hide();
    menu1();
next();
})
.delay(1000)
.queue(function(next) {
    $('#text1').val("");
    $('#text2').val("");
  $('#note').text("今彩539 6-7號碼下注1次");
  $('#wrapper2').hide();
    $(this).show();
next();
})
.animate({
top: [ 140, "linear" ],
    left: [ 380, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  var num = getLucky6();
  $('#text1').val(num);
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 460, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 548, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#text2').val("1") 
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 640, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
    $('#button').css({color:'red'});
next();
})
.animate({
top: [ 250, "linear" ],
    left: [ 680, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
    $('#button').css({color:'#000000'});
    $('#wrapper2').show();
    $(this).hide();
    menu1();
next();
})

//
//second run - Option2
.delay(1000)
.queue(function(next) {
    $('#button').css({color:'black'});
      $('#button1').css({color:'black'});
    $('#wrapper2').hide();
    $('#note').text("大樂透 6個號碼下注1-10次");
    $('#text1').val("");
    $('#text2').val("");
    $('#textarea').hide(); 
    $(this).show(); 
next();
})
.animate({
top: [ 62, "linear" ],
    left: [ 388, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#button2').css({color:'red'});
  $('#textarea').show();
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 340, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 380, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  var num = getLotto6();
  $('#text1').val(num);
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 460, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 548, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#text2').val("10")
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 640, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
    $('#button').css({color:'red'});
next();
})
.animate({
top: [ 250, "linear" ],
    left: [ 680, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
    $('#button').css({color:'#000000'});
    $(this).hide();
    menu2();
    $('#wrapper2').show();
next();
})
.delay(1000)
.queue(function(next) {
    $('#text1').val("");
    $('#text2').val("");
  $('#note').text("大樂透 7-8號碼下注1次");
  $('#wrapper2').hide();
    $(this).show();
next();
})
.animate({
top: [ 140, "linear" ],
    left: [ 380, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  var num = getLotto7();
  $('#text1').val(num);
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 460, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 548, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#text2').val("1") 
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 140, "linear" ],
    left: [ 640, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
    $('#button').css({color:'red'});
next();
})
.animate({
top: [ 250, "linear" ],
    left: [ 680, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
    $('#button').css({color:'#000000'});
    $(this).hide();
    menu2();
    $('#wrapper2').show();
next();
})
//
//third run - Option3
.delay(1000)
.queue(function(next) {
    $('#button').css({color:'black'});
    $('#button2').css({color:'black'});
    $('#wrapper2').hide();
    $('#note').text("今彩539前100期號碼統計");
    $('#text1').val("");
    $('#text2').val("");
    $('#textarea').hide(); 
    $(this).show(); 
next();
})
.animate({
top: [ 62, "linear" ],
    left: [ 440, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#button3').css({color:'red'});

next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 540, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#button3').css({color:'red'});
  $('#note2').text(" ");
  $('#textarea').show();
  $('#text1').hide();
  $('#text2').hide();
  $('#button').hide();
menu3();
  $(this).hide();
$('#wrapper2').show();
next();
})

//
//forth run - Option4
.delay(1000)
.queue(function(next) {
    $('#button3').css({color:'black'});
    $('#wrapper2').hide();
    $('#note').text("大樂透前100期號碼統計");
    $('#text1').val("");
    $('#text2').val("");
    $('#textarea').hide(); 
    $(this).show(); 
next();
})
.animate({
top: [ 62, "linear" ],
    left: [ 500, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#button4').css({color:'red'});

next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 340, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#button4').css({color:'red'});
  $('#note2').text(" ");
  $('#textarea').show();
  $('#text1').hide();
  $('#text2').hide();
  $('#button').hide();
menu4();
  $(this).hide();
$('#wrapper2').show();
next();
})

//
//fiveth run - Option5
.delay(1000)
.queue(function(next) {
    $('#button4').css({color:'black'});
    $('#wrapper2').hide();
    $('#note').text("組合公式:C(n,r) = n!/(n - r)!r!");
    $('#text1').val("");
    $('#text2').val("");
    $('#textarea').hide(); 
    $(this).show(); 
next();
})
.animate({
top: [ 62, "linear" ],
    left: [ 560, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#button5').css({color:'red'});
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 620, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#button5').css({color:'red'});
  $('#textarea').show();
next();
})
.animate({
top: [ 98, "linear" ],
    left: [ 480, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
  $('#note').text("例一:01020304050607080910下注今彩539");
  $('#textarea').css({color:'red'});
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 98, "linear" ],
    left: [ 480, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
var text = "例一:01020304050607080910下注今彩539"
  $('#note').text(text);
  $('#textarea').css({color:'black'});
  $(this).hide();
  menu5();
  $('#wrapper2').show();
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
//
//sixth run - lotto six combination
.delay(1000)

.queue(function(next) {

    $('#wrapper2').hide();

    $(this).show(); 
next();
})

.animate({
top: [ 98, "linear" ],
    left: [ 480, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
var text = "例二:111213141516171819202122下注大樂透"
  $('#note').text(text);
  $('#textarea').css({color:'red'});
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 98, "linear" ],
    left: [ 480, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.queue(function(next) {
var text = "例二:111213141516171819202122下注大樂透"
  $('#note').text(text);
  $('#textarea').css({color:'black'});
  $(this).hide();
  menu6();
  $('#wrapper2').show();
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)

//
//final
.queue(function(next) {
  $('#note').text(" ");
  $(this).show();

  $('#wrapper2').hide();
next();
})
.animate({
top: [ 260, "linear" ],
    left: [ 580, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)
.animate({
top: [ 610, "linear" ],
    left: [ 480, "linear" ],
    opacity: [ 1, "linear" ]
}, 2000).queue(function(next) {
//$('#img2').animate({height:'520px',top:top1+'px'},'slow');
    $('#button5').css({color:'black'});
  //$('#button7').css({background:'#56aaff'});

$('#img2').css({height:'520px'},'slow');
    $('#img2').css({top:top1+'px'},'slow');
    $('#img2').css({ border: '4px solid'});
$('#img2').slideDown(1500);

next();
}).delay(1000).animate({fontSize: 40 + 'px'}, 1000);



});





//get combination array

function menu6() {


  var n = [];

// var m = document.getElementById('text1').value;
// var r = document.getElementById('text2').value;
m = "111213141516171819202122";
r = 6;



  for (var i = 0; i < m.length/2; i++) {

    var sub = m.substr(2*i,2);
      n.push(sub);
  }


  n = n.sort()


  var noArray = k_combinations(n,r);


  n= n.join();



  var theader = "<div class= 'CSS_Table_Example style='width:'100%';height:150px;'>";

  theader += "<table id='table' width = '100%'>";



  theader += "<tr>";

  theader += "<td>"+ n + "\u00A0" +"\u00A0"+ "  Total = " + noArray.length + "</td>";



  theader += "</tr>";

  var tbody = "";

  for (i=0; i < noArray.length; i++) {
    var member = noArray[i];
    member = member.join(" ");
      tbody += "<tr>";


            tbody += "<td>";
            tbody += member;
            tbody += "</td>"

        tbody += "</tr>";

    }

    var tfooter = "</table>";+"</div>"
    document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;




} // mynmFuctionh




function menu5() {


  var n = [];

// var m = document.getElementById('text1').value;
// var r = document.getElementById('text2').value;
m = "01020304050607080910";
r = 5;



  for (var i = 0; i < m.length/2; i++) {

    var sub = m.substr(2*i,2);
      n.push(sub);
  }


  n = n.sort()


  var noArray = k_combinations(n,r);


  n= n.join();



  var theader = "<div class= 'CSS_Table_Example style='width:'100%';height:150px;'>";

  theader += "<table id='table' width = '100%'>";



  theader += "<tr>";

  theader += "<td>"+ n + "\u00A0" +"\u00A0"+ "  Total = " + noArray.length + "</td>";



  theader += "</tr>";

  var tbody = "";

  for (i=0; i < noArray.length; i++) {
    var member = noArray[i];
    member = member.join(" ");
      tbody += "<tr>";


            tbody += "<td>";
            tbody += member;
            tbody += "</td>"

        tbody += "</tr>";

    }

    var tfooter = "</table>";+"</div>"
    document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;




} // mynmFuctionh







//input set=111213,k=2
// return [[11,12],[11,13],[12,13]]

function getCombinations(set, k) {
  var i, j, combs, head, tailcombs;

  if (k > set.length || k <= 0) {
    return [];
  }

  if (k == set.length) {
    return [set];
  }

  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

// Assert {1 < k < set.length}

  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }

  return combs;
}






//get status report by lotto-number file

function menu4() {

  var mtext,msub,mindex,tempStr,newstr,i,k,member;
  var tempArray = [];
  var dataArray = [];
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET","paulData6.data",false);
  xmlhttp.send();

  mtext =xmlhttp.responseText;
  tempArray = mtext.split("\n");
  //var regex = /\d\d\s+\,\s+\d\d\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d/; //for 5 numbers
  var regex = /\d\d\s+\,\s+\d\d\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d/;


  for (var i = 0; i < tempArray.length; i++) {
      var str = tempArray[i];
      var arr = str.match(regex); //match return array
      str = arr[0];
      str = str.replace(/\s\,\s|\s/g, "");

      tempArray[i] = str;       
  }


//get first 100 from tempArray

for (var i = 0; i < 100; i++) {
    dataArray.push(tempArray[i]);

}


var combs = "010203040506070809101112131415161718192021222324252627282930"
combs = combs + "31323334353637383940414243444546474849";
var i,j,noi,nnj,cj,x,cx,no,noi,mdata;
var diff,max,pa,cpa,ave,cave,counter,lastshow;
var col1Array,col2Array,col3Array,col4Array;
//get col1Array

    col1Array = [];
    for (i = 0; i < combs.length/2; i++) {
      noi = combs.substr(2*i, 2);
      col1Array.push(noi);
    }


//get co21Array,co31Array

  col2Array = [];
  col3Array = [];
  for (x = 0; x < combs.length/2; x++) {
    nox = combs.substr(2*x, 2)

    counter = 0;
    lastshow = 0

    for (i = 0; i < dataArray.length; i++) {
      mdata = dataArray[i];

      for (j = 0; j < mdata.length/2; j++) {     
          noj = mdata.substr(2*j, 2);

          if (nox==noj){
        counter++;
        lastshow = i+1;
          }     

        } //for j

  }//for i

    col2Array.push(counter);
    col3Array.push(lastshow);

}//for x


//get Average probablities pa

    col4Array = [];
    x = 1/(1/39+1/38+1/37+1/36+1/35);
    max = dataArray.length + 1 //total record + 1
    ave = max/x  //aveg.num of time in max
    cave = ave.toString();
    cave = cave.substr(0, 5);
    for (i = 0; i < col2Array.length; i++) {
      counter = col2Array[i];
      diff = ave-counter;
    /*  if(diff < 0) {
        diff = 0;
      }
  */
      x = 1/39+1/38+1/37+1/36+1/35;
      pa = diff * x * 100
  /* 
      if (pa>0&&pa<100) {
        var cpa = pa.toString();
      }
      else {
    cpa = "0.000";
      }
      if (pa>=100) {
        var cpa = "100.0";
      }
      */


    col4Array.push(pa);

  }



//get col5Array by calculating probabilities
var totalRecord,noShow,lastShow,consP
    col5Array = [];
    totalRecord = dataArray.length + 1;
    consP = 1-(1/39+1/38+1/37+1/36+1/35);

    for (i = 0; i < col3Array.length; i++) {
      lastShow = col3Array[i];
      noShow = totalRecord - lastShow;

      p = Math.pow(consP,noShow);
      p = (1 - p)* 100;

      col5Array.push(p);
    }


//table report
//get table html first row as header
    var theader = "<div class= 'CSS_Table_Example style='width:'100%';height:150px;'>";

    theader += "<table id='table' width = '100%'>"; 
    theader += "<tr>";

    theader += "<td>" + "Number" + "</td>";
    theader += "<td>" + "Actual====>Average" + "</td>";
    theader += "<td>" + "Last Record" + "</td>";
    theader += "<td>" + "ProbabilityA(%)" + "</td>";
    theader += "<td>" + "ProbabilityN(%)" + "</td>";


    theader += "</tr>";


//get table body
    var tbody = "";

    for (i=0; i < combs.length/2; i++) {
    counter = col2Array[i];

    lastshow = col3Array[i];

    pa = col4Array[i];
    cpa = pa.toString();
    cpa= cpa.substr(0,6); 


    p = col5Array[i];
    cp = p.toString();
    cp= cp.substr(0,6); 


      no = combs.substr(2*i, 2);
      tbody += "<tr>";

      tbody += "<td>";
      tbody += no;
      tbody += "</td>";

      tbody += "<td>";
      tbody += counter + "====>"+cave
      tbody += "</td>";

      tbody += "<td>";
      tbody += lastshow;
      tbody += "</td>";

      tbody += "<td>";
      tbody += cpa;
      tbody += "</td>";

      tbody += "<td>";
      tbody += cp;
      tbody += "</td>";

      tbody += "</tr>";

  }
  var tfooter = "</table>" +"</div>";
  document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;     


} //myFunction









//get status report by lotto-number file

function menu3() {

  var mtext,msub,mindex,tempStr,newstr,i,k,member;
  var tempArray = [];
  var dataArray = [];
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET","paulData5.data",false);
  xmlhttp.send();

  mtext =xmlhttp.responseText;
  tempArray = mtext.split("\n");
  var regex = /\d\d\s+\,\s+\d\d\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d/; //for 5 numbers
  //var regex = /\d\d\s+\,\s+\d\d\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d/;


  for (var i = 0; i < tempArray.length; i++) {
      var str = tempArray[i];
      var arr = str.match(regex); //match return array
      str = arr[0];
      str = str.replace(/\s\,\s|\s/g, "");

      tempArray[i] = str;       
  }


//get first 100 from tempArray

for (var i = 0; i < 100; i++) {
    dataArray.push(tempArray[i]);

}


var combs = "010203040506070809101112131415161718192021222324252627282930313233343536373839";
var i,j,noi,nnj,cj,x,cx,no,noi,mdata;
var diff,max,pa,cpa,ave,cave,counter,lastshow;
var col1Array,col2Array,col3Array,col4Array;
//get col1Array

    col1Array = [];
    for (i = 0; i < combs.length/2; i++) {
      noi = combs.substr(2*i, 2);
      col1Array.push(noi);
    }


//get co21Array,co31Array

  col2Array = [];
  col3Array = [];
  for (x = 0; x < combs.length/2; x++) {
    nox = combs.substr(2*x, 2)

    counter = 0;
    lastshow = 0

    for (i = 0; i < dataArray.length; i++) {
      mdata = dataArray[i];

      for (j = 0; j < mdata.length/2; j++) {     
          noj = mdata.substr(2*j, 2);

          if (nox==noj){
        counter++;
        lastshow = i+1;
          }     

        } //for j

  }//for i

    col2Array.push(counter);
    col3Array.push(lastshow);

}//for x


//get Average probablities pa

    col4Array = [];
    x = 1/(1/39+1/38+1/37+1/36+1/35);
    max = dataArray.length + 1 //total record + 1
    ave = max/x  //aveg.num of time in max
    cave = ave.toString();
    cave = cave.substr(0, 5);
    for (i = 0; i < col2Array.length; i++) {
      counter = col2Array[i];
      diff = ave-counter;
    /*  if(diff < 0) {
        diff = 0;
      }
  */
      x = 1/39+1/38+1/37+1/36+1/35;
      pa = diff * x * 100
  /* 
      if (pa>0&&pa<100) {
        var cpa = pa.toString();
      }
      else {
    cpa = "0.000";
      }
      if (pa>=100) {
        var cpa = "100.0";
      }
      */


    col4Array.push(pa);

  }



//get col5Array by calculating probabilities
var totalRecord,noShow,lastShow,consP
    col5Array = [];
    totalRecord = dataArray.length + 1;
    consP = 1-(1/39+1/38+1/37+1/36+1/35);

    for (i = 0; i < col3Array.length; i++) {
      lastShow = col3Array[i];
      noShow = totalRecord - lastShow;

      p = Math.pow(consP,noShow);
      p = (1 - p)* 100;

      col5Array.push(p);
    }


//table report
//get table html first row as header
    var theader = "<div class= 'CSS_Table_Example style='width:'100%';height:150px;'>";

    theader += "<table id='table' width = '100%'>"; 
    theader += "<tr>";

    theader += "<td>" + "Number" + "</td>";
    theader += "<td>" + "Actual====>Average" + "</td>";
    theader += "<td>" + "Last Record" + "</td>";
    theader += "<td>" + "ProbabilityA(%)" + "</td>";
    theader += "<td>" + "ProbabilityN(%)" + "</td>";


    theader += "</tr>";


//get table body
    var tbody = "";

    for (i=0; i < combs.length/2; i++) {
    counter = col2Array[i];

    lastshow = col3Array[i];

    pa = col4Array[i];
    cpa = pa.toString();
    cpa= cpa.substr(0,6); 


    p = col5Array[i];
    cp = p.toString();
    cp= cp.substr(0,6); 


      no = combs.substr(2*i, 2);
      tbody += "<tr>";

      tbody += "<td>";
      tbody += no;
      tbody += "</td>";

      tbody += "<td>";
      tbody += counter + "====>"+cave
      tbody += "</td>";

      tbody += "<td>";
      tbody += lastshow;
      tbody += "</td>";

      tbody += "<td>";
      tbody += cpa;
      tbody += "</td>";

      tbody += "<td>";
      tbody += cp;
      tbody += "</td>";

      tbody += "</tr>";

  }
  var tfooter = "</table>" +"</div>";
  document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;     


} //myFunction









//play six-number lotto


//play six-number lotto
function getLotto6() {
  var num =  getRanNum6();
  for (var i = 0; i < num.length; i++) {
    if (num[i] < 10) {
      num[i] = "0" + num[i]   
    }
    else {
      num[i] = num[i].toString();
    }   
  }
  var cnum = num.join("");
  return cnum;
}


function getLotto7() {
  var match = 0,num7th = 0;
  var num =  getRanNum6();
  for (var i = 1; i < 50; i++) {
      num7th = i;
      for (var j = 0; j < num.length; j++) {
        if (num[j] == num7th) {
            match = 1;     
        }   
      }
  if (!match) {
    num.push(num7th);
    break;
  }
  }

  for (var i = 0; i < num.length; i++) {
    if (num[i] < 10) {
      num[i] = "0" + num[i]   
    }
    else {
      num[i] = num[i].toString();
    }   
  }
  var cnum = num.join("");
  return cnum;
}



function menu2() {
"use srict";
var max = 0;
var luckyNums = "";
var luckyNumArray = [];
max= document.getElementById('text2').value;
luckyNums= document.getElementById('text1').value;

// document.getElementById('myTextBox11').value = "";
// document.getElementById('myTextBox12').value = "";


//get luckyNumArray
//luckyNumsfrom user's input,converted to luckytemp array

var i,luckyno,luckytemp,luckystring;
luckytemp=[];
luckystring="";
for (i = 0; i < luckyNums.length/2; i++) {
    luckyno = luckyNums.substr(2*i, 2);
    luckytemp.push(luckyno);
}

var n = luckytemp.sort();  //n=[01.02,03...49] as frist

var r = 6; //constant  second parameter of k_combination
var luckyNumsArray = k_combinations(n,r);

//luckyNumbsArray =[[010203040506]...[44,45,46,47,48,49]] 


// get dataArray max number of six-number
var dataArray = [];
var winArray= [];
var winTemp= [];
var noString = [];
var numbers = [];
var x = 1;
while (x <= max){
  noString = [];

  numbers = getRanNum6();

  for (var i = 0; i < numbers.length; i++) {
    if(numbers[i] <= 9) {
      numbers[i] = "0" +
      numbers[i]; //convert123...9 to 010203...09
    }
    noString.push(numbers[i]);     
  }
  dataArray.push(noString);
  x++;
}




//get winArray winArray[0]=luckyNum,winArray[1]=lottoNum
//winArray[3]=counter

var i,j,k,counter,luckyno,lottoNums,lottono;
var luckynumSub,luckytemp,lottotemp;

for (x= 0; x < luckyNumsArray.length; x++) {
      luckyNumSub = luckyNumsArray[x];
      luckyNums = luckyNumSub.join("");
  for (i = 0; i < dataArray.length; i++) {
    lottoNums = dataArray[i];

  lottono = lottoNums.join("");

  counter = 0;

  for (j = 0; j < luckyNums.length/2; j++) {
    luckytemp = luckyNums.substr(2*j,2);
    for (k= 0; k<lottono.length/2; k++) {
      lottotemp = lottono.substr(2*k,2);

      if (luckytemp==lottotemp) {
      counter++;
        } //if
    } //for k
  }  //for j   
  wintemp = [];
  wintemp.push(luckyNums);
  wintemp.push(lottono);
  wintemp.push(counter);
  winArray.push(wintemp);
  } //for i
} //for x


// reformat luckyNums and lotto, seperate number with " "
var wintemp1,wintemp2,wintemp3,tempstr1,tempstr2,ccounter;
var win2 = 0;
var win3 = 0;
var win4 = 0;
var win5 = 0;
var win6 = 0;

var wincount = 0
for (i = 0; i <winArray.length ; i++) {
  wintemp = winArray[i];

  wintemp1 = wintemp[0]; //1st element of wintemp[]luckyNum
  tempstr1 ="";
    for (k = 0; k <wintemp1.length/2; k++) {
    tempstr1 += wintemp1.substr(2*k, 2)  + " ";         
    }
    tempstr1 = tempstr1.trim();


  wintemp2 = wintemp[1]; //2nd element of wintemp[]lottono
  tempstr2 ="";
    for (k = 0; k <wintemp2.length/2; k++) {
    tempstr2 += wintemp2.substr(2*k, 2)  + " ";         
    }
    tempstr2= tempstr2.trim(); 

  wintemp3 = wintemp[2]; //3rd element of wintemp[]counter
  switch (wintemp3) {
    case 2:
      win2++;
      break;
    case 3:
      win3++;
      break;
  case 4:
      win4++;
      break;
    case 5:
      win5++;
    case 6:
      win6++;
      break; 
  }
  ccounter = wintemp3.toString();
  wintemp = [];
  wintemp.push(tempstr1); //luckyNums seperated with " "
  wintemp.push(tempstr2); //lottono seperated with " "
  wintemp.push(ccounter); //counter

  winArray[i] = wintemp;

}



//table report
//get table html first row as header
  var totalplay = luckyNumsArray.length*dataArray.length;
  var theader = "<div class= 'CSS_Table_Example style='width:'100%';height:150px;'>";

  theader += "<table id='table' width = '100%'>"; 

  var ccaption = "Total Play: "+totalplay+ "\u00A0"+
  "\u00A0"+"\u00A0" +"Win2: "+win2+ "\u00A0"+"\u00A0"+"\u00A0"+ "Win3: " + win3;
  ccaption = ccaption  + "\u00A0"+ "\u00A0"+"\u00A0" +"Win4: " + win4 + "\u00A0"+ "\u00A0"+"\u00A0" +"Win5: " + win5+ "\u00A0"+ "\u00A0"+"\u00A0" +"Win6: " +win6;

  theader += "<caption>" + ccaption + "</caption>";

  theader += "<tr>";

  theader += "<td>" + "Your Lucky Number" + "</td>";
  theader += "<td>" + "Winning Lotto Number" + "</td>";
  theader += "<td>" + "Win Number" + "</td>";

  theader += "</tr>";

  var tbody = "";
  var col1,col2,col3;
  for (i = 0; i < winArray.length; i++) {
    col1="";
    col2="";
    col3=0;
    wintemp = winArray[i];
    col1 = wintemp[0];
    col2 = wintemp[1];
    col3 = wintemp[2];

//get table body
    tbody += "<tr>";


      tbody += "<td>";
      tbody += col1;
      tbody += "</td>";

      tbody += "<td>";
      tbody += col2;
      tbody += "</td>";

      tbody += "<td>";
      tbody += col3;
      tbody += "</td>";



      tbody += "</tr>";

  }
    var tfooter = "</table>" +"</div>";
    document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;     



} //menu2



function getRanNum6() {
    var n = [];

    for (var i = 1; i < 50; i++) {
        n.push(i);
    }

    while (n.length > 6) {
        n.splice(Math.floor(Math.random() * n.length), 1);
    }


    return n;
}









function getRanNum6() {
    var n = [];

    for (var i = 1; i < 50; i++) {
        n.push(i);
    }

    while (n.length > 6) {
        n.splice(Math.floor(Math.random() * n.length), 1);
    }


    return n;
}






//
function getLucky5() {
  var num =  getRanNum5();
  for (var i = 0; i < num.length; i++) {
    if (num[i] < 10) {
      num[i] = "0" + num[i]   
    }
    else {
      num[i] = num[i].toString();
    }   
  }
  var cnum = num.join("");
  return cnum;
}


function getLucky6() {
  var match = 0,num6th;
  var num =  getRanNum5();
  for (var i = 1; i < 40; i++) {
      num6th = i;
      for (var j = 0; j < num.length; j++) {
        if (num[j] == num6th) {
            match = 1;     
        }   
      }
  if (!match) {
    num.push(num6th);
    break;
  }
  }

  for (var i = 0; i < num.length; i++) {
    if (num[i] < 10) {
      num[i] = "0" + num[i]   
    }
    else {
      num[i] = num[i].toString();
    }   
  }
  var cnum = num.join("");
  return cnum;
}

function menu1() {

var max =0;
var luckyNums = "";
max= document.getElementById('text2').value;

luckyNums= document.getElementById('text1').value;

//document.getElementById('text1').value = "";

//document.getElementById('text1').value = "";

//get luckyNumArray
//luckyNumsfrom user's input,converted to luckytemp array

var i,luckyno,luckytemp,luckystring;
luckytemp=[];
luckystring="";
for (i = 0; i < luckyNums.length/2; i++) {
    luckyno = luckyNums.substr(2*i, 2);
    luckytemp.push(luckyno);
}

var n = luckytemp.sort();  //n=[01.02,03...39] as frist

var r = 5; //constant  second parameter of k_combination
var luckyNumsArray = k_combinations(n,r);

//luckyNumbsArray =[[0102030405],[0102030406][3536373839]] 


// get dataArray
var dataArray = [];
var winArray= [];
var winTemp= [];

var x = 1;
var noString = [];
var numbers = [];
while (x <= max){
  noString = [];

  numbers = getRanNum5();

  for (var i = 0; i < numbers.length; i++) {
    if(numbers[i] <= 9) {
      numbers[i] = "0" +
      numbers[i]; //convert123...9 to 010203...09
    }
    noString.push(numbers[i]);     
  }
  dataArray.push(noString);
  x++;
}




//get winArray

var i,j,k,counter,luckyno,lottoNums,lottono;
var luckynumSub,luckytemp,lottotemp;

for (x= 0; x < luckyNumsArray.length; x++) {
      luckyNumSub = luckyNumsArray[x];
      luckyNums = luckyNumSub.join("");
  for (i = 0; i < dataArray.length; i++) {
    lottoNums = dataArray[i]; 
    lottono = lottoNums.join(""); 
    counter = 0;
      for (j = 0; j < luckyNums.length/2; j++) {
        luckytemp = luckyNums.substr(2*j,2);
        for (k= 0; k<lottono.length/2; k++) {
        lottotemp = lottono.substr(2*k,2);
        if (luckytemp==lottotemp) {
      counter++;
        } //if   
    } //for k
    }  //for j
  wintemp = [];
  wintemp.push(luckyNums);
  wintemp.push(lottono);
  wintemp.push(counter); 
  winArray.push(wintemp); 
  } //for i
} //for x

// reformat luckyNums and lotto, seperate number with " "
var wintemp1,wintemp2,wintemp3,tempstr1,tempstr2,ccounter;
var win2 = 0;
var win3 = 0;
var win4 = 0;
var win5 = 0;
var wincount = 0
for (i = 0; i <winArray.length ; i++) {
  wintemp = winArray[i];
  wintemp1 = wintemp[0]; //1st element of wintemp[]luckyNum
  tempstr1 ="";
    for (k = 0; k <wintemp1.length/2; k++) {
    tempstr1 += wintemp1.substr(2*k, 2)  + " ";         
    }
    tempstr1 = tempstr1.trim();


  wintemp2 = wintemp[1]; //2nd element of wintemp[]lottono
  tempstr2 ="";
    for (k = 0; k <wintemp2.length/2; k++) {
    tempstr2 += wintemp2.substr(2*k, 2)  + " ";         
    }
    tempstr2= tempstr2.trim(); 

  wintemp3 = wintemp[2]; //3rd element of wintemp[]counter
  switch (wintemp3) {
    case 2:
      win2++;
      break;
    case 3:
      win3++;
      break;
  case 4:
      win4++;
      break;
    case 5:
      win5++;
      break; 
  }
  ccounter = wintemp3.toString();
  wintemp = [];
  wintemp.push(tempstr1); //luckyNums seperated with " "
  wintemp.push(tempstr2); //lottono seperated with " "
  wintemp.push(ccounter); //counter

  winArray[i] = wintemp;

}


//table report
//get table html first row as header
  var totalplay = luckyNumsArray.length*dataArray.length;
  var theader = "<div class= 'CSS_Table_Example style='width:'100%';height:150px;'>";

  theader += "<table id='table' width = '100%'>"; 

  var ccaption = "Total Play: "+totalplay+ "\u00A0"+
  "\u00A0"+"\u00A0" +"Win2: "+win2+ "\u00A0"+"\u00A0"+"\u00A0"+ "Win3: " + win3;
  ccaption = ccaption  + "\u00A0"+ "\u00A0"+"\u00A0" +"Win4: " + win4 + "\u00A0"+ "\u00A0"+"\u00A0" +"Win5: " + win5;

  theader += "<caption>" + ccaption + "</caption>";

  theader += "<tr>";

  theader += "<td>" + "Your Lucky Number" + "</td>";
  theader += "<td>" + "Winning Lotto Number" + "</td>";
  theader += "<td>" + "Win" + "</td>";

  theader += "</tr>";

  var tbody = "";
  var col1,col2,col3;
  for (i = 0; i < winArray.length; i++) {
    col1="";
    col2="";
    col3=0;
    wintemp = winArray[i];
    col1 = wintemp[0];
    col2 = wintemp[1];
    col3 = wintemp[2];

//get table body
    tbody += "<tr>";


      tbody += "<td>";
      tbody += col1;
      tbody += "</td>";

      tbody += "<td>";
      tbody += col2;
      tbody += "</td>";

      tbody += "<td>";
      tbody += col3;
      tbody += "</td>";



      tbody += "</tr>";

  }
    var tfooter = "</table>" +"</div>";
    document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;     



} //myFunction



function getRanNum5() {
    var n = [];

    for (var i = 1; i < 40; i++) {
        n.push(i);
    }

    while (n.length > 5) {
        n.splice(Math.floor(Math.random() * n.length), 1);
    }


    return n;
}


function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;

  if (k > set.length || k <= 0) {
    return [];
  }

  if (k == set.length) {
    return [set];
  }

  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }

// Assert {1 < k < set.length}

  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }

  return combs;
}
