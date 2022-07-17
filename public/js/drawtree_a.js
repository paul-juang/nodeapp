
//for app.js
$(function() {


	$.getJSON('myjsonfile.json',function(jsonArr){


		var margin = {top: 20, right: 280, bottom: 20, left: 280},


		width = 960 - margin.right - margin.left,


		height = 500 - margin.top - margin.bottom;


		var data = getNestedChildren(jsonArr, "0"); //return an arr of dne object


		var root = data[0];


// ************** Generate the tree diagram    *****************


    var tree = d3.layout.tree()

    .size([height, width]);


    var svg = d3.select("body").append("svg")

    .attr("width", width + margin.right + margin.left)

    .attr("height", height + margin.top + margin.bottom)

    .append("g")

    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var nodes = tree.nodes(root) // create data nodes suitable for tree structure

    var links = tree.links(nodes); // create links to connect source(parent) and target(child) nodes

    var nodes = svg.selectAll(".node")

    .data(nodes).enter()

    .append("g")

    .attr("class", "node")

    .attr("transform", function(d){ return "translate(" + d.x + "," + d.y+ ")"; }); // ****vertical line 1/2****


      // .attr("transform", function(d){ return "translate(" + d.y + "," + d.x + ")"; }); // flip x and y of nodes 1/2***



/*
  nodes.append("circle")

       .attr("r", 12)
 
       .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
       */



       nodes.append("rect")

       .attr("width", 40)
       .attr("height", 20);

       
       nodes.append("text")     

       .attr("y", 20 / 2)
       .attr("dy", ".35em")
       .attr("stroke", function(d) { return d.idx ? "#FF00CC" : "none";})
       .text(function(d) { return d.idx || d.name; });


       svg.selectAll(".link")
       
       .data(links).enter()                    //****vertical line 2/2****
       .append("line")
       .attr("class", "link")
       .attr('x1', function(d){return d.source.x+18})
       .attr('y1', function(d){return d.source.y+20})
       .attr('x2', function(d){return d.target.x+18})
       .attr('y2', function(d){return d.target.y});




/*
  svg.selectAll(".link")               //****flip x and y of nodes 2/2********

  .data(links).enter()
      .append("line")
      .attr("class", "link")
      .attr('x1', function(d){return d.source.y})
      .attr('y1', function(d){return d.source.x})
      .attr('x2', function(d){return d.target.y})
      .attr('y2', function(d){return d.target.x});

      */


	});  //end of getJson


	function getNestedChildren(arr, parent) {


		var out = []


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



});  //end of $(function)