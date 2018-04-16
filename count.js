const fs = require('fs');

var args = process.argv.slice(2);

if(args[0] == null) {
  console.log("Error: No file provided. Please provide the file name using a command line such as \"node count.js \"myFile.txt\"\"");
  return;
}

var filePath = "C:\\ProgramData\\Parata Systems LLC\\PASSServer\\OrderFileArchive\\";
//open json file
try {
  var filedata = fs.readFileSync(filePath + args[0], 'utf8');
} catch (e) {
  console.log("Error: ", e.stack);
}

//Loop through lines of file and load data into JSON
var lines = filedata.split('\n');
var tmp = []; //holds each individual item in a line of the file
var data = []; //JSON to load file contents to
var obj = {}; //temp objects to be placed into JSON
console.log(lines.length - 1);
for(var line = 0; line < lines.length - 1; line++) {
  tmp = lines[line].split('~');

  for(var i = 0; i < tmp.length; i++) {
    if(tmp[i] == "" || tmp[i] == null) {
      //remove empty items
      tmp.splice(i, 1);
      i--;
    }
  }

  obj.one = tmp[0];
  obj.two = tmp[1];
  obj.three = tmp[2];
  obj.four = tmp[3];
  obj.five = tmp[4];
  obj.six = tmp[5];
  obj.seven = tmp[6];
  obj.eight = tmp[7];
  obj.nine = tmp[8];
  obj.ten = tmp[9];
  obj.eleven = tmp[10];
  obj.twelve = tmp[11];
  obj.thirteen = tmp[12];
  obj.fourteen = tmp[13];
  obj.fifteen = tmp[14];
  obj.sixteen = tmp[15];
  obj.seventeen = tmp[16];
  obj.eighteen = tmp[17];
  obj.nineteen = tmp[18];
  obj.twenty = tmp[19];
  obj.twenty_one = tmp[20];
  obj.twenty_two = tmp[21];
  obj.twenty_three = tmp[22];
  obj.twenty_four = "Rx"; //tmp[23];
  /*var x = tmp[23];
  var found = false;
  var count = 0;
  for(var h = 0; h < x.length; h++) {
    if(x[h] == '\r') {
       break;
    }
    if(x[h] != '\r' && found == false) {
       count = count + 1;
    }
  }
  obj.twenty_four = x.substring(0,count);*/
  obj.twenty_five = -1;
  data.push(obj);
  tmp = [];
  obj = {};
}


//Generate counts JSON to track pill counts remaining for each drug
var counts = [];
var pillNumFound = false;
for(var i = 0; i < data.length; i++) {
  var drugID = data[i].five;
  var pillsTaken = data[i].eight;

  pillNumFound = false;
  for(var j = 0; j < counts.length; j++) {
    if(drugID == counts[j].drugID) {
      pillNumFound = true;
      counts[j].pillCount = counts[j].pillCount + Number(pillsTaken);
    }
  }

  if(pillNumFound == false) {
    var tmp = {};
    tmp.drugID = drugID;
    tmp.pillCount = Number(pillsTaken);
    tmp.pillsRemaining = -1;
    counts.push(tmp);
  }
}


//Add Count attribute to each object in data JSON and form the output file
var output = "";
for(var i = 0; i < data.length; i++) {
  for(var j = 0; j < counts.length; j++) {
    var drugID = data[i].five;
    var pills = data[i].eight;

    if(drugID == counts[j].drugID && counts[j].pillsRemaining == -1) { //first of that drug ID listed
      data[i].twenty_five = counts[j].pillCount;
      counts[j].pillsRemaining = counts[j].pillCount - pills;
    }
    else if(drugID == counts[j].drugID) {
      data[i].twenty_five = counts[j].pillsRemaining;
      counts[j].pillsRemaining = counts[j].pillsRemaining - pills;
    }
  }

  output = output + data[i].one + '~' + data[i].two
  + '~' + data[i].three + '~~' + data[i].four + '~~~'
  + data[i].five + '~' + data[i].six + '~' + data[i].seven + '~'
  + data[i].eight + '~' + data[i].nine + '~' + data[i].ten + '~~~'
  + data[i].eleven + '~' + data[i].twelve + '~' + data[i].thirteen
  + '~~' + data[i].fourteen + '~' + data[i].fifteen + '~'
  + data[i].sixteen + '~' + data[i].seventeen + '~'
  + data[i].eighteen + '~' + data[i].nineteen + '~'
  + data[i].twenty + '~~~' + data[i].twenty_one + '~'
  + data[i].twenty_two + '~~~' + data[i].twenty_three + '~'
  + data[i].twenty_four + '~' + data[i].twenty_five + '\n';

}

//console.log(JSON.stringify(data));
//console.log(output);

fs.writeFileSync(filePath + args[0], output);
console.log("Program completed running.");
