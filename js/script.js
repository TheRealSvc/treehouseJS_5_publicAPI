// define parameters and globals
const numStaff = 12 ; // parametrization of staff number
const singleRequest = `https://randomuser.me/api/?results=${numStaff}&nat=us` ;
const gallery = document.getElementById('gallery') ;
const body = document.querySelector('body') ;
const search = document.querySelector('.search-container')


/**
 *  render search container
 */
function createSearch() {
  myString= `<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  </form>`
  return myString
}


/**
 * @param fetchedEl is the json object to reference to peoples data in the response body  
 * @returns the HTML String to render 
 */
function generateGalleryItem(fetchedEl) {
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

/**
 * creates the Modal window 
 * @param  fetchedEl 
 * @returns 
 */
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
                <p class="modal-text"> ${parsePhone(fetchedEl.cell)} </p>
                <p class="modal-text"> ${fetchedEl.location.street.number} ${fetchedEl.location.street.name}, ${fetchedEl.location.city}, ${fetchedEl.location.postcode}</p>
                <p class="modal-text">Birthday: ${parseBirthday(fetchedEl.dob.date.slice(0,10))}</p>
                </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>` ;
    return myString
};


/**
 * Main fetch and parse to json
 */
async function loadPage() {
    const jsonDat = fetch(singleRequest) 
    .then(response => response.json()) 
    return jsonDat ; 
}

// add search field 
search.insertAdjacentHTML('beforeend',createSearch()) ;

// create Promise for getting json data from API  
jsonDat = loadPage()

// displaying of the staff in the gallery and registering of eventListeners
const jsonData = Promise.resolve(jsonDat);
    jsonData.then(x => eventHandlerFun1(x)) 
    .then(x => eventHandlerFun2(x)) 
    .then(x => x.results.map(x => generateGalleryItem(x)))
    .then(y => gallery.insertAdjacentHTML('beforeend', y.join('')))
    .catch(error => { console.error('the fetch operation threw the error:', error) }) ;


/**
 * This function acts as a eventHandler to handle "gallery and modal" events 
 * @param {Promise} a is passed through 
 * @returns a 
 */
function eventHandlerFun1(a) {    
    document.addEventListener('click', (e) => {
        console.log(e.target.className) ;
        galleryClick = /card-img|card-name|card-image-container|card-text/.test(e.target.className) ; 
        modalClick = /modal-close-btn|modal-text|modal-name|modal-img|modal-container|modal-info-container/.test(e.target.className) || e.target.textContent==="X";  
        nextClick = /modal-next btn/.test(e.target.className) ;
        prevClick = /modal-prev btn/.test(e.target.className) ;
        
        if (galleryClick) {
            selectedEmail = e.target.parentNode.parentNode.querySelector('.card-text').innerText ;
            console.log(selectedEmail) ;
            Promise.resolve(a).then(x => {
              for (i=0; i < numStaff ; i++) {
                  if (x.results[i].email === selectedEmail) {
                    body.insertAdjacentHTML('beforeend', generateModal(x.results[i])) ;   
                  }
              }      
            })     
        } else if (modalClick)  {
              body.lastElementChild.remove() ;
        } else if (nextClick) {
              const actualEmail = e.target.parentNode.parentNode.querySelector(".modal-text").innerText
              body.lastElementChild.remove() ;
              Promise.resolve(a).then(x => {
                for (i=0; i < numStaff ; i++) {
                    if (x.results[i].email === actualEmail) {
                      if (i === numStaff-1) { 
                        body.insertAdjacentHTML('beforeend', generateModal(x.results[0])) ; // circle around 
                      } else { 
                        body.insertAdjacentHTML('beforeend', generateModal(x.results[i+1])) ;   
                    }
                  }
                }})      
        } else if (prevClick) {
          const actualEmail = e.target.parentNode.parentNode.querySelector(".modal-text").innerText
          body.lastElementChild.remove() ;
          Promise.resolve(a).then(x => {
            for (i=0; i < numStaff ; i++) {
                if (x.results[i].email === actualEmail) {
                  if (i === 0) { 
                    body.insertAdjacentHTML('beforeend', generateModal(x.results[numStaff-1])) ; // circle around 
                  } else { 
                    body.insertAdjacentHTML('beforeend', generateModal(x.results[i-1])) ;   
                }
              }
            }})      
        }
  }, false)
return a
}

/**
 * This function handles "search events"
 * @param {Promise} a is passed through 
 * @returns a 
 */
function eventHandlerFun2(a) { 
  search.addEventListener('keyup', (e) => {
    const filterText = new RegExp(e.target.value.toLowerCase()) ;
    gallery.innerHTML = '' ;
    Promise.resolve(a).then(x => {
      for (i=0; i < numStaff ; i++) {
        if (filterText.test(x.results[i].name.last.toLowerCase()) || filterText.test(x.results[i].name.first.toLowerCase()) ) {
          gallery.insertAdjacentHTML('beforeend',generateGalleryItem(x.results[i])) ;   
        }
      }      
    })
  },false)           
  return a;
}





// Helper functions ----------------------

function parseBirthday(datestring) {
  let normalized  = datestring.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)
  normalized = normalized[0].replace(/-/g,'');
  return normalized.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$2-$3-$1')
  } 
  
function parsePhone(phonestring) {
  phonestring = phonestring.replace(/[^\d]/g, "");
  if (phonestring.length == 10) {
    return phonestring.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  } else {
    return phonestring //leave as is in case length doesn't match 
  }
} 

