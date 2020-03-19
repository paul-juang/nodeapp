//home page in Chinese
$(function() { 

  renderHomePage();

  function renderHomePage() {

   let max = imgUrlArr.length;
   let n = Math.floor(Math.random()*max);

   //let imgUrl = imgUrlArr[n];

   //temp testing loading gif image
   //let imgUrl = "https://apod.nasa.gov/apod/image/1912/solarcanMatrixSolstice.gif";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1809/image1bedingfield.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1906/AnticrepuscularRays_Patekar_5600.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1905/CatsEye_HubblePohl_1278.jpg"
   //let imgUrl = "https://apod.nasa.gov/apod/image/1907/2019_07_02_TSE_LaSilla_Sequence_1500px.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1910/cheshirecat_chandra_complg.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1809/NGC6727-drudis.jpg";
  // let imgUrl = "https://apod.nasa.gov/apod/image/1909/DaVinciRisingLikaiLin.jpg" ;
 
//let imgUrl = "https://apod.nasa.gov/apod/image/1810/JupiterUV_HubbleSchmidt_1280.jpg";

//let imgUrl = "https://apod.nasa.gov/apod/image/1901/LOmbradellaTerraFinazzi.jpg";

   //let imgUrl = "https://apod.nasa.gov/apod/image/1811/leonidSV_1000.jpg";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1901/TLE2018Jan-seq3w.jpg";
  //let imgUrl = "https://apod.nasa.gov/apod/image/1811/46PCherney_NoText_Small.jpg";
  //let imgUrl = "https://apod.nasa.gov/apod/image/1903/M15_Gaia_stars1024b.gif";
   //let imgUrl = "https://apod.nasa.gov/apod/image/1810/NGC6543-BYU-L.jpg";
   let imgUrl = "https://apod.nasa.gov/apod/image/1811/46PCherney_NoText_Small.jpg";
   console.log(imgUrl);
   

   let height = $("body").css("height")
   $('<div>').attr({id:"nasa-image"}).css({width:"100%",height:window.innerHeight})
   .append($('<img>').attr({src: imgUrl}).css({width:"100%",height:"100%"}))
   .appendTo('body');  

   $('<nav>').attr({class:"navbar navbar-fixed-top"})
   .append(
    $('<div>').attr({class:"content-padding"})
    )
   .appendTo('body');

   let div1 = $('div.content-padding');

   $('<ul>').attr({class:"nav navbar-nav navbar-center"}) //right

   .append($('<li>')
    .append($('<a>').attr({href:'/', id:"homeRef"}).text('首頁'))
    )
   
   .append($('<li>').attr({class:'dropdown',id:"accounting"})
    .append(
     $('<a>').attr({href:'#',class:'dropdown-toggle','data-toggle':"dropdown"}).text('會計系統') 		
     .append($('<i>').attr({class:'fa fa-chevron-down'}))						    
     ))

  
   .append($('<li>').attr({class:'dropdown',id:"tree"})
    .append(
     $('<a>').attr({href:'#',class:'dropdown-toggle','data-toggle':"dropdown"}).text('金融傳銷')    
     .append($('<i>').attr({class:'fa fa-chevron-down'}))               
     ))
   .append($('<li>')
    .append($('<a>').attr({href:'/d3test', id:"homeRef"}).text('統計圖表'))
    )

   .append($('<li>')
    .append($('<a>').attr({href:'/imggallery', id:"homeRef"}).text('太空圖集'))
    )


  // .append($('<li>')
  //   .append($('<a>').attr({href:'/starwar', id:"homeRef"}).text('星際大戰'))
  //  )


   .append($('<li>').attr({class:'dropdown',id:"loto"})
    .append(
     $('<a>').attr({href:'#',class:'dropdown-toggle','data-toggle':"dropdown"}).text('台灣彩券')    
     .append($('<i>').attr({class:'fa fa-chevron-down'}))               
     ))


   .appendTo(div1);

   let li2 = $("#accounting")
   $('<ul>').attr({class:'dropdown-menu',id:"accountingMenu"})
   .appendTo(li2)


   let accountingArr = [

      "普通分錄","總帳目表","試算表","損益表","資產負債表","會計科目"

   ]

   let accountingHref = [
     "/generalledger","/ledgerdraw","/trialbalance","/incomestatement","/balancesheet","/setacctchart"
   ]

   for (let i = 0; i < accountingArr.length; i++) {
    $('<li>')
    .append($('<a>').attr({href:accountingHref[i],class:'episode_link'}).text(accountingArr[i])
     )
   .appendTo($('#accountingMenu'))      

  }		    


  let li3 = $("#tree")
   $('<ul>').attr({class:'dropdown-menu',id:"treeMenu"})
   .appendTo(li3)

   let treeArr = [
     "傳銷登錄","傳銷細目","列印圖表"
   ]

 //let treeHref = [
//"/treedata","/drawtreex","/drawtree"
//]

   let treeHref = [
     "#","agkdraw","/drawtree"
   ]

   for (let i = 0; i < treeArr.length; i++) {
    $('<li>')
    .append($('<a>').attr({href:treeHref[i],class:'episode_link'}).text(treeArr[i])
     )
    .appendTo($("#treeMenu"))      
  }       


  let li4 = $("#loto")
   $('<ul>').attr({class:'dropdown-menu',id:"lotoMenu"})
   .appendTo(li4)

   let lotoArr = [
     "大樂透","今彩539","大樂透中獎比對","今彩539中獎比對","大樂透中獎摘要","今彩539中獎摘要",
     "大樂透頭獎總摘要","今彩539頭獎總摘要","大樂透號碼摘要","今彩539號碼摘要"
   ]

   let lotoHref = [
      "/loto649","/loto539","/asloto649","/asloto539","/coloto649","/coloto539"
      ,"/suloto649","/suloto539","/preloto649","/preloto539"
   ]

   for (let i = 0; i < lotoArr.length; i++) {
    $('<li>')
    .append($('<a>').attr({href:lotoHref[i],class:'episode_link'}).text(lotoArr[i])
     )
    .appendTo($("#lotoMenu"))      
  }       

 }

})