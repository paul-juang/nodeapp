$(function() { 
console.log("hello");
  // let imgUrl = "https://apod.nasa.gov/apod/image/1809/NGC6727-drudis.jpg";
  
   let imgUrl = "https://apod.nasa.gov/apod/image/1912/solarcanMatrixSolstice.gif";
   var backGroundImage = "url(" + imgUrl + ")";
   $('<div>').attr({id:"hero-image",class:"content-padding"}).css({"background-image":backGroundImage, width:"100%",height:window.innerHeight})
     .append($('<h1>').css({fontSize: "2.0em",fontWeight:"bold",color:"white",textAlign:"center"}).text("Star War"))
     .append($('<h2>').css({fontSize: "2.0em",fontWeight:"bold",color:"white",textAlign:"center"}))
   .appendTo('body');   

$("div").on("click", function() {
  $("h1").css({color:"red"});

  $("h2").css({color:"red"}).text("hello")

  
})
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
/*
   $('<div>').attr({id:"nasa-image"}).css({width:"100%",height:window.innerHeight})
     .append($('<img>').attr({src: imgUrl}).css({width:"100%",height:"100%"}))

   .appendTo('body');
   $('<nav>').attr({class:"navbar navbar-fixed-top"})
   .append(
   //<button id="get-button" class="btn btn-primary btn-lg btn-block">讀取資料</button>

   //$('<div>').attr({class:"content-padding"})
        //.append($('<button>').attr({id: "get-button",class:"btn btn-primary btn-lg btn-block"}).text('讀取資料'))
   //.appendTo('#nasa-image');

   //let div1 = $('div.content-padding');
  */
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