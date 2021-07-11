const https = require("https")

const Stream = require("stream").Transform

const fs = require("fs")
let url = "https://apod.nasa.gov/apod/image/1912/AS17-149-22859-2v2SmlWmk.jpg";
let regx = /(\/(\w+)-?(\w+)-?(\w+)-?(\w+)\.(jpg|png|gif)$)/
let fname = url.match(regx)
if (fname) console.log(fname[0])
    else  return console.log("no match", url)
let jpg = fname[0]
https.get(url, res => {
	
	let img = new Stream()

	res.on("data", chunk => {
		img.push(chunk)
	})

	res.on("end", () => {
		//let filename = __dirname + "/apod.jpg" 
		let filename = __dirname + "/public/images"+ jpg
		fs.writeFileSync(filename, img.read())
	})
})
.on("error", err => {
    console.log("error: " + err.message)
  }) 
  	    	