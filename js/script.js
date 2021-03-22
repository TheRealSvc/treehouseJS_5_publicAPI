// define globals
const singleRequest = 'https://randomuser.me/api/?results=12'
const gallery = document.getElementById('gallery');
const body = document.querySelector('body');


// ------------------------------------------
//  FETCH AND DISPLAY GALLERY  
// ------------------------------------------

function generateGalleryItem(fetchedEl) {
    console.log(fetchedEl) ;
    console.log(typeof(fetchedEl));

    myString = `<div class="card">
                <div class="card-img-container">
                <img class="card-img" src="${fetchedEl.picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                <h3 id="name" class="card-name cap">${fetchedEl.name.first} ${fetchedEl.name.last}</h3>
                <p class="card-text">${fetchedEl.email} </p>
                <p class="card-text cap"> ${fetchedEl.location.city}, ${fetchedEl.location.state}</p>
                </div> 
                </div>`;
    return myString
};

function generateModal(fetchedEl) {
    console.log(fetchedEl) ;
    myString = `<div class="modal-container">
                <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                <img class="modal-img" src="${fetchedEl.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap"> ${fetchedEl.name.first} ${fetchedEl.name.last}</h3>
                <p class="modal-text">${fetchedEl.email}</p>
                <p class="modal-text cap">${fetchedEl.location.city}</p>
                <hr>
                <p class="modal-text">(555) 555-5555 ${fetchedEl.cell}</p>
                <p class="modal-text"> ${fetchedEl.location.street.number} ${fetchedEl.location.street.name} ,${fetchedEl.location.city}, OR ${fetchedEl.location.postcode}</p>
                <p class="modal-text">Birthday: ${fetchedEl.dob.date.slice(0,9)}</p>
                </div>
                </div>
            </div>` ;
    return myString
};


async function loadPage() {
    const jsonDat = await fetch(singleRequest) 
    .then(response => response.json()) 
    //.then(x => {return(x)}) 
    .catch(error => { console.error('the fetch operation threw the error:', error) });
    let prepDat = await jsonDat.results.map(x => generateGalleryItem(x)) ; 
    gallery.insertAdjacentHTML('beforeend', prepDat.join('')) ;
    return await jsonDat ;
} 

staffDat = loadPage() ;  

console.log(typeof(staffDat)) ;
async function addListeners(jsonDat) {    
    document.addEventListener('click',  async (e) => {
        if (e.target.classList.contains('card')) {
            console.log(`hier1: ${e.target}`) ;
            selectedEmail = e.target.getElementsByClassName('card-text')[0].innerText ;
            console.log(selectedEmail) ;
            jsonDat.then(x => console.log(x))
        //body.innerHTML += generateModal(jsonDat.results[1]) ;      
   }
  })
}

addListeners(staffDat) ;


/*

function fetchData(url) {
  return fetch(url)
           .then(checkStatus)  
           .then(res => res.json())
           .catch(error => console.log('Looks like there was a problem!', error))
}

Promise.all([
  fetchData('https://dog.ceo/api/breeds/list'),
  fetchData('https://dog.ceo/api/breeds/image/random')  
])
.then(data => {
  const breedList = data[0].message;
  const randomImage = data[1].message;
  
  generateOptions(breedList);
  generateImage(randomImage);
})


*/