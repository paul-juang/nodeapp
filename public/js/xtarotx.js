$(function() {

// Define globle variables
cardArr = [];
t1 = 0,t2 = 0,t3 = 0,t4 = 0,t5 = 0;
t6 = 0,t7 = 0,t8 = 0,t9 = 0,t10 = 0;
src1 = "", src2 = "", src3 = "", src4 = "", src5 = "";
src6 = "", src7 = "", src8 = "", src9 = "", src10 = "";



$('#circle').click(function() {
$(this).addClass('saturn');
})

$('#circle').click();



$('#imgx').css({top: '336px',left: '520px',height: '120px',
width: '120px', border: '2px solid'})
.attr({src: "/code/3145/07/images/9720.jpg"}) //042
.addClass('image');

//House Keeping


//get 5 tabs

for (var i = 0; i < 5; i++) {
  var newTop = (40+ (i*200)) + "px";
$('<span ></span>')
.attr(
{
  id: "tab" + (i+1)

})
.css({
  position: 'absolute',
  top: newTop,
  left: '180px'
//  border: '1px solid'
  })
.appendTo('body')
.hide();

}

//get tab11 - tab16
for (var i = 0; i < 6; i++) {
  var newTop = (20+ (i*130)) + "px";
$('<span></span>')
.attr(
{
  id: "tab1" + (i+1)

})
.css({
  position: 'absolute',
  fontSize: '22px',
  fontFamily: 'Comic Sans MS',
  textAlign: 'left',
  height: '24px',
  width: '620px'

  })
.appendTo('body')
.hide();

}

//get tab21 - tab26
for (var i = 0; i < 6; i++) {
  var newTop = (20+ (i*130)) + "px";
$('<span></span>')
.attr(
{
  id: "tab2" + (i+1)

})
.css({
  position: 'absolute',
  fontSize: '22px',
  fontFamily: 'Comic Sans MS',
  textAlign: 'left',
  height: '24px',
  width: '620px'

  })
.appendTo('body')
.hide();

}

//get tab31 - tab36
for (var i = 0; i < 6; i++) {
  var newTop = (20+ (i*130)) + "px";
$('<span></span>')
.attr(
{
  id: "tab3" + (i+1)

})
.css({
  position: 'absolute',
  fontSize: '22px',
  fontFamily: 'Comic Sans MS',
  textAlign: 'left',
  height: '24px',
  width: '620px'

  })
.appendTo('body')
.hide();

}

//get tab41 - tab46
for (var i = 0; i < 6; i++) {
  var newTop = (20+ (i*130)) + "px";
$('<span></span>')
.attr(
{
  id: "tab4" + (i+1)

})
.css({
  position: 'absolute',
  fontSize: '22px',
  fontFamily: 'Comic Sans MS',
  textAlign: 'left',
  height: '24px',
  width: '620px'

  })
.appendTo('body')
.hide();

}

//get tab51 - tab56
for (var i = 0; i < 6; i++) {
  var newTop = (20+ (i*130)) + "px";
$('<span></span>')
.attr(
{
  id: "tab5" + (i+1)

})
.css({
  position: 'absolute',
  fontSize: '22px',
  fontFamily: 'Comic Sans MS',
  textAlign: 'left',
  height: '24px',
  width: '620px'

  })
.appendTo('body')
.hide();

}





// get 78 cards
for (var i = 0; i < 78; i++) {
  var newLeft = (8+ (i*10)) + "px";
$('<img ></img>')
.attr(
{
  src: "/code/3145/07/images/0042.jpg",
  id: function () {
    return "card" + (i+1);
  }
})
.addClass('card')
.css({
  height: '100px',
  weight: '60px',
  top: '520px',
  left: function() {
      return newLeft;
      },
  border: '1px solid'
  })
.appendTo('body');
}

// get 10 Tarot
for (var i = 0; i < 10; i++) {
  var newLeft = (60+ (i*5)) + "px";
$('<img ></img>')
.attr(
{
  src: "/code/3145/07/images/0042.jpg",
  class: "Tarot",
  id: function () {
    return "Tarot" + (i+1);

  }
})
//.addClass('card')
.css({
  height: '100px',
  weight: '60px',
  top: '520px',
  left: function() {
      return newLeft;
      },
  border: '1px solid'
  })
.appendTo('body').hide();
}




//get box,shuffleh2,shufflenote,shuffle

$('<div id="box">Hello!</div>').appendTo('body');
$('#box').css({top: '640px', left: '480px'});

$('<h2 id = "shuffleh2">心誠則靈</h2>').appendTo('body');
$('<span id = "shufflenote" class="span"></span>').appendTo('body');

$('#shuffleh2').css({color: "#FF1493"});
$('<button id= "shuffle" type="submit">洗牌</button>').appendTo('body');


//get img2
$('<img id = "img2" src="/code/3145/07/images/6163.jpg" alt="code07">').appendTo('body');

/*
$('<span id = "com1" class="span">第一位置 - 現在</span>').appendTo('body').hide();
$('<span id = "com2" class="span">第二位置 - 過去</span>').appendTo('body').hide();
$('<span id = "com3" class="span">第三位置 - 未來</span>').appendTo('body').hide();
$('<span id = "com4" class="span">第四位置 - 問題的原由</span>').appendTo('body').hide();
$('<span id = "com5" class="span">第五位置 - 發展的潛力</span>').appendTo('body').hide();

*/



//Main Section

var runTime = 0;
count = 200;
for (var i = 0; i < count; i++) {
  if (runTime < count) {
    timer = setTimeout(main,0);
    runTime++;   
  }
}


});





// funtions

function main() {

$('#img2').slideUp(2000);


var shuffleTop = $('#shuffle').css('top');
shuffleTop = parseFloat(shuffleTop) + 20;

var shuffleleft = $('#shuffle').css('left');
shuffleleft = parseFloat(shuffleleft)+4;

var pre = "/jquery-timer-demo/res/img/";
var suf = ".jpg";


$( "#box" )
.delay(1000)
.queue(function(next) {
$('#shuffleh2').show();
var txt = " "
$('#shufflenote').css({color: "#FF1493"}).text(txt);
$('#shufflenote').show();
$('#shuffle').show();
next();
})


.animate({top: [ shuffleTop, "linear" ],
    left: [ shuffleleft, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)

.animate({top: [ shuffleTop + 200, "linear" ],
    left: [ shuffleleft + 100, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)


.queue(function(next) {
    $(this).hide();
    $('#shuffleh2').hide();
    $('#shufflenote').hide();
    $('#circle').hide();
    $('#imgx').hide();


$('#shuffle').text("洗牌中").css({color:'red'});
firstStep();
next();
})
.delay(4800)
.queue(function(next) {
secondStep();
next();
})
.delay(63000)
.queue(function(next) {
thirdStep();
next();
})

.delay(10000)
/*
.queue(function(next) {
$('#shuffle')
.text("請選5張牌").css({color:'red'})


next();
})

.delay(1000)
//
.animate({top: [ 100, "linear" ],
    left: [ (28+(x1-1)*40), "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)

.animate({
top: [ 300, "linear" ],
    left: [ 300, "linear" ],
    opacity:[ 1, "linear" ]
}, 1000)

.queue(function(next) {
  //$(card1)
            t1 = cardArr[x1];


          src1 = getSrc(t1);



        $(card1)
        .animate({
          top:"240px",
          left: "428px"
            },1000)
          .queue(function(next) {
          $('#img').hide();
          $('#com1').css({color: 'black'}).show();
        $(this)
          .css({height: '160px',width: '100px',padding: '10px',border: 'none'})
          .attr({src : src1 })
          .addClass('photo')

          next();

          })   

    next();

})
.animate({top: [ 100, "linear" ],
    left: [ (28+(x2-1)*40), "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)

.animate({
top: [ 300, "linear" ],
    left: [ 600, "linear" ],
    opacity:[ 1, "linear" ]
}, 1000)
.queue(function(next) {
  // $(card2)
        t2 = cardArr[x2];
            src2 = getSrc(t2);

        $(card2)
        .animate({
          top:"240px",
          left: "276px"
            },1000)
        .queue(function(next) {
          $('#com2').css({color: 'black'}).show();
        $(this)
          .css({height: '160px',width: '100px',padding: '10px',border: 'none'})
          .attr({src : src2 })
          .addClass('photo')


          next();

          })     

    next();

})
.animate({top: [ 100, "linear" ],
    left: [ (28+(x3-1)*40), "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)

.animate({
top: [ 300, "linear" ],
    left: [ 100, "linear" ],
    opacity:[ 1, "linear" ]
}, 1000)
.queue(function(next) {
  // $(card3)
      t3 = cardArr[x3];
        src3 = getSrc(t3);
      $(card3)
        .animate({
          top:"240px",
          left: "580px",
            },1000)

          .queue(function(next) {
          $('#com3').css({color: 'black'}).show();
          $(card3)
          .css({height: '160px',width: '100px',padding: '10px',border: 'none'})
          .attr({src : src3 })
          .addClass('photo')         

          next();

          })   
    next();

})
.animate({top: [ 100, "linear" ],
    left: [ (28+(x4-1)*40), "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)

.animate({
top: [ 300, "linear" ],
    left: [ 540, "linear" ],
    opacity:[ 1, "linear" ]
}, 1000)
.queue(function(next) {
  //$(card4)
        t4 = cardArr[x4];
            src4 = getSrc(t4);

      $(card4)
        .animate({
          top:"440px",
          left: "428px"
            },800)

        .queue(function(next) {
          $('#com4').css({color: 'black'}).show();

      $(this)
          .css({height: '160px',width: '100px',padding: '10px',border: 'none'})
          .attr({src : src4 })
          .addClass('photo')

          next();

          })     
    next();

})
.animate({top: [ 100, "linear" ],
    left: [ (28+(x5-1)*40), "linear" ],
    opacity: [ 1, "linear" ]
}, 1000)

.animate({
top: [ 0, "linear" ],
    left: [ 0, "linear" ],
    opacity:[ 1, "linear" ]
}, 1000)
.queue(function(next) {
  // $(card5)
        t5 = cardArr[x5];
      src5 = getSrc(t5);


        $(card5)
        .animate({
          top:"40px",
          left: "428px",
            },800)
        .queue(function(next) {
          $('#com5').css({color: 'black'}).show();
          $(this)
          .css({height: '160px',width: '100px',padding: '10px',border: 'none'})
          .attr({src : src5 })
          .addClass('photo')


            next();
          })
    next();

})


//change theme iqui/cookbook 6705,2244,3302,9720
//jquery-designers
.animate({top: [ 80, "linear" ],
    left: [ 00, "linear" ],
    opacity: [ 1, "linear" ]
}, 1000) 
.queue(function(next) {
//  $('#img2').slideDown(1000).slideUp(1000);
$('#img').attr({src: "/code/3145/07/images/9720.jpg"});
  for (var i = 0; i < 5; i++) {
    var com = "#com" + (i+1)
    $(com).hide();

  }

  $('#shuffle').css({color: 'black'}).text('洗牌').hide();
  for (var i = 0; i < 22; i++) {
      var card = "#card" + (i + 1);
      $(card).hide();   
    }
$('#card23')
.css({ top:"240px",
  left: "428px",height: '160px',width: '100px',padding: '10px',border: 'none'})
.attr({src : src1 })
.addClass('photo')
.show();

$('#card24')
.css({ top:"240px",
  left: "276px",height: '160px',width: '100px',padding: '10px',border: 'none'})
.attr({src : src2 })
.addClass('photo')

.show();
$('#card25')
.css({ top:"240px",
  left: "580px",height: '160px',width: '100px',padding: '10px',border: 'none'})
.attr({src : src3 })
.addClass('photo')
.show();

$('#card26')
.css({ top:"440px",
  left: "428px",height: '160px',width: '100px',padding: '10px',border: 'none'})
.attr({src : src4 })
.addClass('photo')
.show();

$('#card27')
.css({ top:"40px",
  left: "428px",height: '160px',width: '100px',padding: '10px',border: 'none'})
.attr({src : src5 })
.addClass('photo')
.show();
    next();

})
*/



//hit Tarot1 to display
.delay(500)
.animate({top: [ 320, "linear" ],
    left: [ 485, "linear" ],
    opacity: [ 1, "linear" ]
}, 100)
.animate({
    top: [ 720, "linear" ],
    left: [720, "linear" ],
    opacity:[ 1, "linear" ]
}, 2000)

.queue(function(next) {
$(this).hide();

//move Tarot1

$('#Tarot1')
.attr(
{src:src1
})
.animate({
top: [ 10, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
  $(this)
  .css({
    width: '160px',
    height: '240px',
    padding: '10px'
  });

  $('#tab1')
  .css({
    top: '30px',
    left: '320px',
    color: "black"
    })
  .show()
  var txt = "您選的10張牌:第1位置出現第 " + t1 + " 牌"
  $('#tab1').text(txt);

  $('#tab11')
  .css({
    fontWeight: 'bold',
    top: '62px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "現在"
  $('#tab11').text(txt);


  $('#tab12')
  .css({
    top: '94px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab12').text(txt);

  $('#tab13')
  .css({
    fontWeight: 'bold',
    top: '126px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "解讀"
  $('#tab13').text(txt);

  $('#tab14')
  .css({
    top: '158px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab14').text(txt);

  $('#tab15')
  .css({
    fontWeight: 'bold',
    top: '190px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "叮嚀"
  $('#tab15').text(txt);

  $('#tab16')
  .css({
    top: '222px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab16').text(txt);

  });


// move Tarot2

$('#Tarot2')
.attr(
{src:src2
})
.animate({
top: [ 300, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
$(this)
.css({
width: '160px',
height: '240px',
padding: '10px'
});

$('#tab2')
.css({
top: '332px',
left: '320px',
color: "red"
})
.show()
var txt = "您選的10張牌:第2位置出現第 " + t2 + " 牌"
$('#tab2').text(txt);

$('#tab21')
.css({
fontWeight: 'bold',
top: '364px',
left: '356px',
color: "red"
})
.show()
var txt = "目前的挑戰"
$('#tab21').text(txt);

$('#tab22')
.css({
top: '396px',
left: '356px',
color: "red"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab22').text(txt);

$('#tab23')
.css({
fontWeight: 'bold',
top: '428px',
left: '356px',
color: "red"
})
.show()
var txt = "解讀"
$('#tab23').text(txt);

$('#tab24')
.css({
top: '460px',
left: '356px',
color: "red"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab24').text(txt);

$('#tab25')
.css({
fontWeight: 'bold',
top: '492px',
left: '356px',
color: "red"
})
.show()
var txt = "叮嚀"
$('#tab25').text(txt);

$('#tab26')
.css({
top: '522px',
left: '356px',
color: "red"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab26').text(txt);
  });

//move Tarot3

$('#Tarot3')
.attr(
{src:src3
})
.animate({
top: [ 590, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
$(this)
.css({
width: '160px',
height: '240px',
padding: '10px'
});

$('#tab3')
.css({
top: '622px',
left: '320px',
color: "#0000CD"
})
.show()
var txt = "您選的10張牌:第3位置出現第 " + t3 + " 牌"
$('#tab3').text(txt);

$('#tab31')
.css({
fontWeight: 'bold',
top: '654px',
left: '356px',
color: "#0000CD"
})
.show()
var txt = "遙遠的以前"
$('#tab31').text(txt);

$('#tab32')
.css({
top: '686px',
left: '356px',
color: "#0000CD"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab32').text(txt);

$('#tab33')
.css({
'font-weight': 'bold',
top: '718px',
left: '356px',
color: "#0000CD"
})
.show()
var txt = "解讀"
$('#tab33').text(txt);

$('#tab34')
.css({
top: '750px',
left: '356px',
color: "#0000CD"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab34').text(txt);

$('#tab35')
.css({
fontWeight: 'bold',
top: '782px',
left: '356px',
color: "#0000CD"
})
.show()
var txt = "叮嚀"
$('#tab35').text(txt);

$('#tab36')
.css({
top: '814px',
left: '356px',
color: "#0000CD"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab36').text(txt);

  });


//move Tarot4

$('#Tarot4')
.attr(
{src:src4
})
.animate({
top: [ 880, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
$(this)
.css({
width: '160px',
height: '240px',
padding: '10px'
});

$('#tab4')
.css({
top: '912px',
left: '320px',
color: "#7FFF00"
})
.show()
var txt = "您選的10張牌:第4位置出現第 " + t4 + " 牌"
$('#tab4').text(txt);

$('#tab41')
.css({
fontWeight: 'bold',
top: '944px',
left: '356px',
color: "#7FFF00"
})
.show()
var txt = "不久前的過去"
$('#tab41').text(txt);

$('#tab42')
.css({
top: '976px',
left: '356px',
color: "#7FFF00"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab42').text(txt);

$('#tab43')
.css({
fontWeight: 'bold',
top: '1008px',
left: '356px',
color: "#7FFF00"
})
.show()
var txt = "解讀"
$('#tab43').text(txt);

$('#tab44')
.css({
top: '1040px',
left: '356px',
color: "#7FFF00"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab44').text(txt);

$('#tab45')
.css({
fontWeight: 'bold',
top: '1072px',
left: '356px',
color: "#7FFF00"
})
.show()
var txt = "叮嚀"
$('#tab45').text(txt);

$('#tab46')
.css({
top: '1104px',
left: '356px',
color: "#7FFF00"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab46').text(txt);


//move Tarot5
$('#Tarot5')
.attr(
{src:src5
})
.animate({
top: [ 1170, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)

.queue(function(next) {
$(this)
.css({
width: '160px',
height: '240px',
padding: '10px'
});

$('#tab5')
.css({
top: '1202px',
left: '320px',
color: "#8A2BE2"
})
.show()
var txt = "您選的10張牌:第5位置出現第 " + t5 + " 牌"
$('#tab5').text(txt);
//xxxxx
$('#tab51')
.css({
fontWeight: 'bold',
top: '1234px',
left: '356px',
color: "#8A2BE2"
})
.show()
var txt = "最好的結果"
$('#tab51').text(txt);

//xxxx
$('#tab52')
.css({
top: '1266px',
left: '356px',
color: "#8A2BE2"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab52').text(txt);

$('#tab53')
.css({
fontWeight: 'bold',
top: '1296px',
left: '356px',
color: "#8A2BE2"
})
.show()
var txt = "解讀"
$('#tab53').text(txt);

$('#tab54')
.css({
top: '1328px',
left: '356px',
color: "#8A2BE2"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab54').text(txt);

$('#tab55')
.css({
fontWeight: 'bold',
top: '1360px',
left: '356px',
color: "#8A2BE2"
})
.show()
var txt = "叮嚀"; //"叮嚀aaaa"
$('#tab55').text(txt);

$('#tab56')
.css({
top: '1392px',
left: '356px',
color: "#8A2BE2"
})
.show()
var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
$('#tab56').text(txt);

  })


//move Tarot6

$('#Tarot6')
.attr(
{src:src6
})
.animate({
top: [ 1460, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
  $(this)
  .css({
    width: '160px',
    height: '240px',
    padding: '10px'   
  });
/*
  $('#tab6')
  .css({
    top: '1492px',
    left: '320px',
    color: "black"
    })
  .show()
  var txt = "您選的10張牌:第6位置出現第 " + t6 + " 牌"
  $('#tab1').text(txt);

  $('#tab61')
  .css({
    fontWeight: 'bold',
    top: '1524px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "現在"
  $('#tab61').text(txt);


  $('#tab62')
  .css({
    top: '1556px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab62').text(txt);

  $('#tab63')
  .css({
    fontWeight: 'bold',
    top: '1588px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "解讀"
  $('#tab63').text(txt);

  $('#tab64')
  .css({
    top: '1620px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab64').text(txt);

  $('#tab65')
  .css({
    fontWeight: 'bold',
    top: '1652px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "叮嚀"
  $('#tab65').text(txt);

  $('#tab66')
  .css({
    top: '1684px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab66').text(txt);
*/
  });

//move Tarot7

$('#Tarot7')
.attr(
{src:src7
})
.animate({
top: [ 1750, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
  $(this)
  .css({
    width: '160px',
    height: '240px',
    padding: '10px'   
  });
/*
  $('#tab6')
  .css({
    top: '1492px',
    left: '320px',
    color: "black"
    })
  .show()
  var txt = "您選的10張牌:第6位置出現第 " + t6 + " 牌"
  $('#tab1').text(txt);

  $('#tab61')
  .css({
    fontWeight: 'bold',
    top: '1524px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "現在"
  $('#tab61').text(txt);


  $('#tab62')
  .css({
    top: '1556px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab62').text(txt);

  $('#tab63')
  .css({
    fontWeight: 'bold',
    top: '1588px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "解讀"
  $('#tab63').text(txt);

  $('#tab64')
  .css({
    top: '1620px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab64').text(txt);

  $('#tab65')
  .css({
    fontWeight: 'bold',
    top: '1652px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "叮嚀"
  $('#tab65').text(txt);

  $('#tab66')
  .css({
    top: '1684px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab66').text(txt);
*/
  });

//move Tarot8

$('#Tarot8')
.attr(
{src:src8
})
.animate({
top: [ 2040, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
  $(this)
  .css({
    width: '160px',
    height: '240px',
    padding: '10px'   
  });
/*
  $('#tab6')
  .css({
    top: '1492px',
    left: '320px',
    color: "black"
    })
  .show()
  var txt = "您選的10張牌:第6位置出現第 " + t6 + " 牌"
  $('#tab1').text(txt);

  $('#tab61')
  .css({
    fontWeight: 'bold',
    top: '1524px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "現在"
  $('#tab61').text(txt);


  $('#tab62')
  .css({
    top: '1556px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab62').text(txt);

  $('#tab63')
  .css({
    fontWeight: 'bold',
    top: '1588px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "解讀"
  $('#tab63').text(txt);

  $('#tab64')
  .css({
    top: '1620px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab64').text(txt);

  $('#tab65')
  .css({
    fontWeight: 'bold',
    top: '1652px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "叮嚀"
  $('#tab65').text(txt);

  $('#tab66')
  .css({
    top: '1684px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab66').text(txt);
*/
  });

//move Tarot9

$('#Tarot9')
.attr(
{src:src9
})
.animate({
top: [ 2330, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
  $(this)
  .css({
    width: '160px',
    height: '240px',
    padding: '10px'   
  });
/*
  $('#tab6')
  .css({
    top: '1492px',
    left: '320px',
    color: "black"
    })
  .show()
  var txt = "您選的10張牌:第6位置出現第 " + t6 + " 牌"
  $('#tab1').text(txt);

  $('#tab61')
  .css({
    fontWeight: 'bold',
    top: '1524px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "現在"
  $('#tab61').text(txt);


  $('#tab62')
  .css({
    top: '1556px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab62').text(txt);

  $('#tab63')
  .css({
    fontWeight: 'bold',
    top: '1588px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "解讀"
  $('#tab63').text(txt);

  $('#tab64')
  .css({
    top: '1620px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab64').text(txt);

  $('#tab65')
  .css({
    fontWeight: 'bold',
    top: '1652px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "叮嚀"
  $('#tab65').text(txt);

  $('#tab66')
  .css({
    top: '1684px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab66').text(txt);
*/
  });

//move Tarot9

$('#Tarot10')
.attr(
{src:src10
})
.animate({
top: [ 2620, "linear" ],
left: [ 80, "linear" ],
opacity: [ 1, "linear" ]
}, 500)
.queue(function(next) {
  $(this)
  .css({
    width: '160px',
    height: '240px',
    padding: '10px'   
  });
/*
  $('#tab6')
  .css({
    top: '1492px',
    left: '320px',
    color: "black"
    })
  .show()
  var txt = "您選的10張牌:第6位置出現第 " + t6 + " 牌"
  $('#tab1').text(txt);

  $('#tab61')
  .css({
    fontWeight: 'bold',
    top: '1524px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "現在"
  $('#tab61').text(txt);


  $('#tab62')
  .css({
    top: '1556px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab62').text(txt);

  $('#tab63')
  .css({
    fontWeight: 'bold',
    top: '1588px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "解讀"
  $('#tab63').text(txt);

  $('#tab64')
  .css({
    top: '1620px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab64').text(txt);

  $('#tab65')
  .css({
    fontWeight: 'bold',
    top: '1652px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "叮嚀"
  $('#tab65').text(txt);

  $('#tab66')
  .css({
    top: '1684px',
    left: '356px',
    color: "black"
    })
  .show()
  var txt = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  $('#tab66').text(txt);
*/

  });




})

next();

})




.delay(3000)
.queue(function(next) {
$(this).show();
next();

})
//hit Tarot1 to finalize
/*
.animate({
top: [ 20, "linear" ],
    left: [ 650, "linear" ],
    opacity:[ 1, "linear" ]
}, 1000)

*/

//final

.animate({
top: [ 110, "linear" ],
left: [ 140, "linear" ],
opacity: [ 1, "linear" ]
}, 2000)
.animate({
top: [ 610, "linear" ],
left: [ 480, "linear" ],
opacity: [ 1, "linear" ]
}, 2000)

.queue(function(next) {

$('#img2').slideDown(1000)     

for (var i = 0; i < 10; i++) {
  var tarot = "#Tarot" + (i+1);
  $(tarot).hide();

}


for (var i = 0; i < 5; i++) {
  var tab = "#tab" + (i+1);
  $(tab).hide();

}

for (var i = 0; i < 6; i++) {
  var tab = "#tab1" + (i+1);
  $(tab).hide();

}

for (var i = 0; i < 6; i++) {
  var tab = "#tab2" + (i+1);
  $(tab).hide();

}

for (var i = 0; i < 6; i++) {
  var tab = "#tab3" + (i+1);
  $(tab).hide();

}

for (var i = 0; i < 6; i++) {
  var tab = "#tab4" + (i+1);
  $(tab).hide();

}

for (var i = 0; i < 6; i++) {
  var tab = "#tab5" + (i+1);
  $(tab).hide();

}



$('#img').attr({src: "/code/3145/07/images/jqmobile-cookbook.jpg"}).show();

$('#shuffleh2').show();
$('#shufflenote').show();
$('#shuffle').show();
$('#imgx').show();
$('#circle').show();

$('#shuffle').css({color: 'black'}).text("洗牌");
for (var i = 0; i < 78; i++) {
  card = "#card" + (i+1);
  $(card).remove();     
}

for (var i = 0; i < 78; i++) {
  card = "#temp" + (i+1);
  $(card).remove();     
}

for (var i = 0; i < 10; i++) {
  tarot = "#Tarot" + (i+1);
  $(tarot).remove();   
}
/*
for (var i = 0; i < 5; i++) {
  var tab = "#tab" + (i+1);
  $(card).hide();
}
*/
$('#img2').slideUp(1000);
next();

})



.delay(1000)
.animate({fontSize: 40 + 'px'}, 1000)


.queue(function(next) {

$('#shuffle').css({color: 'black'}).text("洗牌");
// get 78 cards
for (var i = 0; i < 78; i++) {
  var newLeft = (8+ (i*10)) + "px";
$('<img ></img>')
.attr(
{
  src: "/code/3145/07/images/0042.jpg",
  id: function () {
    return "card" + (i+1);
  }
})
.addClass('card')
.css({
  height: '100px',
  weight: '60px',
  top: '520px',
  left: function() {
      return newLeft;
      },
  border: '1px solid'
  })
.appendTo('body');
}


// get 10 Tarot
for (var i = 0; i < 10; i++) {
  var newLeft = (60+ (i*5)) + "px";
$('<img ></img>')
.attr(
{
  src: "/code/3145/07/images/0042.jpg",
  class: "Tarot",
  id: function () {
    return "Tarot" + (i+1);

  }
})
//.addClass('card')
.css({
  height: '100px',
  weight: '60px',
  top: '520px',
  left: function() {
      return newLeft;
      },
  border: '1px solid'
  })
.appendTo('body').hide();
}


/*
$('<img id = "img2" src="/code/3145/07/images/6163.jpg" alt="code07">').appendTo('body');

$('#img2').slideUp(1000);
*/
next();
})





.animate({fontSize: 16 + 'px'}, 1000)

}//main


//functions

function firstStep() {
//1.rotate top,left

for (var i = 0; i < 39; i++) {
  var card = "#card" + (i+1);
  $(card).animate({top:(350-(i*5))+ "px",
  left: (300+(i*10))+ "px"},1000)

}


//2.cut into two decks
for (var i = 0; i < 39; i++) {
    var card = "#card" + (i+1);
    var newTop = (250 - (5*i)) + "px";
    $(card).animate({top:newTop,left:"480px"},500);     
}

for (var i = 39,j= 0; i < 78; i++) {
    var card = "#card" + (i+1);
    var newTop = (250 - (5*j)) + "px";
    $(card).animate({top:newTop,left:"610px"},1200);
    j++;       
}

//3.spread across

$('#card1').animate({top: "400px",left:180 + "px"},1000);
$('#card2').animate({top:"400px",left:235 + "px"},1000);
$('#card10').animate({top:"400px",left:445 + "px"},2000);
$('#card5').animate({top:"400px",left:325 + "px"},2000);
$('#card4').animate({top: "400px",left:355 + "px"},2000);
$('#card6').animate({top:"400px",left:360 + "px"},2000);
$('#card8').animate({top:"400px",left:265 + "px"},2000);
$('#card3').animate({top:"400px",left:385 + "px"},2000);
$('#card7').animate({top:"400px",left:395 + "px"},1000);
$('#card11').animate({top:"400px",left:375 + "px"},1000);
$('#card9').animate({top:"400px",left:390 + "px"},2000);


$('#card17').animate({top: "400px",left:280 + "px"},1000);
$('#card20').animate({top:"400px",left:135 + "px"},1000);
$('#card13').animate({top:"400px",left:245 + "px"},2000);
$('#card21').animate({top:"400px",left:245 + "px"},2000);
$('#card19').animate({top:"400px",left:290 + "px"},2000);
$('#card22').animate({top:"400px",left:245 + "px"},2000);
$('#card15').animate({top:"400px",left:325 + "px"},2000);
$('#card18').animate({top: "400px",left:255 + "px"},2000);
$('#card14').animate({top:"400px",left:360 + "px"},2000);
$('#card16').animate({top:"400px",left:365 + "px"},2000);
$('#card12').animate({top:"400px",left:285 + "px"},2000);
$('#card23').animate({top: "400px",left:180 + "px"},1000);
$('#card33').animate({top:"400px",left:235 + "px"},1000);
$('#card53').animate({top:"400px",left:445 + "px"},2000);
$('#card63').animate({top:"400px",left:325 + "px"},2000);
$('#card73').animate({top: "400px",left:355 + "px"},2000);
$('#card24').animate({top:"400px",left:360 + "px"},2000);
$('#card34').animate({top:"400px",left:265 + "px"},2000);
$('#card44').animate({top:"400px",left:385 + "px"},2000);
$('#card54').animate({top:"400px",left:395 + "px"},1000);
$('#card64').animate({top:"400px",left:375 + "px"},1000);
$('#card74').animate({top:"400px",left:390 + "px"},2000);
$('#card25').animate({top: "400px",left:180 + "px"},1000);
$('#card35').animate({top:"400px",left:235 + "px"},1000);
$('#card45').animate({top:"400px",left:445 + "px"},2000);
$('#card55').animate({top:"400px",left:325 + "px"},2000);
$('#card65').animate({top: "400px",left:355 + "px"},2000);
$('#card75').animate({top:"400px",left:360 + "px"},2000);
$('#card26').animate({top:"400px",left:265 + "px"},2000);
$('#card36').animate({top:"400px",left:385 + "px"},2000);
$('#card46').animate({top:"400px",left:395 + "px"},1000);
$('#card56').animate({top:"400px",left:375 + "px"},1000);
$('#card66').animate({top:"400px",left:375 + "px"},1000);
$('#card76').animate({top:"400px",left:390 + "px"},2000);

$('#card27').animate({top: "400px",left:180 + "px"},1000);
$('#card37').animate({top:"400px",left:235 + "px"},1000);
$('#card47').animate({top:"400px",left:445 + "px"},2000);
$('#card57').animate({top:"400px",left:325 + "px"},2000);
$('#card67').animate({top: "400px",left:355 + "px"},2000);
$('#card77').animate({top: "400px",left:355 + "px"},2000);
$('#card28').animate({top: "400px",left:180 + "px"},1000);
$('#card38').animate({top:"400px",left:235 + "px"},1000);
$('#card48').animate({top:"400px",left:445 + "px"},2000);
$('#card58').animate({top:"400px",left:325 + "px"},2000);
$('#card68').animate({top: "400px",left:355 + "px"},2000);
$('#card78').animate({top: "400px",left:355 + "px"},2000);
$('#card29').animate({top: "400px",left:180 + "px"},1000);
$('#card39').animate({top:"400px",left:235 + "px"},1000);
$('#card49').animate({top:"400px",left:445 + "px"},2000);
$('#card59').animate({top:"400px",left:325 + "px"},2000);
$('#card69').animate({top: "400px",left:355 + "px"},2000);
$('#card30').animate({top: "400px",left:355 + "px"},2000);
$('#card40').animate({top: "400px",left:355 + "px"},2000);
$('#card50').animate({top: "400px",left:355 + "px"},2000);
$('#card60').animate({top: "400px",left:355 + "px"},2000);
$('#card70').animate({top: "400px",left:355 + "px"},2000);

//4.return to original position
for (var i = 0; i < 78; i++) {
  var card = "#card" + (i+1);
  $(card).animate({top: "520px",
  left: (8+(i*10))+ "px"},1000)

  }

}// first step



function showHori(i,j) {
  var ltop = top + "px"
  var tarot = "#temp" + cardArr[i];
  var src = getSrc(cardArr[i]);
  $(tarot) 
  .css({height: '120px',width: '80px',padding: '6px',border: 'none'}) 
  .attr({src : src })
  .addClass('photo')
  /*
  .animate({top: '260px',
      left: '460px'},500)
    .delay(100)
  */
    .animate({top: "8px",
        left: (8 +(i*10))+ "px"},800)
    .queue(function(next) {

      $(this)
      .hide()
      var card = "#card" + (i+1);
      $(card)
      .css({top:"8px",
        left: (8 +(i*10))+ "px"})
      .show();

      i++;
      if (i < j) {
          return showHori(i,j);
      }

    next();
  })

} // showHori






function secondStep() {

for (var i = 0; i < 78; i++) {
  var card = "#card" + (i+1);
  $(card).hide();

}


cardArr = [];

for (var i = 0; i < 78; i++) {
  cardArr.push(i+1);

}

cardArr = getRanOrder(cardArr);

//get new 78 cards in cardArr order
for (var i = 0; i < 78; i++) {
var newLeft = (8+ (i*10)) + "px";
$('<img ></img>')
.attr(
{
  src: "/code/3145/07/images/0042.jpg",
  id: function () {
    return "temp" + cardArr[i];
  }

})
.addClass('card')
.css({
  top: '520px',
  left: function() {
      return newLeft;
      },
  border: '1px solid'
  })
.appendTo('body');
}


showHori(0,78);


/*

arr = [];

for (var i = 0; i < 78; i++) {
  arr.push(i+1);

}

arr = getRanOrder(arr)

for (var i = 0; i < 12; i++) {
  var card = "#card" + arr[i];
  var src = getSrc(arr[i]);
  $(card).attr({src:src}).animate({top: "330px",
  left: (20+(i*70))+ "px"},3000)

}



for (var i = 12, j= 0; i < 40; i++) {
  var card = "#card" + arr[i];
      var src = getSrc(arr[i]);
  $(card).attr({src:src}).animate({top: "100px",
  left: (20+(j*32))+ "px"},3000);
  j++;

}


for (var i = 40, j= 0; i < 68; i++) {
  var card = "#card" + arr[i];
      var src = getSrc(arr[i]);
  $(card).attr({src:src}).animate({top: "460px",
  left: (200+(j*24))+ "px"},3000);
  j++;

  }


for (var i = 68, j= 0; i < 78; i++) {
  var card = "#card" + arr[i];
      var src = getSrc(arr[i]);
  $(card).attr({src:src}).animate({top: "220px",
  left: (100+(j*80))+ "px"},3000);
  j++;

  }


for (var i = 0; i < 78; i++) {
  var card = "#card" + arr[i];
  $(card).animate({top: "8px",
  left: (8+(i*10))+ "px"},3000)

  }

var newLeft = 8 + "px";
var card = ('#card') + arr[0];
$(card).animate({top:"8px",left:newLeft},100)
  .queue(function(next) {

    for (var i = 0; i < 78; i++) {

    var newLeft = (8+ (i*10)) + "px"
    var card = "#card" + (i+1);
    $(card).animate({top:"6px",left:newLeft},500)
    .queue(function(next) {
      $(this).attr({src: "/code/3145/07/images/0042.jpg"})
        next();
    })
  }

next();
})
*/

/*
for (var i = 0; i < 22; i++) {

  var newLeft = (28+ (i*40)) + "px"
  var card = "#card" + (i+1);
  $(card).animate({top:"10px",left:newLeft},500)
  .queue(function(next) {
    $(this).attr({src: "/code/3145/07/images/0042.jpg"})
      next();
  })

  }
*/

}




function thirdStep() {



var centerTop = "280px",centerLeft = "428px";
var center2Top = "302px",center2Left = "410px";
var leftTop = "280px",leftLeft = "264px";
var rightTop = "280px",rightLeft = "580px";
var topTop = "120px",topLeft = "428px";
var bottomTop = "440px",bottomLeft = "428px";

var r7Top = "508px",r7Left = "780px";
var r8Top = "358px",r8Left = "780px";
var r9Top = "208px",r9Left = "780px";
var r10Top = "58px",r10Left = "780px";


var arr = getRanNum(78,10);
//alert(arr);
arr = getRanOrder(arr);


var card1 = "#card" + arr[0];
t1 = arr[0];
var card2 = "#card" + arr[1];
t2 = arr[1];
var card3 = "#card" + arr[2];
t3 = arr[2];
var card4 = "#card" + arr[3];
t4 = arr[3];
var card5 = "#card" + arr[4];
t5 = arr[4];
var card6 = "#card" + arr[5];
t6 = arr[5];
var card7 = "#card" + arr[6];
t7 = arr[6];
var card8 = "#card" + arr[7];
t8 = arr[7];
var card9 = "#card" + arr[8];
t9 = arr[8];
var card10 = "#card" + arr[9];
t10 = arr[9];



src1 = getSrc(t1);
src2 = getSrc(t2);
src3 = getSrc(t3);
src4 = getSrc(t4);
src5 = getSrc(t5);
src6 = getSrc(t6);
src7 = getSrc(t7);
src8 = getSrc(t8);
src9 = getSrc(t9);
src10 = getSrc(t10);




$(card1).animate({top: centerTop, left: centerLeft},1000)
.queue(function() {
  $('#img').hide();
  $('#shuffle').hide();
  $('#box').hide();
  $(this).hide();

  $('#Tarot1')
  .css({ top: centerTop, left: centerLeft,height: '120px',width: '80px',padding: '6px',border: 'none'})
  .attr({src : src1 })
  .addClass('photo').show();

  $(card2).animate({top: center2Top, left: center2Left},1000)
  .queue(function() {
    $(this).hide();
    $('#Tarot2')
    .css({ top: center2Top, left: center2Left,height: '80px',width: '120px',padding: '6px',border: 'none'})
    .attr({src : src2 })
    .addClass('photo').show();

      $(card3).animate({top: rightTop, left: rightLeft},1000)
        .queue(function() {
          $(this).hide();
          $('#Tarot3')
          .css({ top: rightTop, left: rightLeft,height: '120px',width: '80px',padding: '6px',border: 'none'})
          .attr({src : src3 })
          .addClass('photo').show();

        $(card4).animate({top: bottomTop, left: bottomLeft},1000)
        .queue(function() {
          $(this).hide();
          $('#Tarot4')
          .css({ top: bottomTop, left: bottomLeft,height: '120px',width: '80px',padding: '6px',border: 'none'})
          .attr({src : src4 })
          .addClass('photo').show();

          $(card5).animate({top: topTop, left: topLeft},1000)
          .queue(function() {
            $(this).hide();
            $('#Tarot5')
            .css({ top: topTop, left: topLeft,height: '120px',width: '80px',padding: '6px',border: 'none'})
            .attr({src : src5 })
            .addClass('photo').show();

            $(card6).animate({top: leftTop, left: leftLeft},1000)
            .queue(function() {
              $(this).hide();
              $('#Tarot6')
              .css({ top: leftTop, left: leftTop,height: '120px',width: '80px',padding: '6px',border: 'none'})
              .attr({src : src6 })
              .addClass('photo').show();

              $(card7).animate({top: r7Top, left: r7Left},1000)
              .queue(function() {
                $(this).hide();
                $('#Tarot7')
                .css({ top: r7Top, left: r7Left,height: '120px',width: '80px',padding: '6px',border: 'none'})
                .attr({src : src7 })
                .addClass('photo').show();

                  $(card8).animate({top: r8Top, left: r8Left},1000)
                  .queue(function() {
                    $(this).hide();
                    $('#Tarot8')
                    .css({ top: r8Top, left: r8Left,height: '120px',width: '80px',padding: '6px',border: 'none'})
                    .attr({src : src8 })
                    .addClass('photo').show();

                    $(card9).animate({top: r9Top, left: r9Left},1000)
                    .queue(function() {
                      $(this).hide();
                      $('#Tarot9')
                      .css({ top: r9Top, left: r9Left,height: '120px',width: '80px',padding: '6px',border: 'none'})
                      .attr({src : src9 })
                      .addClass('photo').show();

                      $(card10).animate({top: r10Top, left: r10Left},1000)
                      .queue(function() {
                        $('#Tarot10')
                        .css({ top: r10Top, left: r10Left,height: '120px',width: '80px',padding: '6px',border: 'none'})
                        .attr({src : src10 })
                        .addClass('photo').show();
                        for (var i = 0; i < 78; i++) {
                          var card = "#card" + (i + 1);
                          $(card).hide();
                        }

                        $('#box').show();
                        showCards();



                      })


                    })


                  })


                })


              })

            })

        }) 

    })

  })

})

} // third Step



function shuffle() {

//1.rotate top,left

for (var i = 0; i < 22; i++) {
  var card = "#card" + (i+1);
  $(card).animate({top:(350-(i*5))+ "px",
  left: (300+(i*10))+ "px"},1000)

}


//2.cut into two decks
for (var i = 0; i < 11; i++) {
    var card = "#card" + (i+1);
    var newTop = (250 - (5*i)) + "px";
    $(card).animate({top:newTop,left:"480px"},1000);   
}

for (var i = 11,j= 0; i < 22; i++) {
    var card = "#card" + (i+1);
    var newTop = (250 - (5*j)) + "px";
    $(card).animate({top:newTop,left:"610px"},1000);
    j++;       
}



//3.spread across

$('#card1').animate({top: "400px",left:180 + "px"},1000);
$('#card2').animate({top:"400px",left:235 + "px"},1000);
$('#card10').animate({top:"400px",left:445 + "px"},3000);
$('#card12').animate({top:"400px",left:360 + "px"},4000);
$('#card5').animate({top:"400px",left:325 + "px"},2000);
$('#card4').animate({top: "400px",left:355 + "px"},2000);
$('#card6').animate({top:"400px",left:360 + "px"},2000);
$('#card8').animate({top:"400px",left:265 + "px"},2000);
$('#card3').animate({top:"400px",left:385 + "px"},2000);
$('#card7').animate({top:"400px",left:395 + "px"},1000);
$('#card11').animate({top:"400px",left:375 + "px"},1000);
$('#card9').animate({top:"400px",left:390 + "px"},2000);


$('#card21').animate({top: "400px",left:280 + "px"},1000);
$('#card20').animate({top:"400px",left:135 + "px"},1000);
$('#card13').animate({top:"400px",left:245 + "px"},3000);

$('#card19').animate({top:"400px",left:290 + "px"},4000);

$('#card15').animate({top:"400px",left:325 + "px"},2000);
$('#card18').animate({top: "400px",left:255 + "px"},2000);
$('#card14').animate({top:"400px",left:360 + "px"},2000);
$('#card16').animate({top:"400px",left:365 + "px"},2000);
$('#card18').animate({top:"400px",left:285 + "px"},2000);


//4.return to original position

$('#card1').animate({top: "400px",left:100 + "px"},100);
$('#card2').animate({top:"400px",left:105 + "px"},500);
$('#card3').animate({top:"400px",left:110 + "px"},4000);
$('#card4').animate({top:"400px",left:115 + "px"},4000);
$('#card5').animate({top:"400px",left:120 + "px"},2000);
$('#card6').animate({top: "400px",left:125 + "px"},2000);
$('#card7').animate({top:"400px",left:130 + "px"},2000);
$('#card8').animate({top:"400px",left:135 + "px"},2000);
$('#card9').animate({top:"400px",left:140 + "px"},4000);
$('#card10').animate({top:"400px",left:145 + "px"},1000);
$('#card11').animate({top:"400px",left:150 + "px"},3000);
$('#card12').animate({top:"400px",left:155 + "px"},1000);

$('#card13').animate({top:"400px",left:160 + "px"},100);
$('#card14').animate({top:"400px",left:165 + "px"},500);
$('#card15').animate({top:"400px",left:170 + "px"},4000);
$('#card16').animate({top:"400px",left:175 + "px"},4000);
$('#card17').animate({top:"400px",left:180 + "px"},2000);
$('#card18').animate({top:"400px",left:185 + "px"},2000);
$('#card19').animate({top:"400px",left:190 + "px"},2000);
$('#card20').animate({top:"400px",left:195 + "px"},2000);
$('#card21').animate({top:"400px",left:200 + "px"},4200)
.queue(function(next) {
cardOrder();
next();
})
$('#card22').animate({top:"400px",left:205 + "px"},1000);

//5.spread formation
/*
//111
$('#card21')
.delay(250)
.animate({
top:"360px",
left: "445px",
},500)
.queue(function() {
  $(this).css({height: '80px', width:'120px'});
  next();

})

//222

$('#card22')
.delay(4400)
.animate({
top:"340px",
left: "465px",
},1000)

//333

$('#card20')
.delay(3000)
.animate({
top:"200px",
left: "465px",
},1000)

//444

$('#card19')
.delay(1000)
.animate({
top:"340px",
left: "590px",
},1000)

//555

$('#card18')
.delay(2300)
.animate({
top:"340px",
left: "340px",
},1000)

//666

$('#card17')
.delay(7400)
.animate({
top:"480px",
left: "465px",
},800)

*/
}


function cardOrder() {

//get random order  of 22 cards after shuffle
cardArr = [];

for (var i = 0; i < 22; i++) {
  cardArr.push(i+1);

}

cardArr = getRanOrder(cardArr);

//display random permutation
var pre = "/jquery-timer-demo/res/img/";
var suf = ".jpg";
for (var i = 0; i < 7; i++) {
  var newLeft = (100+ (i*100)) + "px";
  var card = "#card" + cardArr[i];
  var time = 1000 + (80*i)
  //var src = getSrc(cardArr[i]);
  $(card).animate({top:"80px",left:newLeft},1000) //test here 5000
  }


for (var i = 7; i < 17; i++) {
x = 0
  var newLeft = (680- (x*120)) + "px";
  var card = "#card" + cardArr[i];
  var time = 1000 + (80*x)
  //var src = getSrc(cardArr[i]);
  $(card).animate({top:"160px",left:newLeft},800)
  x++
  }

for (var i = 17; i < 22; i++) {
x = 0
  var newLeft = (80+ (x*180)) + "px";
  var card = "#card" + cardArr[i];
  var time = 1000 + (80*x)
  //var src = getSrc(cardArr[i]);
  $(card).animate({top:"240px",left:newLeft},600)
  x++
  }






//


for (var i = 0; i < 22; i++) {
  var newLeft = (28+ (i*40)) + "px";
  var card = "#card" + (i+1);
    var time = 1000 + (10*i)
  //src= "/code/3145/07/images/0042.jpg"
  $(card).animate({top:"10px",left:newLeft},1000);
  }

}






function tempT(t) {
if (t > 17 && t<= 34) {
t = t - 17;
}
else if (t > 34 && t <= 51) {
t = t - 17*2
}
else if (t > 51 && t <= 68) {
t = t - 17*3
}
else if (t > 68 && t <= 78) {
t = t - 17*4
}
return t;
}





function getSrc(t) {

var src,x;
var pre = "/jquery-timer-demo/res/img/";
var suf = ".jpg";
if (t > 22) {
x = t%22;
  if (x == 0) {
    t = 22;     
  }
  else {
    t = x;
  }
}



if (t <= 17) {
src = pre + t + suf;
}
else if (t  == 18) {
src = "/code/3145/10/photos/100_0207.JPG";
}
else if  (t == 19) {
src = "/code/3145/10/photos/100B6022.JPG";
}
else if  (t ==  20) {
src = "/code/3145/10/photos/006.JPG";
}
else if  (t ==  21) {
src = "/code/3145/10/photos/005.JPG";
}
else if  (t ==  22) {
src = "/code/3145/10/photos/015.JPG";
}
return src;
}


function getRanOrder(arr) {

var result = [];
    while( arr.length ) {
        var index = Math.floor( arr.length * Math.random() );
        result.push( arr[ index ] );
        arr.splice(index, 1);
    }
    return result;

}





function getRanNum(t,r) {
    var n = [];

    for (var i = 1; i < t; i++) {
        n.push(i);
    }

    while (n.length > r) {
        n.splice(Math.floor(Math.random() * n.length), 1);

    }


    return n;
}



function ckNoMatch(arr) {

  var noMatch = 1;
  for (var i = 0; i < arr.length; i++) {
      for (var j = i+1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
            noMatch = 0;     
        }
      } 
  }
    if (noMatch) {
      return arr; 
    }
    else {   
      for (var i = 0; i < arr.length; i++) {

          for (var j = i+1; j < arr.length; j++) {

            if (arr[i] === arr[j]) {

                arr.splice(j,1);
            }

          } 
    }
    return ckNoMatch(arr);
    }

}


function getTarot(arr,r) {
    var cnt = 0;
    while (arr.length < r){
        cnt++;
        if (cnt > 10) {
          arr = [1,2,3,4,5]
          return arr;
        }
        var onemore = getRanNum(22,1);
        var noMatch = 1;
        for (var i = 0; i < arr.length; i++) {
          if (onemore == arr[i]) {
              noMatch = 0       
            }

        }

    if (noMatch) {
      arr.push(onemore); 
    }
    }
return arr;
}

