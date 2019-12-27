		//display gallery of Nasa images
		$(function() {
		
			$("<a>").attr({id:"return",title:"返回首頁"})
			.text("\u21B6").appendTo('body');
			$("<br>").appendTo('body');

			$("#return").on("click",function() {
				$(this).attr("href","/")
			})


			$("<div>").attr("id","displaydiv").appendTo("body");
			let displaydiv = $("#displaydiv");

			$('#displaydiv').on("dblclick",".img",function(e) {
				
                console.log($(this).attr("src"));
				e.stopPropagation();
				let imgheight = $(this).css("height");
				if (imgheight === "200px") {
					 $(this).css({width: window.innerWidth,height: window.innerHeight});
					}
				else {
					$(this).css({width:200,height:200,marginLeft:10,marginTop:10});
					}
					
			})


			//displayimg(imgUrlArr);

			displayimgPromised(imgUrlArr);

			function displayimgPromised(urlarr) {

				let promisearr = urlarr.map(getimg);
				let sequence = Promise.resolve();
				promisearr.forEach(function(curpromise) {
					sequence.then(function() {
						return curpromise;
					})
					.then(function(url) {
						$("<img>").attr({src: url, class:"img"}).css({width:200,height:200,marginLeft:10,marginTop:10}).appendTo(displaydiv);
					})
					.catch(function(err) {
						console.log("loading image error!")
					})

				})
			}

			
			function displayimg(urlarr) {
				let targeturl = urlarr.shift();
				if (targeturl) {
					getimg(targeturl)
					.then(function(url) {
						//$("<img>").attr("src",url).css({width:200,height:200,marginLeft:10,marginTop:10}).appendTo(displaydiv);
						$("<img>").attr({src: url, class:"img"}).css({width:200,height:200,marginLeft:10,marginTop:10}).appendTo(displaydiv);
						displayimg(urlarr);
					})
					.catch(function(urlarr) {
						console.log("loading image error!")
					})
				}
			}
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
