// https://api.dictionaryapi.dev/api/v2/entries/en/<word>
const submitForm = document.getElementById("submitForm");
const nounMeaningActual= document.getElementById("nounMeaningActual");
const verbMeaningActual = document.getElementById("verbMeaningActual");
const wordHeader = document.getElementById("wordHeader");
const pronounciation = document.getElementById("pronounciation"); 
const searchInput = document.getElementById("searchInput");

const fontButton = document.getElementById("fontButton");

var query="";

fontButton .addEventListener('click', function() {
    Div=document.getElementById("fontMenu")
    if (Div.style.display === "block") {
        Div.style.display = "none";
      } else {
        Div.style.display = "block";
      }
    
  })



const btn = document.querySelector('.btn-toggle');
btn.addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');  
  const currentState = btn.getAttribute('aria-pressed')
  btn.setAttribute('aria-pressed', currentState === 'false')
  
})



submitForm.addEventListener("click", (event) => {
event.preventDefault();
wordHeader.innerText="";
pronounciation.innerText="";
verbMeaningActual.innerHTML = "";
nounMeaningActual.innerHTML = "";

if(searchInput.value==""){
  query="keyboard";
}else{ query=searchInput.value;}


async function getWordDef(){
let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`) ;
let data = await response.json();
return data;
}

getWordDef().then (data => {
console.log(data)
var string=JSON.stringify(data);
var json = JSON.parse(string);



wordHeader.innerText=json[0].word;
pronounciation.innerText=json[0].phonetic;


const meaningsSourceNoun=json[0].meanings[0].definitions;

meaningsSourceNoun.forEach( element => {
const newMeaning = document.createElement("li");
newMeaning.innerText=element.definition;
nounMeaningActual.appendChild(newMeaning);
});



const meaningsSourceVerb=json[0].meanings[1].definitions[0];

// meaningsSourceVerb.forEach( element => {
const newMeaning1 = document.createElement("li");
newMeaning1.innerText=meaningsSourceVerb.definition;
verbMeaningActual.appendChild(newMeaning1);
// });

});
});