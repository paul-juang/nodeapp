//display gallery of Nasa images
$(function() {
 /*
		$("body").on("dblclick",function() {
			$(this).css({"background-image" : "none"});
			$("#displaydiv").show();
		})
	*/	
		$("<a>").attr({id:"return",title:"返回首頁"})
        .text("\u21B6").appendTo('body');
        $("<br>").appendTo('body');

        $("#return").on("click",function() {
        $(this).attr("href","/")
         })




		$("<div>").attr("id","displaydiv").appendTo("body");
		let displaydiv = $("#displaydiv");

		$('#displaydiv').on("dblclick",".img",function(e) {
                e.stopPropagation();
				let backgroundimage = $(this).attr("src");

				console.log("url",backgroundimage)
				$("#displaydiv").hide();
				let url = "url("  + backgroundimage + ")";
				console.log("bckgrdimg ",url)
				$("body").css({"background-image" : url, height: 940});
			})

		//displayimg(urlarr);

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
					console.log("error")
				})

			})
		}

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
   })

