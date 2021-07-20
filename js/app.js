// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// fetch data from API
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;

// store the employee HTML as we create it
let employeeHTML = '';

// loop through each employee and create HTML markup
employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    // template literals make this so much cleaner!
    employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
    `
    });

    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {

    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
                <hr />
                <p>${phone}</p>
                <p class="address">${street}, ${state} ${postcode}</p>
                <p>Birthday:
                ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>
        `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {

    // select the card element based on its proximity to actual element clicked
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');

    displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
 });
  
 
// Search Functionality

// define a variable for the Search bar element
let searchInput = document.getElementById('searchbar');

//create variable for the text that's been input live in the search bar.
const searchTextLive = (searchInput) => {
  //target all cards
  const cards = document.querySelectorAll('.card');
  //array of each card element
  cards.forEach(card => {
    //define the caption text for each, set to lowercase.
    const name = card.querySelector('.name').textContent.toLowerCase();

    //if the text is is included in the Search input
      if (name.includes(searchInput)){
        //display the image
      card.style.display = 'flex';
    } else { 
      //hide the image
      card.style.display = 'none';
    }
  });
};

//Event Listener to check the function on each keyup
// x is a unnamed variable

searchInput.addEventListener('keyup', (x) => {
	let searchInput = x.target.value.toLowerCase();
	searchTextLive(searchInput);
})