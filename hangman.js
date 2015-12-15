
$(document).ready(function(){

var wordsArray = ["Microsoft", "Apple", "Hewlett Packard", "Google", "Intel", "Cisco Systems", "Oracle", "Gilead Sciences", "eBay", "Synnex", "Facebook", "Applied Materials", "SanDisk", "Symantec", "NetApp", "VMWare", "Netflix", "Salesforce", "Nvidia", "Yahoo", "Adobe Systems", "LinkedIn", "Twitter", "GoPro", "Zynga", "Yelp", "Chegg", "Solarcity", "Sprig", "Theranos", "SpaceX", "Munchery", "Okta", "Mulesoft", "Captionly", "JoinedApp", "TownHound", "Mindly", "JetInsight", "Tinder", "Bumble", "Duo Security", "Cloudera", "Jawbone", "Medallia", "Pinterest", "Dropbox", "Airbnb", "Kabam", "AppDynamics", "Credit Karma", "MongoDB", "Okta", "Palantir", "Twilio", "AppNexus", "Uber", "Eventbrite", "Zuora", "Gilt Groupe", "DocuSign", "MediaMath", "ZScale", "Pinterest", "Glassdoor", "ZocDoc", "Zenefits", "Chipmunk", "Weebly", "Final", "Unbabel", "FrontApp", "Sliced Investing", "Move Loot", "Estimote", "Bumble", "Dr Chrono", "DoorDash", "Homejoy", "Product Hunt", "ZenPayroll", "Mattermark", "FlightCar", "LendUp", "LE TOTE", "Stripe", "iCracked", "Genius", "Airware", "Clustrix", "Instacart", "Coinbase", "Quora", "Codecademy", "E la Carte", "Scripd", "WePay", "Optimizely", "Tilt", "PagerDuty", "FutureAdvisor", "Interana", "Matterport", "HackerRank", "Kamcord", "FiveStars", "Sift Science", "Sirum", "Bluesmart", "Shift Messenger", "Paperspace", "Magic", "Dealyze", "Treeline", "Qualcomm", "Oracle", "Broadcom", "IBM", "Amazon", "Genesys", "Interactive Intelligence", "Mindbody", "Zillow", "Snapchat"];

// Note: inclusive - includes min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get random word. Inclusive. So max should be n-1 for last element of words array.
function getRandomWord(min, max) {
  var randomNumber = getRandomNumber(min, max);
  var word = wordsArray[randomNumber];
  return word;
}

var word = getRandomWord(0,123);
console.log("word is", word);
var wordAsArrayOfChar = word.split("");
// Use .slice() to get a copy of array. Otherwise will be a reference to wordsArrayOfChar. If change solutionsArray will change wordAsArrayOfChar
var solutionArray = wordAsArrayOfChar.slice();
var wordForComparison = word.replace(" ", "   ");
var charactersUsed = "";
var wrongCharacters = "";

solutionArray.forEach(function(item, i) {

if (item == " ")
solutionArray[i] = " - ";
else
solutionArray[i] = " _ ";
 });

$('.hangman').append('<div>What is the word?</div>');

var startingSolution= solutionArray.join(" ");

$('#answer').append('<div>The word: '+startingSolution+'</div>');

var solutionDisplay = "";
var solution = "";
var wrongLetterCounter = 0;
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
ctx.beginPath();
var letterFlag = false;

$('#textInput').keypress(function( event ) {
  if ( event.which == 13 ) {
     event.preventDefault();
  }

var letter = String.fromCharCode(event.keyCode);
letterFlag = false;

 if(charactersUsed.includes(letter)||charactersUsed.includes(letter.toUpperCase())) {
   console.log("already entered this letter!");

 document.body.style.backgroundColor='red';

setTimeout(function(){
document.body.style.backgroundColor='white';
  },100);

   return;
}
  else {
    charactersUsed += letter;
    console.log("characters used", charactersUsed);
  }


wordAsArrayOfChar.forEach(function(item,i){
if(wordAsArrayOfChar[i].toLowerCase()==letter){
  solutionArray[i] = wordAsArrayOfChar[i].toUpperCase()==wordAsArrayOfChar[i] ?
letter.toUpperCase():letter;
letterFlag = true;
}

});

if(letterFlag===false) {
wrongLetterCounter++;
wrongCharacters += letter;
console.log("wrong char", wrongCharacters);

switch(wrongLetterCounter) {
    case 1:
      ctx.moveTo(70,100);
      ctx.lineTo(20,100);
      break;
    case 2:
      ctx.lineTo(20,20);
      break;
    case 3:
      ctx.lineTo(100,20);
      ctx.moveTo(80,20);
      ctx.lineTo(80,35);
      ctx.closePath();
      break;
    case 4:
      ctx.beginPath();
      ctx.arc(80,40,5,0,2*Math.PI);
      ctx.moveTo(80,45);
      break;
    case 5:
      ctx.lineTo(80,60);
      ctx.moveTo(80,55);
      break;
    case 6:
      ctx.lineTo(70,40);
      ctx.moveTo(80,55);
      break;
    case 7:
      ctx.lineTo(90,40);
      ctx.moveTo(80,60);
      break;
    case 8:
      ctx.lineTo(70,70);
      ctx.moveTo(80,60);
      break;
    case 9:
      ctx.lineTo(90,70);
      break;
    default:
      console.log("YouLose");
      $('.hangman').append('<div id="win" height=20px width=100px style="color:red;background-color:purple;">YOU LOSE</div>');
$("#win").animate({
        left: '250px',
        height: '+=150px',
        width: '+=150px'
    });
      break;
}
ctx.stroke();
}

solutionDisplay = solutionArray.join(" ");

solution = solutionArray.join("");
solution = solution.replace("-"," ");

if(solution == wordForComparison) {
    console.log("YOU WIN");
    $('.hangman').append('<div id="win" height=20px width=100px style="color:red;background-color:yellow;">YOU WIN</div>');

$("#win").animate({
        left: '250px',
        height: '+=150px',
        width: '+=150px'
    });
}

$('#answer').empty().append('<div>The word: '+solutionDisplay+'</div>'+'<p>Characters used: '+charactersUsed+'</p>'+'<p>Wrong characters used: '+wrongCharacters+'</p>');

});

}); // $(document).ready(function(){});
