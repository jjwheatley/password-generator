
let passwordSuggestion = '';

const checkboxes = {
  lowercase: 'lowercase',
  uppercase: 'uppercase',
  numbers: 'numbers',
  symbols: 'symbols',
}
function check (el){
  let allowUnchecking = false;
  const otherCheckboxes = Object.values(checkboxes).filter(val => val !== el.id);

  for(let i = 0; i < otherCheckboxes.length; i++){
    if(document.getElementById(otherCheckboxes[i]).checked === true){
      allowUnchecking = true;
      break;
    }
  }

  if(!allowUnchecking){
    el.checked=true
  }else{
    generatePassword()
  }
}

function isChecked(id) {
  return document.getElementById(id).checked
}

function generateRandomNum () {
  return Math.random()
}

function setSuggestion(suggestion){
  const max = 24
  if(suggestion.length > max){
    suggestion = suggestion.slice(0, max-3)+'...'
  }
  document.getElementById("generated").innerHTML = suggestion;
}

function displayMessage(message){
  const outer = document.getElementById("message-display-outer");
  const inner = document.createElement("div");

  outer.innerHTML = "";
  outer.appendChild(inner);
  inner.classList.add("message-display-inner")
  inner.innerHTML = message;
  setTimeout(() => {
    inner.style.opacity = "0";
  }, 400);
}

function copyPassword() {
  navigator.clipboard.writeText(passwordSuggestion);
  displayMessage("Password copied!")
}

const lowercaseCache = []
function getLowerCase (){
  if(lowercaseCache.length === 0){
    for(let i = 97; i < 123; i++){
      lowercaseCache.push(String.fromCharCode(i))
    }
  }
  return lowercaseCache;
}

const uppercaseCache = []
function getUpperCase (){
  if(uppercaseCache.length === 0){
    for(let i = 65; i < 91; i++){
      uppercaseCache.push(String.fromCharCode(i))
    }
  }
  return uppercaseCache;
}

const symbolsCache = []
function getSymbols (){
  if(symbolsCache.length === 0){
    for(let i = 33; i <= 126; i++){
      if(i < 48 || i > 57 && i < 60 ||i > 62 && i < 65 || i > 90 && i < 97 || i > 122){
        symbolsCache.push(String.fromCharCode(i))
      }
    }
  }
  return symbolsCache
}

const numbersCache = [0,1,2,3,4,'5','6','7','8','9']
function getNumbers(){
  if(numbersCache.length === 0){
    for(let i = 48; i < 58; i++){
      numbersCache.push(String.fromCharCode(i))
    }
  }
  return numbersCache;
}

function generatePassword(){
  const chars = []
  if(isChecked(checkboxes.lowercase)) chars.push(...getLowerCase());
  if(isChecked(checkboxes.uppercase)) chars.push(...getUpperCase())
  if(isChecked(checkboxes.numbers)) chars.push(...getNumbers())
  if(isChecked(checkboxes.symbols)) chars.push(...getSymbols())

  const password = [];
  const setSize = chars.length


  const passwordLength = document.getElementById('charCount').value;
  for(let i = 0; i < passwordLength; i++){
    const val = Math.floor(generateRandomNum()*setSize)
    password.push(chars[val])
  }
  passwordSuggestion = password.join('')

  setSuggestion(passwordSuggestion)
}

generatePassword()

// The Slider
const slider = document.getElementById("charCount");
const output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  generatePassword()
}
