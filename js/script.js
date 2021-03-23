// define parameters and globals
const numStaff = 12 ; // parametrization of staff number
const singleRequest = `https://randomuser.me/api/?results=${numStaff}` ;
const gallery = document.getElementById('gallery') ;
const body = document.querySelector('body') ;
const search = document.querySelector('.search-container')

/**
 *  render search container
 */
function createSearch() {
  myString= `<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>`
  return myString
}

/**
 * @param fetchedEl is the json object to reference to peoples data in the response body  
 * @returns the HTML String to render 
 */
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

/**
 * 
 * @param {*} fetchedEl 
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
                <p class="modal-text">(555) 555-5555 ${fetchedEl.cell}</p>
                <p class="modal-text"> ${fetchedEl.location.street.number} ${fetchedEl.location.street.name} ,${fetchedEl.location.city}, OR ${fetchedEl.location.postcode}</p>
                <p class="modal-text">Birthday: ${fetchedEl.dob.date.slice(0,9)}</p>
                </div>
                </div>
            </div>` ;
    return myString
};

async function loadPage() {
    const jsonDat = fetch(singleRequest) 
    .then(response => response.json()) 
    return jsonDat ; 
}
search.insertAdjacentHTML('beforeend',createSearch()) ;
jsonDat = loadPage()

// this is to decouple 
const jsonData = Promise.resolve(jsonDat);
    jsonData.then(x => eventHandlerFun(x)) 
    .then(x => x.results.map(x => generateGalleryItem(x)))
    .then(y => gallery.insertAdjacentHTML('beforeend', y.join('')))
    .catch(error => { console.error('the fetch operation threw the error:', error) });
    //let prepDat = await jsonDat.results.map(x => generateGalleryItem(x)) ; 
    //gallery.insertAdjacentHTML('beforeend', prepDat.join('')) ;
    //return jsonDat ;
//} 

/**
 * This function acts as a eventHandler to handle all relevant events 
 * @param {*} jsonDat this is only passed through 
 * @returns jsonDat unchanged
 */
function eventHandlerFun(jsonDat) {    
    document.addEventListener('click',  (e) => {
        console.log(e.target.className) ;
        galleryClick = /card|card-img|card-name|card-name cap|card-image-container|card-text cap/.test(e.target.className) ; 
        modalClick = /modal-text|modal-name cap|modal-text cap|modal-img|modal-container|modal-info-container/.test(e.target.className) || e.target.textContent==="X";  
        
        if (galleryClick) {
            selectedEmail = e.target.parentNode.parentNode.querySelector('.card-text').innerText ;
            console.log(selectedEmail) ;
            var a = Promise.resolve(jsonDat) ;
            a.then(x => {
              for (i=0; i < numStaff ; i++) {
                  if (x.results[i].email === selectedEmail) {
                    body.innerHTML += generateModal(x.results[i]) ;   
                  }
              }      
            })     
        } else if (modalClick)  {
              body.lastElementChild.remove() ;
        } 
  })

  search.addEventListener('keyup', (e) => {
    let filterText = e.target.value.toLowerCase() ;
    gallery.innerHTML = '' ;
    var a = Promise.resolve(jsonDat) ;
    a.then(x => {
      for (i=0; i < numStaff ; i++) {
        if (x.results[i].name.last.toLowerCase().startsWith(filterText)) {
          gallery.innerHTML += generateGalleryItem(x.results[i]) ;   
        }
      }      
    })
  })           
  return jsonDat;
}

jsonDat = loadPage() ;
/* jsonDat.then(x => addSearchListener(x))

function addSearchListener(jsonIn) {
search.addEventListener('keyup', (e) => {
  console.log(e.target) ;
  let filterText = e.target.value.toLowerCase() ;
  console.log(filterText)
  body.innerHTML = '' ;
  for (i=0; i < numStaff ; i++) {
    if (jsonIn.results[i].name.last.toLowerCase().startsWith(filterText)) {
      body.innerHTML += generateModal(jsonIn.results[i]) ;   
    }
  }      
 // var a = Promise.resolve(jsonDat) ;
 // a.then(x => x.results.filter(y => y.name.last.toLowerCase().startsWith(searchText)))
 // a.then(x => {return(x)}) ;
})
}

/* To Do's 
NOTE: The formatting of the Cell Number should be (XXX) XXX-XXXX and the formatting of 
the Birthday should be MM/DD/YYYY.
*/