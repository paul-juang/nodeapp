get combination array





function menu6() {








	var n = [];


// var m = document.getElementById('text1').value;


// var r = document.getElementById('text2').value;


m = "111213141516171819202122";


r = 6;








for (var i = 0; i < m.length/2; i++) {


	var sub = m.substr(2*i,2);


	n.push(sub);


}


n = n.sort()





var noArray = k_combinations(n,r);





n= n.join();





var theader = "


";


theader += "";





theader += "


";


theader += "


";


theader += "


";


var tbody = "";


for (i=0; i < noArray.length; i++) {


	var member = noArray[i];


	member = member.join(" ");


	tbody += "


	";


	tbody += "


	"


	tbody += "


	";


}


var tfooter = "


"+ n + "\u00A0" +"\u00A0"+ " Total = " + noArray.length + "


";


tbody += member;


tbody += "


";+"


"


document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;











} // mynmFuctionh











function menu5() {








	var n = [];


// var m = document.getElementById('text1').value;


// var r = document.getElementById('text2').value;


m = "01020304050607080910";


r = 5;








for (var i = 0; i < m.length/2; i++) {


	var sub = m.substr(2*i,2);


	n.push(sub);


}


n = n.sort()





var noArray = k_combinations(n,r);





n= n.join();





var theader = "


";


theader += "";





theader += "


";


theader += "


";


theader += "


";


var tbody = "";


for (i=0; i < noArray.length; i++) {


	var member = noArray[i];


	member = member.join(" ");


	tbody += "


	";


	tbody += "


	";


}


var tfooter = "


"+ n + "\u00A0" +"\u00A0"+ " Total = " + noArray.length + "


";


tbody += member;


tbody += ""


tbody += "


";+"


"


document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;











} // mynmFuctionh











//input set=111213,k=2


// return [[11,12],[11,13],[12,13]]





function getCombinations(set, k) {


	var i, j, combs, head, tailcombs;





	if (k > set.length || k <= 0) {


		return [];


	}





	if (k == set.length) {


		return [set];


	}





	if (k == 1) {


		combs = [];


		for (i = 0; i < set.length; i++) {


			combs.push([set[i]]);


		}


		return combs;


	}





// Assert {1 < k < set.length}





combs = [];


for (i = 0; i < set.length - k + 1; i++) {


	head = set.slice(i, i+1);


	tailcombs = k_combinations(set.slice(i + 1), k - 1);


	for (j = 0; j < tailcombs.length; j++) {


		combs.push(head.concat(tailcombs[j]));


	}


}





return combs;


}




















//get status report by lotto-number file





function menu4() {


	var mtext,msub,mindex,tempStr,newstr,i,k,member;


	var tempArray = [];


	var dataArray = [];


	var xmlhttp=new XMLHttpRequest();


	xmlhttp.open("GET","paulData6.data",false);


	xmlhttp.send();


	mtext =xmlhttp.responseText;


	tempArray = mtext.split("\n");


//var regex = /\d\d\s+\,\s+\d\d\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d/; //for 5 numbers


var regex = /\d\d\s+\,\s+\d\d\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d/;





for (var i = 0; i < tempArray.length; i++) {


	var str = tempArray[i];


var arr = str.match(regex); //match return array


str = arr[0];


str = str.replace(/\s\,\s|\s/g, "");


tempArray[i] = str;    


}





//get first 100 from tempArray





for (var i = 0; i < 100; i++) {


	dataArray.push(tempArray[i]);





	


}








var combs = "010203040506070809101112131415161718192021222324252627282930"


combs = combs + "31323334353637383940414243444546474849";


var i,j,noi,nnj,cj,x,cx,no,noi,mdata;


var diff,max,pa,cpa,ave,cave,counter,lastshow;


var col1Array,col2Array,col3Array,col4Array;


//get col1Array


col1Array = [];


for (i = 0; i < combs.length/2; i++) {


	noi = combs.substr(2*i, 2);


	col1Array.push(noi);


}


//get co21Array,co31Array


col2Array = [];


col3Array = [];


for (x = 0; x < combs.length/2; x++) {


	nox = combs.substr(2*x, 2)





	counter = 0;


	lastshow = 0


	for (i = 0; i < dataArray.length; i++) {


		mdata = dataArray[i];


		for (j = 0; j < mdata.length/2; j++) {


			noj = mdata.substr(2*j, 2);


			if (nox==noj){


				counter++;


				lastshow = i+1;


			}    


} //for j


}//for i


col2Array.push(counter);


col3Array.push(lastshow);


}//for x








//get Average probablities pa


col4Array = [];


x = 1/(1/39+1/38+1/37+1/36+1/35);


max = dataArray.length + 1 //total record + 1


ave = max/x //aveg.num of time in max


cave = ave.toString();


cave = cave.substr(0, 5);


for (i = 0; i < col2Array.length; i++) {


	counter = col2Array[i];


	diff = ave-counter;


/* if(diff < 0) {


diff = 0;


}


*/


x = 1/39+1/38+1/37+1/36+1/35;


pa = diff * x * 100


/*


if (pa>0&&pa<100) {


var cpa = pa.toString();


}


else {


    cpa = "0.000";


}


if (pa>=100) {


var cpa = "100.0";


}


*/





col4Array.push(pa);


}





//get col5Array by calculating probabilities


var totalRecord,noShow,lastShow,consP


col5Array = [];


totalRecord = dataArray.length + 1;


consP = 1-(1/39+1/38+1/37+1/36+1/35);


for (i = 0; i < col3Array.length; i++) {


	lastShow = col3Array[i];


	noShow = totalRecord - lastShow;


	p = Math.pow(consP,noShow);


	p = (1 - p)* 100;


	col5Array.push(p);


}





//table report


//get table html first row as header


var theader = "


";


theader += "";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";





//get table body


var tbody = "";


for (i=0; i < combs.length/2; i++) {


	counter = col2Array[i];


	lastshow = col3Array[i];


	pa = col4Array[i];


	cpa = pa.toString();


	cpa= cpa.substr(0,6);





	p = col5Array[i];


	cp = p.toString();


	cp= cp.substr(0,6);





	no = combs.substr(2*i, 2);


	tbody += "


	";


	tbody += "


	";


}


var tfooter = "


" + "Number" + "    " + "Actual====>Average" + "    " + "Last Record" + "    " + "ProbabilityA(%)" + "    " + "ProbabilityN(%)" + "


";


tbody += no;


tbody += "";


tbody += "


";


tbody += counter + "====>"+cave


tbody += "";


tbody += "


";


tbody += lastshow;


tbody += "";


tbody += "


";


tbody += cpa;


tbody += "";


tbody += "


";


tbody += cp;


tbody += "";


tbody += "


" +"


";


document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;


} //myFunction


























//get status report by lotto-number file





function menu3() {


	var mtext,msub,mindex,tempStr,newstr,i,k,member;


	var tempArray = [];


	var dataArray = [];


	var xmlhttp=new XMLHttpRequest();


	xmlhttp.open("GET","paulData5.data",false);


	xmlhttp.send();


	mtext =xmlhttp.responseText;


	tempArray = mtext.split("\n");


var regex = /\d\d\s+\,\s+\d\d\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d/; //for 5 numbers


//var regex = /\d\d\s+\,\s+\d\d\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d\s+\,\s+\d\d/;





for (var i = 0; i < tempArray.length; i++) {


	var str = tempArray[i];


var arr = str.match(regex); //match return array


str = arr[0];


str = str.replace(/\s\,\s|\s/g, "");


tempArray[i] = str;    


}





//get first 100 from tempArray





for (var i = 0; i < 100; i++) {


	dataArray.push(tempArray[i]);


	


}








var combs = "010203040506070809101112131415161718192021222324252627282930313233343536373839";


var i,j,noi,nnj,cj,x,cx,no,noi,mdata;


var diff,max,pa,cpa,ave,cave,counter,lastshow;


var col1Array,col2Array,col3Array,col4Array;


//get col1Array


col1Array = [];


for (i = 0; i < combs.length/2; i++) {


	noi = combs.substr(2*i, 2);


	col1Array.push(noi);


}


//get co21Array,co31Array


col2Array = [];


col3Array = [];


for (x = 0; x < combs.length/2; x++) {


	nox = combs.substr(2*x, 2)





	counter = 0;


	lastshow = 0


	for (i = 0; i < dataArray.length; i++) {


		mdata = dataArray[i];


		for (j = 0; j < mdata.length/2; j++) {


			noj = mdata.substr(2*j, 2);


			if (nox==noj){


				counter++;


				lastshow = i+1;


			}    


} //for j


}//for i


col2Array.push(counter);


col3Array.push(lastshow);


}//for x








//get Average probablities pa


col4Array = [];


x = 1/(1/39+1/38+1/37+1/36+1/35);


max = dataArray.length + 1 //total record + 1


ave = max/x //aveg.num of time in max


cave = ave.toString();


cave = cave.substr(0, 5);


for (i = 0; i < col2Array.length; i++) {


	counter = col2Array[i];


	diff = ave-counter;


/* if(diff < 0) {


diff = 0;


}


*/


x = 1/39+1/38+1/37+1/36+1/35;


pa = diff * x * 100


/*


if (pa>0&&pa<100) {


var cpa = pa.toString();


}


else {


    cpa = "0.000";


}


if (pa>=100) {


var cpa = "100.0";


}


*/





col4Array.push(pa);


}





//get col5Array by calculating probabilities


var totalRecord,noShow,lastShow,consP


col5Array = [];


totalRecord = dataArray.length + 1;


consP = 1-(1/39+1/38+1/37+1/36+1/35);


for (i = 0; i < col3Array.length; i++) {


	lastShow = col3Array[i];


	noShow = totalRecord - lastShow;


	p = Math.pow(consP,noShow);


	p = (1 - p)* 100;


	col5Array.push(p);


}





//table report


//get table html first row as header


var theader = "


";


theader += "";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";





//get table body


var tbody = "";


for (i=0; i < combs.length/2; i++) {


	counter = col2Array[i];


	lastshow = col3Array[i];


	pa = col4Array[i];


	cpa = pa.toString();


	cpa= cpa.substr(0,6);





	p = col5Array[i];


	cp = p.toString();


	cp= cp.substr(0,6);





	no = combs.substr(2*i, 2);


	tbody += "


	";


	tbody += "


	";


}


var tfooter = "


" + "Number" + "    " + "Actual====>Average" + "    " + "Last Record" + "    " + "ProbabilityA(%)" + "    " + "ProbabilityN(%)" + "


";


tbody += no;


tbody += "";


tbody += "


";


tbody += counter + "====>"+cave


tbody += "";


tbody += "


";


tbody += lastshow;


tbody += "";


tbody += "


";


tbody += cpa;


tbody += "";


tbody += "


";


tbody += cp;


tbody += "";


tbody += "


" +"


";


document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;


} //myFunction


























//play six-number lotto








//play six-number lotto


function getLotto6() {


	var num = getRanNum6();


	for (var i = 0; i < num.length; i++) {


		if (num[i] < 10) {


			num[i] = "0" + num[i]      


		}


		else {


			num[i] = num[i].toString();


		}    


	}


	var cnum = num.join("");


	return cnum;


}








function getLotto7() {


	var match = 0,num7th = 0;


	var num = getRanNum6();


	for (var i = 1; i < 50; i++) {


		num7th = i;


		for (var j = 0; j < num.length; j++) {


			if (num[j] == num7th) {


				match = 1;      


			}      


		}


		if (!match) {


			num.push(num7th);


			break;


		}


	}


	for (var i = 0; i < num.length; i++) {


		if (num[i] < 10) {


			num[i] = "0" + num[i]  


			


		}


		else {


			num[i] = num[i].toString();


		}    


	}


	var cnum = num.join("");


	return cnum;


}











function menu2() {


	"use srict";


	var max = 0;


	var luckyNums = "";


	var luckyNumArray = [];


	max= document.getElementById('text2').value;


	luckyNums= document.getElementById('text1').value;


// document.getElementById('myTextBox11').value = "";


// document.getElementById('myTextBox12').value = "";





//get luckyNumArray


//luckyNumsfrom user's input,converted to luckytemp array





var i,luckyno,luckytemp,luckystring;


luckytemp=[];


luckystring="";


for (i = 0; i < luckyNums.length/2; i++) {


	luckyno = luckyNums.substr(2*i, 2);


	luckytemp.push(luckyno);


}


var n = luckytemp.sort(); //n=[01.02,03...49] as frist


var r = 6; //constant second parameter of k_combination


var luckyNumsArray = k_combinations(n,r);


//luckyNumbsArray =[[010203040506]...[44,45,46,47,48,49]]








// get dataArray max number of six-number


var dataArray = [];


var winArray= [];


var winTemp= [];


var noString = [];


var numbers = [];


var x = 1;


while (x <= max){


	noString = [];


	numbers = getRanNum6();


	for (var i = 0; i < numbers.length; i++) {


		if(numbers[i] <= 9) {


			numbers[i] = "0" +


numbers[i]; //convert123...9 to 010203...09


}


noString.push(numbers[i]);


}


dataArray.push(noString);


x++;


}





//get winArray winArray[0]=luckyNum,winArray[1]=lottoNum


//winArray[3]=counter





var i,j,k,counter,luckyno,lottoNums,lottono;


var luckynumSub,luckytemp,lottotemp;


for (x= 0; x < luckyNumsArray.length; x++) {


	luckyNumSub = luckyNumsArray[x];


	luckyNums = luckyNumSub.join("");


	for (i = 0; i < dataArray.length; i++) {


		lottoNums = dataArray[i];


		lottono = lottoNums.join("");


		counter = 0;


		for (j = 0; j < luckyNums.length/2; j++) {


			luckytemp = luckyNums.substr(2*j,2);


			for (k= 0; k


				lottotemp = lottono.substr(2*k,2);





				if (luckytemp==lottotemp) {


					counter++;


} //if


    } //for k


    } //for j      


    wintemp = [];


    wintemp.push(luckyNums);


    wintemp.push(lottono);


    wintemp.push(counter);


    winArray.push(wintemp);


} //for i


} //for x





// reformat luckyNums and lotto, seperate number with " "


var wintemp1,wintemp2,wintemp3,tempstr1,tempstr2,ccounter;


var win2 = 0;


var win3 = 0;


var win4 = 0;


var win5 = 0;


var win6 = 0;





var wincount = 0


for (i = 0; i


	wintemp = winArray[i];


wintemp1 = wintemp[0]; //1st element of wintemp[]luckyNum


tempstr1 ="";


for (k = 0; k


	tempstr1 += wintemp1.substr(2*k, 2) + " ";      


}


tempstr1 = tempstr1.trim();





wintemp2 = wintemp[1]; //2nd element of wintemp[]lottono


tempstr2 ="";


for (k = 0; k


	tempstr2 += wintemp2.substr(2*k, 2) + " ";      


}


tempstr2= tempstr2.trim();





wintemp3 = wintemp[2]; //3rd element of wintemp[]counter


switch (wintemp3) {


	case 2:


	win2++;


	break;


	case 3:


	win3++;


	break;


	case 4:


	win4++;


	break;


	case 5:


	win5++;


	case 6:


	win6++;


	break;


}


ccounter = wintemp3.toString();


wintemp = [];


wintemp.push(tempstr1); //luckyNums seperated with " "


wintemp.push(tempstr2); //lottono seperated with " "


wintemp.push(ccounter); //counter


winArray[i] = wintemp;





}











//table report


//get table html first row as header


var totalplay = luckyNumsArray.length*dataArray.length;


var theader = "


";


theader += "";


var ccaption = "Total Play: "+totalplay+ "\u00A0"+


"\u00A0"+"\u00A0" +"Win2: "+win2+ "\u00A0"+"\u00A0"+"\u00A0"+ "Win3: " + win3;


ccaption = ccaption + "\u00A0"+ "\u00A0"+"\u00A0" +"Win4: " + win4 + "\u00A0"+ "\u00A0"+"\u00A0" +"Win5: " + win5+ "\u00A0"+ "\u00A0"+"\u00A0" +"Win6: " +win6;


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


var tbody = "";


var col1,col2,col3;


for (i = 0; i < winArray.length; i++) {


	col1="";


	col2="";


	col3=0;


	wintemp = winArray[i];


	col1 = wintemp[0];


	col2 = wintemp[1];


	col3 = wintemp[2];





//get table body


tbody += "


";


tbody += "


";


}


var tfooter = "


" + ccaption + "


" + "Your Lucky Number" + "    " + "Winning Lotto Number" + "    " + "Win Number" + "


";


tbody += col1;


tbody += "";


tbody += "


";


tbody += col2;


tbody += "";


tbody += "


";


tbody += col3;


tbody += "";


tbody += "


" +"


";


document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;





} //menu2





function getRanNum6() {


	var n = [];


	for (var i = 1; i < 50; i++) {


		n.push(i);


	}


	while (n.length > 6) {


		n.splice(Math.floor(Math.random() * n.length), 1);


	}


	return n;


}





function getRanNum6() {


	var n = [];


	for (var i = 1; i < 50; i++) {


		n.push(i);


	}


	while (n.length > 6) {


		n.splice(Math.floor(Math.random() * n.length), 1);


	}


	return n;


}




















//


function getLucky5() {


	var num = getRanNum5();


	for (var i = 0; i < num.length; i++) {


		if (num[i] < 10) {


			num[i] = "0" + num[i]      


		}


		else {


			num[i] = num[i].toString();


		}    


	}


	var cnum = num.join("");


	return cnum;


}








function getLucky6() {


	var match = 0,num6th;


	var num = getRanNum5();


	for (var i = 1; i < 40; i++) {


		num6th = i;


		for (var j = 0; j < num.length; j++) {


			if (num[j] == num6th) {


				match = 1;      


			}      


		}


		if (!match) {


			num.push(num6th);


			break;


		}


	}


	for (var i = 0; i < num.length; i++) {


		if (num[i] < 10) {


			num[i] = "0" + num[i]      


		}


		else {


			num[i] = num[i].toString();


		}    


	}


	var cnum = num.join("");


	return cnum;


}





function menu1() {





	var max =0;


	var luckyNums = "";


	max= document.getElementById('text2').value;


	luckyNums= document.getElementById('text1').value;


//document.getElementById('text1').value = "";


//document.getElementById('text1').value = "";





//get luckyNumArray


//luckyNumsfrom user's input,converted to luckytemp array





var i,luckyno,luckytemp,luckystring;


luckytemp=[];


luckystring="";


for (i = 0; i < luckyNums.length/2; i++) {


	luckyno = luckyNums.substr(2*i, 2);


	luckytemp.push(luckyno);


}


var n = luckytemp.sort(); //n=[01.02,03...39] as frist


var r = 5; //constant second parameter of k_combination


var luckyNumsArray = k_combinations(n,r);


//luckyNumbsArray =[[0102030405],[0102030406][3536373839]]








// get dataArray


var dataArray = [];


var winArray= [];


var winTemp= [];


var x = 1;


var noString = [];


var numbers = [];


while (x <= max){


	noString = [];


	numbers = getRanNum5();


	for (var i = 0; i < numbers.length; i++) {


		if(numbers[i] <= 9) {


			numbers[i] = "0" +


numbers[i]; //convert123...9 to 010203...09


}


noString.push(numbers[i]);


}


dataArray.push(noString);


x++;


}





//get winArray





var i,j,k,counter,luckyno,lottoNums,lottono;


var luckynumSub,luckytemp,lottotemp;


for (x= 0; x < luckyNumsArray.length; x++) {


	luckyNumSub = luckyNumsArray[x];


	luckyNums = luckyNumSub.join("");     


	for (i = 0; i < dataArray.length; i++) {


		lottoNums = dataArray[i];


		lottono = lottoNums.join("");


		counter = 0;


		for (j = 0; j < luckyNums.length/2; j++) {


			luckytemp = luckyNums.substr(2*j,2);


			for (k= 0; k


				lottotemp = lottono.substr(2*k,2);


				if (luckytemp==lottotemp) {


					counter++;


} //if


    } //for k


    } //for j


    wintemp = [];


    wintemp.push(luckyNums);


    wintemp.push(lottono);


    wintemp.push(counter);


    winArray.push(wintemp);


} //for i


} //for x





// reformat luckyNums and lotto, seperate number with " "


var wintemp1,wintemp2,wintemp3,tempstr1,tempstr2,ccounter;


var win2 = 0;


var win3 = 0;


var win4 = 0;


var win5 = 0;


var wincount = 0


for (i = 0; i


	wintemp = winArray[i];


wintemp1 = wintemp[0]; //1st element of wintemp[]luckyNum


tempstr1 ="";


for (k = 0; k


	tempstr1 += wintemp1.substr(2*k, 2) + " ";      


}


tempstr1 = tempstr1.trim();





wintemp2 = wintemp[1]; //2nd element of wintemp[]lottono


tempstr2 ="";


for (k = 0; k


	tempstr2 += wintemp2.substr(2*k, 2) + " ";      


}


tempstr2= tempstr2.trim();





wintemp3 = wintemp[2]; //3rd element of wintemp[]counter


switch (wintemp3) {


	case 2:


	win2++;


	break;


	case 3:


	win3++;


	break;


	case 4:


	win4++;


	break;


	case 5:


	win5++;


	break;


}


ccounter = wintemp3.toString();


wintemp = [];


wintemp.push(tempstr1); //luckyNums seperated with " "


wintemp.push(tempstr2); //lottono seperated with " "


wintemp.push(ccounter); //counter


winArray[i] = wintemp;





}





//table report


//get table html first row as header


var totalplay = luckyNumsArray.length*dataArray.length;


var theader = "


";


theader += "";


var ccaption = "Total Play: "+totalplay+ "\u00A0"+


"\u00A0"+"\u00A0" +"Win2: "+win2+ "\u00A0"+"\u00A0"+"\u00A0"+ "Win3: " + win3;


ccaption = ccaption + "\u00A0"+ "\u00A0"+"\u00A0" +"Win4: " + win4 + "\u00A0"+ "\u00A0"+"\u00A0" +"Win5: " + win5;


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


theader += "


";


var tbody = "";


var col1,col2,col3;


for (i = 0; i < winArray.length; i++) {


	col1="";


	col2="";


	col3=0;


	wintemp = winArray[i];


	col1 = wintemp[0];


	col2 = wintemp[1];


	col3 = wintemp[2];





//get table body


tbody += "


";


tbody += "


";


}


var tfooter = "


" + ccaption + "


" + "Your Lucky Number" + "    " + "Winning Lotto Number" + "    " + "Win" + "


";


tbody += col1;


tbody += "";


tbody += "


";


tbody += col2;


tbody += "";


tbody += "


";


tbody += col3;


tbody += "";


tbody += "


" +"


";


document.getElementById('wrapper2').innerHTML = theader + tbody + tfooter;





} //myFunction











function getRanNum5() {


	var n = [];


	for (var i = 1; i < 40; i++) {


		n.push(i);


	}


	while (n.length > 5) {


		n.splice(Math.floor(Math.random() * n.length), 1);


	}


	return n;


}








function k_combinations(set, k) {


	var i, j, combs, head, tailcombs;





	if (k > set.length || k <= 0) {


		return [];


	}





	if (k == set.length) {


		return [set];


	}





	if (k == 1) {


		combs = [];


		for (i = 0; i < set.length; i++) {


			combs.push([set[i]]);


		}


		return combs;


	}





// Assert {1 < k < set.length}





combs = [];


for (i = 0; i < set.length - k + 1; i++) {


	head = set.slice(i, i+1);


	tailcombs = k_combinations(set.slice(i + 1), k - 1);


	for (j = 0; j < tailcombs.length; j++) {


		combs.push(head.concat(tailcombs[j]));


	}


}





return combs;


}
