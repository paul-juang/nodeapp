//draw tree layout for server.js - treeData.json
$(function(){

   $("<a>").attr({id:"return",title:"返回首頁"})
    .css({color: "rgb(0,0,255)"})
    .text("\u21B6").appendTo('body');
    $("#return").on("click",function() {
      $(this).attr("href","/")
    })

      var outerwidth = 960 + 1100,  //+900 -860 = 40
          outerheight = 500 + 1040,  //+860 ideal for print
          margin = {top: 20, right: 280, bottom: 20, left: 280},
          width = outerwidth - margin.right - margin.left,
          height = outerheight - margin.top - margin.bottom,             
          treewidth = height ;
          treeheight = width ;


      var svg = d3.select("body").append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
             

      var tree = d3.layout.tree()
                    .size([treewidth, treeheight]);

      d3.json("treeData.json",function(jsonArr){    //same as $.getJSON

        var data = getNestedChildren(jsonArr, "0");

        var root = data[0];

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

            nodes.append("text")          
                 //.attr("y", 20 / 2)    //rec height/2
                 .attr("y", rect.attr("height") / 2)    //rect height/2
                 .attr("dy", ".35em")
                 .attr("stroke", function(d) { return "none";})
                                 // .attr("stroke", function(d) { return d.idx ? "#FF00CC" : "none";})

                 .text(function(d) { return d.name; });
                                  //.text(function(d) { return d.idx || d.name; });

 

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


       function getNestedChildren(arr, parent) {
          var out = [];
          for(var i in arr) {
            if(arr[i].parent == parent) {
              var children = getNestedChildren(arr, arr[i].name)             
              if(children.length) {
                arr[i].children = children
              }
              out.push(arr[i])
            }
          }
          return out
      } //end of getChildren


})

