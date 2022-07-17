//Display Nasa url images
let imgUrl1 = "https://apod.nasa.gov/apod/image/1807/M57Ring_HubbleGendler_3000.jpg";//***
let imgUrl2 = "https://apod.nasa.gov/apod/image/1807/CerealiaFaculaPIA21924.jpg";//***
let imgUrl3 = "https://apod.nasa.gov/apod/image/1807/FermiFinals.jpg"; //***
let imgUrl4 = "https://apod.nasa.gov/apod/image/1807/NGC5866_Block_1518.jpg";  //***
let imgUrl5 = "https://apod.nasa.gov/apod/image/1807/B228_2018-07-07Santos2048.jpg" //*** 
let imgUrl6 = "https://apod.nasa.gov/apod/image/1808/IrisNebula_Sgueglia_2729.jpg";  //***
let imgUrl7 = "https://apod.nasa.gov/apod/image/1808/AroundSadrNarduzziColombari.jpg"; //***
let imgUrl8 = "https://apod.nasa.gov/apod/image/1808/OrionTrapezium_HubbleGendler_4000.jpg"; //***
let imgUrl9 = "https://apod.nasa.gov/apod/image/1808/heic1404b1920.jpg";
let imgUrl10 = "https://apod.nasa.gov/apod/image/1808/MoonMarsGoat_Brustel_3258.jpg"; //**
let imgUrl11 = "https://apod.nasa.gov/apod/image/1808/NGC6744_HaLRGB_MP.jpg";  //***
let imgUrl12 = "https://apod.nasa.gov/apod/image/1808/TahaGhouchkanluTLE2018.jpg"; //***
let imgUrl13 = "https://apod.nasa.gov/apod/image/1608/MeteorM31_hemmerich_1948.jpg"; //***
let imgUrl14 = "https://apod.nasa.gov/apod/image/1808/PencilNebula_Perez_1553.jpg"; //***
let imgUrl15 = "https://apod.nasa.gov/apod/image/1808/M86Eyes_Hanson_1143.jpg";  //***
let imgUrl16 = "https://apod.nasa.gov/apod/image/1808/SoulNebula_Vargas_3106.jpg"; //***
let imgUrl17 = "https://apod.nasa.gov/apod/image/1808/Ryugu_Hayabusa2_1024.jpg"; //***
let imgUrl18 = "https://apod.nasa.gov/apod/image/1808/21p-160818_85_santllop.jpg" //***
let imgUrl19 = "https://apod.nasa.gov/apod/image/1808/M20M21Bobillo.jpg"; //****
let imgUrl20 = "https://apod.nasa.gov/apod/image/1808/fires_mccolgan_1731.jpg";//***
let imgUrl21 = "https://apod.nasa.gov/apod/image/1808/EclipseBalloon_Kuaray_1093.jpg"; //***
let imgUrl22 = "https://apod.nasa.gov/apod/image/1808/asperatus_priester_1024.jpg"; //**
let imgUrl23 = "https://apod.nasa.gov/apod/image/1807/KettlePoint.jpg"; //*
let imgUrl24 = "https://apod.nasa.gov/apod/image/1807/CMB2018_Planck_4672.jpg"; //**
let imgUrl25 = "https://apod.nasa.gov/apod/image/1808/MoonMarsGoat_Brustel_3258.jpg"; //**
let imgUrl26 = "https://apod.nasa.gov/apod/image/1808/parkerlaunchperseids.apodDemeter.jpg"; //**
let imgUrl27 = "https://apod.nasa.gov/apod/image/1807/bracewellradiosundial.jpg"; //*
let imgUrl28 = "https://apod.nasa.gov/apod/image/1807/QuasarJetDrawing_DESY_3508.jpg"; //*
let imgUrl29 = "https://apod.nasa.gov/apod/image/1808/eclipse20180717lazzarotti.jpg"; //*
let imgUrl30 = "https://apod.nasa.gov/apod/image/1808/MilkyWayOregon_Montoya_1500.jpg" //***
let imgUrl31 = "https://apod.nasa.gov/apod/image/1808/Cherney_TLE201807.jpg"; //*
let imgUrl32 = "https://apod.nasa.gov/apod/image/1808/SolarProbeLaunch_Kraus_2048.jpg"; //*
let imgUrl33 = "https://apod.nasa.gov/apod/image/1808/RSPup_HubbleBond_3981.jpg"; //***
var imgUrl34 = "https://apod.nasa.gov/apod/image/1808/NGC6914_Eder.jpg"//***



$(function() {

  let urlarr =[
  imgUrl1,imgUrl2,imgUrl3,imgUrl4,imgUrl5,imgUrl6,imgUrl7,imgUrl8,imgUrl9,imgUrl10,
  imgUrl11,imgUrl12,imgUrl13,imgUrl14,imgUrl15,imgUrl16,imgUrl17,imgUrl18,imgUrl19,imgUrl20,
  imgUrl21,imgUrl22,imgUrl23,imgUrl24,imgUrl25,imgUrl26,imgUrl27,imgUrl28,imgUrl29,imgUrl30,
  imgUrl31,imgUrl32,imgUrl33,imgUrl34
  ];

  $("<div>").attr("id","displaydiv").appendTo("body");
  let displaydiv = $("#displaydiv")


  displayimg(urlarr); //display img in sequence


  /*
  //display img after getimg return a promise
  let promisearr = urlarr.map(getimg);
  let sequence = Promise.resolve();

  promisearr.forEach(function(curpromise) {
    sequence.then(function() {
      return curpromise;
    })
    .then(function(url) {
      $("<img>").attr("src",url).css({width:200,height:200,marginLeft:10,marginTop:10}).appendTo(displaydiv);
    })
    .catch(function(err) {
      console.log("error")
    })

  })
*/
  function getimg(url) {
    return new Promise(function(resolve,reject) {
      var img = new Image();
      img.onload = function() {
        resolve(url)
      }
      img.onerror = function() {
        reject(url)
      }
      img.src = url;
    })
  }
  
  function displayimg(urlarr) {
    let targeturl = urlarr.shift();
    if (targeturl) {
      getimg(targeturl)
      .then(function(url) {
        $("<img>").attr("src",url).css({width:200,height:200,marginLeft:10,marginTop:10}).appendTo(displaydiv);
        displayimg(urlarr);
      })
      .catch(function(urlarr) {
        console.log("error")
      })
    }
  }
//displayimg(urlarr);
/*
$("<div>").attr("id","displaydiv").appendTo("body");
let displaydiv = $("#displaydiv")
let promisearr = urlarr.map(getimg);
let sequence = Promise.resolve();

promisearr.forEach(function(curpromise) {
    sequence.then(function() {
      return curpromise;
    })
    .then(function(url) {
      $("<img>").attr("src",url).css({width:200,height:200,marginLeft:10,marginTop:10}).appendTo(displaydiv);
    })
    .catch(function(err) {
      console.log("error")
    })

})

function getimg(url) {
  return new Promise(function(resolve,reject) {
      var img = new Image();
      img.onload = function() {
        resolve(url)
      }
      img.onerror = function() {
        reject(url)
      }
      img.src = url;
  })
}
  
function displayimg(urlarr) {
  let targeturl = urlarr.shift();
  if (targeturl) {
    getimg(targeturl)
    .then(function(url) {
      $("<img>").attr("src",url).css({width:200,height:200,marginLeft:10,marginTop:10}).appendTo(displaydiv);
      displayimg(urlarr);
     })
    .catch(function(urlarr) {
      console.log("error")
    })
  }
}
*/

})
