const wrapper = document.querySelector('.wrapper');
let searchinput = wrapper.querySelector('input');
infotext = wrapper.querySelector('.info-text');
const synonym = wrapper.querySelector('.synonyms .list');
let volumeicon = wrapper.querySelector('.word i')
let removeicon = wrapper.querySelector('.search span')
let audio;
//data funtion//
function data(result,word){
    if(result.title){
        infotext.innerHTML = `can't find the meaning of ${word}`;
    }
    else{
        console.log(result)
        //console.log(result[0].meanings[0].definitions[0].definition,word);
       // infotext.innerHTML = result[0].meanings[0].definitions[0].definition;
        let phonetics = `${result[0].meanings[0].partOfSpeech} /${result[0].phonetics[0].text}/`
       
        wrapper.classList.add('active')
        document.querySelector('.word p').innerText = result[0].word;
        document.querySelector('.word span').innerText = phonetics;
         document.querySelector('.meaning span').innerText = result[0].meanings[0].definitions[0].definition;
         document.querySelector('.Example span').innerText = result[0].meanings[0].definitions[0].example;
         audio = new Audio("https:" + result[0].phonetics[0].audio);
         console.log(audio)
         if(result[0].meanings[0].synonyms[0] == undefined){
            synonym.parentElement.style.display = 'none'
         }else{
            synonym.innerHTML = "";
            synonym.parentElement.style.display = 'block'
            console.log(synonym.parentElement);
            for(var i = 0; i < 5 ; i++){
                let tag = `<span onclick=search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]}</span>`
                synonym.insertAdjacentHTML('beforeend',tag);
          }
         }
        
      
    }
}

function search(word){
    searchinput.value = word;
    fetchapi(word)
}

//fetch function //
function fetchapi(word) {
    wrapper.classList.remove('active')
    infotext.style.color = '#000'
    infotext.innerHTML = `Searching the meaning ${word}`
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => data(result,word)).catch(error => {
        console.log(error)
    })
}


searchinput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && e.target.value) {
        fetchapi(e.target.value)
    }



})

volumeicon.addEventListener('click',()=>{
     audio.play();
})

removeicon.addEventListener("click",()=>{
    searchinput.value = "";
    wrapper.classList.remove('active')
    infotext.innerHTML = `type a word to search`
})