//draw tree by name
$(function() {


  $('table').hide();

$("<a>").attr({id:"return",title:"返回首頁"})
    .css({color: "rgb(0,0,255)"})
    .text("\u21B6").appendTo('body');

 $("#return").on("click",function() {
      $(this).attr("href","/")
    })

  // Get data from server
  $('#get-button').on('click', function() {

    
  $('table').show();
  $('#get-button').hide();

    $.ajax({
      url: '/getdata',  
      contentType: 'application/json',
      success: function(response) {
            var tbodyEl = $('tbody');
                tbodyEl.html('');

            //populate tbody
            response.treedatas.forEach(function(treedata) {
              $("<tr>")
              .append($("<td>").attr({class:"name"}).css({width:260}).text(treedata.name))             
              .append($("<td>").attr({class:"parent"}).css({width:260}).text(treedata.parent))             
              .append($("<td>").attr({class:"idx"}).css({width:260}).text(treedata.idx))    
              .append($("<td>")
                .append($("<button>").attr({class:"draw-button btn btn-primary"}).text("按球號列印安置"))
                )        
              .appendTo($('tbody'))

              }); //end of forEach 

           } //sucess function

        }); //end of ajax

    }); //end of onclick


    // find contents on the row and send to server for update   
    $('table').on('click', '.draw-button', function() {
      let bodyEl = $('body');
          bodyEl.css("margin",-12).html('');

      let rowEl = $(this).closest('tr');      
      let name = rowEl.find('.name').text();

      $.ajax({
              url: '/drawtreex/' + name,  
              contentType: 'application/json',
              success: function(response) {
                   console.log(response);
                   drawtreex();
               } //sucess function

      }); //end of ajax

     }); //end of onlick

 
    function drawtreex() {


   $("<a>").attr({id:"return",title:"返回首頁"})
    .css({color: "rgb(0,0,255)"})
    .text("\u21B6").appendTo('body');
    $("#return").on("click",function() {
      $(this).attr("href","/")
    })

      var outerwidth = 960,  //+900 -860 = 40
          outerheight = 500, //+860 ideal for print
          margin = {top: 20, right: 280, bottom: 20, left: 280},
          width = outerwidth - margin.right - margin.left,
          height = outerheight - margin.top - margin.bottom,
          treewidth = height,
          treeheight = width ;
  
      var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
             
      var tree = d3.layout.tree()
                    .size([treewidth, treeheight]);

      d3.json("testDatax.json",function(jsonArr){    //same as $.getJSON
        var data = makeTree(jsonArr, "0");
        var root = data[0];      
console.log(data)

// ************** Generate the tree diagram    *****************
        var nodes = tree.nodes(root); // create data nodes suitable for tree structure
        var links = tree.links(nodes); // create links to connect source(parent) and target(child) nodes

        var nodes = svg.selectAll(".node")
                        .data(nodes).enter()
                        .append("g")
                        .attr("class", "node")
                        .attr("transform", function(d){ return "translate(" + d.x + "," + d.y+ ")"; }); // ****vertical line 1/2****
                        //.attr("transform", function(d){ return "translate(" + d.y + "," + d.x + ")"; }); // flip x and y of nodes 1/2***

        var rect = nodes.append("rect")
                        .attr("width", 40)
                        .attr("height", 20);                 

        var text = nodes.append("text")          
                         //.attr("y", 20 / 2)    //rec height/2
                         .attr("y", rect.attr("height") / 2)    //rect height/2
                         .attr("stroke", function(d) { return "none";})
                         .attr("dy", ".35em")
                         .text(function(d) { return d.name; });
 

        var links =  svg.selectAll(".link")
                        .data(links);        //bind data

            links.enter().append("line")   //enter 
                         .attr("class", "link");

            links.attr('x1', function(d){return d.source.x+20})  //update
                 .attr('y1', function(d){return d.source.y+20})  //rect.height = 20
                 .attr('x2', function(d){return d.target.x+20})  //rect.width/2 = 20
                 .attr('y2', function(d){return d.target.y});
              
  });  //end of getJson


      function makeTree(arr,parent){
       var node = [];
       arr.filter(function(line) {return line.parent == parent})
          .forEach(function(line){  //get children for each obj of arr
             var children = makeTree(arr,line.name);           
             if (children.length) {
               line.children = children;
             }
             node.push(line)  //push the obj of arr with parent: "0"
          })
        return node;
      }
      
  } //end of drawtreex

}); //end of (function())

