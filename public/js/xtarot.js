var t1 = 0,t2 = 0,t3 = 0,t4 = 0,t5 = 0;


var t6 = 0,t7 = 0,t8 = 0,t9 = 0,t10 = 0;


var funcArr = [];


var txtArr = [];





$(function() {





    $('#circle').click(function() {


        $(this).addClass('saturn');


    })





    $('#circle').click();











    $('#imgx').css({top: '336px',left: '520px',height: '120px',


        width: '120px', border: '2px solid'})


    .attr({src: "/code/3145/07/images/9720.jpg"})


    .addClass('image');


//House Keeping





//get 10 tabs and sub tabs





for (var i = 0; i < 10; i++) { //get tab1 - tab10





    $('')

        .attr({


            id: "tab" + (i+1)


        })


        .appendTo('body')


        .hide();


        var tabx = "tab" + (i+1);


for (var j = 0; j < 1; j++) { //get tab11 - tab101


    $('        ')





        .attr({


            id: tabx + (j+1)


        })


        .appendTo('body')


        .hide();





    }


}





// get 78 cards


for (var i = 0; i < 78; i++) {


    var newLeft = (8+ (i*10)) + "px";


    $('')


    .attr({


        src: "/code/3145/07/images/0042.jpg",


        id: function() {


            return "card" + (i+1);


        }


    })


    .addClass('card')


    .css({


        height: '100px',


        width: '60px',


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


    $('')


    .attr({


        src: "/code/3145/07/images/0042.jpg",


        class: "Tarot",


        id: function() {


            return "Tarot" + (i+1);





        }


    })


    .css({


        height: '100px',


        width: '60px',


        top: '520px',


        left: function() {


            return newLeft;


        },


        border: '1px solid'


    })


    .appendTo('body').hide();


}














//get box,shuffleh2,shufflenote,shuffle,img2





$('Hello! ').appendTo('body');


    $('#box').css({top: '640px', left: '480px'});





    $(' 心誠則靈').appendTo('body');


        $('').appendTo('body');





        $('#shuffleh2').css({color: "#FF1493"});


        $('洗牌').appendTo('body');





        $('code07').appendTo('body');








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
    .delay(6500)
    .queue(function(next) {
        thirdStep();
        next();
    })
    .delay(10000)

//move Tarots to display
.delay(200)
.animate({
    left: [800, "linear" ],
    opacity:[ 1, "linear" ]
}, 100)
.queue(function(next) {
    $(this).hide();
    moveTarots(0,10);
    next();
})
.delay(10000) //delay time affects txtArr.length - delay(5000) causes problem
.queue(function(next) {
    showReading(0,10);
    next();    
})

//final section
.delay(16000)
.queue(function(next) {
    $(this).show();
    next();    
})
.animate({
    top: [ 110, "linear" ],
    left: [ 140, "linear" ],
    opacity: [ 1, "linear" ]
}, 500)
.animate({
    top: [ 610, "linear" ],
    left: [ 480, "linear" ],
    opacity: [ 1, "linear" ]
}, 2000)
.queue(function(next) {
    $('#img2').slideDown(1000)    
// hide Tarot1 - Tarot10
for (var i = 0; i < 10; i++) {
    var tarot = "#Tarot" + (i+1);
    $(tarot).hide();    
}


// hide tab1 - tab10 and tab11-tab16 ...tab101 - tab106
for (var i = 0; i < 10; i++) {
    var tabx = "#tab" + (i+1);
    $(tabx).hide();
//get tab11 - tab16, tab21 - tab26 ..tab101 - tab106
for (var k = 0; k < 6; k++) {
    var tabxy = tabx + (k+1)
    $(tabxy).hide();
}


}

// show img,suffleh2...shuffle
$('#img').attr({src: "/code/3145/07/images/jqmobile-cookbook.jpg"}).show();
$('#shuffleh2').show();
$('#shufflenote').show();
$('#shuffle').show();
$('#imgx').show();
$('#circle').show();
$('#shuffle').css({color: 'black'}).text("洗牌");
//remove card1 - card78, Tarot1 - Tarot10
for (var i = 0; i < 78; i++) {
    card = "#card" + (i+1);
    $(card).remove();    
}

for (var i = 0; i < 10; i++) {
    tarot = "#Tarot" + (i+1);
    $(tarot).remove();    
}

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
    $('')
    .attr({
        src: "/code/3145/07/images/0042.jpg",
        id: function() {
            return "card" + (i+1);
        }
    })
    .addClass('card')
    .css({
        height: '100px',
        width: '60px',
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
    $('')
    .attr({
        src: "/code/3145/07/images/0042.jpg",
        class: "Tarot",
        id: function() {
            return "Tarot" + (i+1);
        }
    })
    .css({
        height: '100px',
        width: '60px',
        top: '520px',
        left: function() {
            return newLeft;
        },
        border: '1px solid'
    })
    .appendTo('body')
    .hide();
}
next();
})
.animate({fontSize: 16 + 'px'}, 1000)
}//end of main()


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



function secondStep() {
    var arr = [];
    for (var i = 0; i < 78; i++) {
        arr.push(i+1);
    }
    arr = getRanOrder(arr);
    for (var i = 0; i < 12; i++) {
        var card = "#card" + arr[i];
        var src = getSrc(arr[i]);
        $(card).attr({src:src}).animate({top: "340px",
            left: (60+(i*72))+ "px"},3000)

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
            left: (20+(j*32))+ "px"},3000);
        j++;
    }
    for (var i = 68, j= 0; i < 78; i++) {
        var card = "#card" + arr[i];
        var src = getSrc(arr[i]);
        $(card).attr({src:src}).animate({top: "220px",
            left: (100+(j*80))+ "px"},3000);
        j++;
    }

    arr = getRanOrder(arr);
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


} //end of secondStep


function thirdStep() { //updated with moveCards()





    function moveCards(i,j) {


        var card = "#card" + randArr[i];


        var src = getSrc(randArr[i]);


        var Tarot = "#Tarot" + (i+1);


        switch (i) {


            case 0:


            var newTop = "280px", newLeft = "428px";


            break;


            case 1:


            var newTop = "302px", newLeft = "410px";


            break;


            case 2:


            var newTop = "440px", newLeft = "428px";


            break;


            case 3:


            var newTop = "280px", newLeft = "264px";


            break;


            case 4:


            var newTop = "120px", newLeft = "428px";


            break;


            case 5:


            var newTop = "280px", newLeft = "604px";


            break;


            case 6:


            var newTop = "508px", newLeft = "780px";


            break;


            case 7:


            var newTop = "358px", newLeft = "780px";


            break;


            case 8:


            var newTop = "208px", newLeft = "780px";


            break;


            case 9:


            var newTop = "58px", newLeft = "780px";


            break;


        }


        $(card).animate({top: newTop, left: newLeft},1000)


        .queue(function() {


if (i == 0) { //for the first card


    $('#img').hide();


    $('#shuffle').hide();


    $('#box').hide();      


}


$(this).hide();


$(Tarot)


.css({ top: newTop, left: newLeft,


    height: function() {


return i == 1 ? '80px': '120px' //for the second card


},


width: function() {


    return i == 1 ? '120px' : '80px'


},


padding: '6px',border: 'none'})


.attr({src : src })


.addClass('photo').show();


if (i== 9) { //for the 10th card, hide card1 - card78





    for (var k = 0; k < 78; k++) {


        var card = "#card" + (k + 1);


        $(card).hide();


    }


    $('#box').show();


    showCards();


}


i++;


if (i < j) {


    moveCards(i,j);      


}


}) //end of queue





} //end of moveCards


//thirdStep starts here


var randArr = getRanNum(78,10);


randArr = getRanOrder(randArr);


t1 = randArr[0];


t2 = randArr[1];


t3 = randArr[2];


t4 = randArr[3];


t5 = randArr[4];


t6 = randArr[5];


t7 = randArr[6];


t8 = randArr[7];


t9 = randArr[8];


t10 = randArr[9];


moveCards(0,10);


} // end of thirdStep()











function moveTarots(i,j) {
    var Tarot = "#Tarot" + (i+1);


    var tarotTop = 10+ (290 * i) + "px";


    var tarotLeft = 20 + "px";


    switch (i) {


        case 0:


        var tabColor = "#9400D3";


        var tx = t1;


        break;


        case 1:


        var tabColor = "#FF2400";


        var tx = t2;


        break;


        case 2:


        var tabColor = "#029D74";


        var tx = t3;


        break;


        case 3:


        var tabColor = "purple";


        var tx = t4;


        break;


        case 4:


        var tabColor = "#C71585";


        var tx = t5;


        break;


        case 5:


        var tabColor = "#0000CD";


        var tx = t6;


        break;


        case 6:


        var tabColor = "#7FFF00";


        var tx = t7;


        break;


        case 7:


        var tabColor = "8A2BE2";


        var tx = t8;


        break;


        case 8:


        var tabColor = "#00688B";


        var tx = t9;


        break;


        case 9:


        var tabColor = "#FF8C00";


        var tx = t10;


        break;


    }





    $(Tarot)


    .animate({


        top: [ tarotTop, "linear" ],


        left: [ tarotLeft, "linear" ],


        opacity: [ 1, "linear" ]


    }, 500)


    .queue(function(next) {


        $(this)


        .css({


            width: '160px',


            height: '240px',


            padding: '10px'


        });


//move tabs and sub tabs to their position


var tab1 = "#tab" + (i+1); //#tab1


var tab2 = tab1 + "1"; //#tab11


var tabTop1 = tarotTop;


var tabTop2 = parseFloat(tarotTop)+ 40 + "px"


var tabLeft = 240 + "px";


$(tab1)


.css({


    position: "absolute",


    top: tabTop1,


    left: tabLeft,


    height: '30px',


    width: '700px',


    fontSize: "24px",


    fontWeight: "bold",


    padding: "5px",


    textAlign: "center",


    border: "none"


})


.text("")


.show();


$(tab2)


.css({


    position: "absolute",


    top: tabTop2,


    left: tabLeft,


//height: '220px',


width: '700px',


fontSize: "24px",


fontWeight: "bold",


padding: "5px",


textAlign: "left",


border: "none"


})


.text("")


.show();


$('body,html').animate({scrollTop: parseFloat(tarotTop)}, 800);


//save text1,text2 color to txtArr


var tempArr = [];


var txt1 = "第" + (i+1) + "位置出現第 " + tx + " 牌";


var txt2 = "第" + tx + " 牌的解讀"


+ "中央氣象局地震報告指出，上午11時12分這起規模4.4地震，發生在花蓮縣政府北偏東方25.9公里，即位於花蓮縣近海，深度9.4公里。各地最大震度，花蓮縣和平4級、宜蘭縣南澳4級、南投縣合歡山2級。7分鐘後，在花蓮縣政府北偏東方24.9公里的近海，又發生芮氏規模3.9的地震，深度為17.9公里。花蓮太魯閣最大震度3級，宜蘭縣南澳震度2級，花蓮市、南投縣合歡山及台中市德基都是震度1級。中央氣象局地震報告花蓮縣政府北";


tempArr.push(txt1,txt2,tabColor,parseFloat(tarotTop));


txtArr.push(tempArr);


//alert(i)


//alert(txtArr[i])


i++;


if (i < j) {


    moveTarots(i,j);      


}


else {


    $('body,html').animate({scrollTop: 10}, 800);


}


}) //end of queue





} //end of moveTarots














function showReading(i,j) {





    var tab1 = "#tab" + (i+1);


    var tab2 = tab1 + "1";


    var txt1 = "";


    var txt2 = "";


    var str1 = txtArr[i][0];


    var str2 = txtArr[i][1];


    var color = txtArr[i][2];


    var scrolltop = txtArr[i][3];


    $('body,html').animate({scrollTop: scrolltop}, 1500);


    var timer1 = setInterval(function() {





        txt1 += str1.substr(0,2);


        $(tab1)


        .css({


            color: color


//border: '2px solid'


})


        .text(txt1);


        str1 = str1.substr(2,str1.length-1);


        if (str1.length <= 0) {


            clearInterval(timer1);


        }


    },100);


    var timer2 = setInterval(function() {





        txt2 += str2.substr(0,2);


        $(tab2)


        .css({


            color: color,


            border: '2px solid'


        })


        .text(txt2);


        str2 = str2.substr(2,str2.length-1);


        if (str2.length <= 0) {


            clearInterval(timer2);


        }


    },100);


    i++;


    if (i < j) {


        showReading(i,j);     


    }


    else {


        $('body,html').animate({scrollTop: 10}, 500);


    }








}// end of showReading

















function cardOrder() {





//get random order of 22 cards after shuffle


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


    else if (t == 18) {


        src = "/code/3145/10/photos/100_0207.JPG";


    }


    else if (t == 19) {


        src = "/code/3145/10/photos/100B6022.JPG";


    }


    else if (t == 20) {


        src = "/code/3145/10/photos/006.JPG";


    }


    else if (t == 21) {


        src = "/code/3145/10/photos/005.JPG";


    }


    else if (t == 22) {


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