// define global DOM references

const gallery = document.getElementById('gallery');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/*
The directory displays 12 users from the Random User API, and includes the following for each user:
Employee Image
First and Last Name
Email
City or location */

function addGalleryItem(fetchedEl) {
    myString = `<div class="card-img-container">
                <img class="card-img" src="${ipadress}" alt="profile picture">
                </div>
                <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${emailAdress} </p>
                <p class="card-text cap"> ${city}, ${state}</p>
                </div>`;
};
//gallery.element.insertAdjacentHTML('beforeend', 'HTML string');

function reloadGallery() {
    for(i=1;i<=12;i++) {
        var startDiv = '<div class="card">';
        var endDiv = '</div>';
        fetch('https://randomuser.me/api')
            .then(response => response.json())
            .then(data => console.log(data))
            .then((data) => addGalleryItem(data))
            .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            });
    }
}


var debuggy = fetch('https://randomuser.me/api')
.then(response => response.json())
.then(data => console.log(data));

testObj = {"results":[{"gender":"male","name":{"title":"Mr","first":"Marto","last":"Fernandes"},"location":{"street":{"number":2754,"name":"Rua da Paz "},"city":"Marília","state":"Mato Grosso","country":"Brazil","postcode":97443,"coordinates":{"latitude":"-79.0964","longitude":"-118.4819"},"timezone":{"offset":"+5:00","description":"Ekaterinburg, Islamabad, Karachi, Tashkent"}},"email":"marto.fernandes@example.com","login":{"uuid":"a6a4386f-abc2-4804-b899-9a250fcd1bc2","username":"organicmouse658","password":"lori","salt":"OTVkGar0","md5":"db77f0892c24646e530c2f0f52ebe3ef","sha1":"c4d1be1188bdc708762352c9277b7a64b7afa2d2","sha256":"7f94308435411270b692fa9bdeab07607f62a0edcda569d932a8793a8e40ad95"},"dob":{"date":"1979-03-25T04:44:49.057Z","age":42},"registered":{"date":"2004-10-01T17:18:16.293Z","age":17},"phone":"(09) 7807-7188","cell":"(61) 3117-0408","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/33.jpg","medium":"https://randomuser.me/api/portraits/med/men/33.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/33.jpg"},"nat":"BR"}],"info":{"seed":"7b16a0a7b90d0011","results":1,"page":1,"version":"1.3"}}