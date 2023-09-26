let wrapper = document.querySelector('.wrapper');
let searchinput = wrapper.querySelector('.search input');
let infoText = wrapper.querySelector('.info-text');
let synonym = wrapper.querySelector('.synonyms .list');
let closebtn = wrapper.querySelector('.search span');
//data function//
function data(word, result) {
    if (result.title) {
        infoText.innerHTML = `can't find the meaning of${word}`
    }
    else {
        wrapper.classList.add('active');
        console.log(result)
        let definition = result[0].meanings[0].definitions[0].definition;
        let phonetics = ` ${result[0].meanings[0].partOfSpeech} ${result[0].phonetics[0].text}`;
        let example = result[0].meanings[0].definitions[0].example;
        let synonyms = result[0].meanings[0].synonyms
        console.log(synonyms);
        wrapper.querySelector('.word p').innerText = result[0].word;
        wrapper.querySelector('.word span').innerText = phonetics
        wrapper.querySelector('.meaning span').innerText = definition;

        if (synonyms[0] == undefined || example == undefined) {
            synonym.parentElement.style.display = 'none'
            wrapper.querySelector('.Example span').parentElement.parentElement.style.display = 'none'

        }
        else {
            wrapper.querySelector('.Example span').parentElement.parentElement.style.display = 'block'
            wrapper.querySelector('.Example span').innerText = example;
            synonym.innerHTML = "";
            synonym.parentElement.style.display = 'block';
 
            for (i = 0; i < synonyms.length; i++) {
                let tag = `<span onclick=search('${synonyms[i]}')>${synonyms[i]}</span>`
             
                synonym.insertAdjacentHTML('beforeend', tag);
            }
          
        }

    }




}




//fetching data from api and returning data to data function//
function fetchapi(word) {
    wrapper.classList.remove('active');
    infoText.style.color = '#636363';
    infoText.innerText = `searching the meaning of ${word}`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(response => response.json()).then(result => {

        return data(word, result);
    }).catch((error) => {
        console.log(error);
    })


}


searchinput.addEventListener('keyup', (e) => {

    if (e.key == 'Enter' && e.target.value) {
        fetchapi(e.target.value)

    }

})
// search function//

function search(word) {
    searchinput.value = word;
    fetchapi(word);
}

closebtn.addEventListener('click', () => {
    searchinput.value = '';
    wrapper.classList.remove('active');
    infoText.innerHTML = 'type a word to search'
})
