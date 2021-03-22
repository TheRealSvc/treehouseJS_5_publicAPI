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
    .then(x => eventHandlerFun(x)) 
    .catch(error => { console.error('the fetch operation threw the error:', error) });
    let prepDat = await jsonDat.results.map(x => generateGalleryItem(x)) ; 
    gallery.insertAdjacentHTML('beforeend', prepDat.join('')) ;
} 


function eventHandlerFun(jsonDat) {    
    document.addEventListener('click',  (e) => {
        console.log(e.target.className) ;
        const filterClasses = ['card', 'card-text','card-name cap','card-info-container'] ;
        if (filterClasses.some((x) =>  e.target.className === x )) {
            selectedEmail = e.target.getElementsByClassName('card-text')[0].innerText ;
            console.log(selectedEmail) ;
            var a = Promise.resolve(jsonDat) ;
            a.then(x => {
              for (i=0;i <12;i++) {
                  if (x.results[i].email === selectedEmail) {
                    body.innerHTML += generateModal(x.results[i]) ;   
                  }
              }      
            })     
        } else if (e.target.id==='modal-close-btn' || e.target.innerText==="X" || e.target.tagName=='strong' || e.target.id === "modal-container")  {
                body.lastElementChild.remove() ;
        }
  })
  return jsonDat;
}

loadPage() ;

//addListeners(staffDat) ;


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