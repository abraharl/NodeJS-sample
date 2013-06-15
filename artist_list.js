/* 
 * This program is run by the command "node artist_list.js <fileName>" from the node console where <fileName> is the name of the file you want to read
 * it reads through the file grabbing each band that appears in more that 50 lists. From there it looks at each pair that appears in more than 50 lists
 * and stores them into a file call artistPairs.txt
*/

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

console.log("creating artistPairs.txt (this may take a moment)...")

var fs = require('fs'); 
var file = process.argv[2];
var text = fs.readFileSync(file, 'utf8');

var checkedArtists = '';
var artistsInLists = '';

text = text.split('\n'); 
 
for(var i = 0; i<text.length;i++){  //loop through the lists
  var artists = text[i].split(','); //each artists in the string
  for(var j = 0;j<artists.length;j++){//loop through each artist in the string
     if(checkedArtists.indexOf("_"+artists[j]+"_") != -1){ //check if we've already counted the artist, if see if it appears in at least 50 lists;
	   break;
	 }
	 else{
	   var counter = 0;
	   for(var k = 0;k<text.length;k++){ //loop through the lists
	     if(text[k].indexOf(artists[j]) != -1){counter = counter + 1;}
		   if(counter == 50){
		    if(artistsInLists == ''){artistsInLists = artists[j];}
			else{artistsInLists = artistsInLists + ',' + artists[j];}
			checkedArtists = checkedArtists + "_"+artists[j]+"_";
			break;
          }		  
		}
	  }
	}
  }
  
  artistsInLists = artistsInLists.split(',');
  var bands = '';
  for(var i = 0;i<artistsInLists.length;i++){  //loop through each pairing and lists the ones that appear at least 50 times.
	for (var j = i + 1;j<artistsInLists.length;j++){
	  var counter = 0;
	  for(var k = 0; k<text.length;k++){
		if(text[k].indexOf(artistsInLists[i]) != -1 && text[k].indexOf(artistsInLists[j]) != -1) {counter = counter + 1;}
		if(counter == 50){
		  bands = bands + artistsInLists[i] + ", " + artistsInLists[j] + "\n";
		  break;
	    }
	   }
	 }
	}
	
	fs.writeFileSync("artistPairs.txt",bands);
	console.log("...Finished creating artistPairs.txt");