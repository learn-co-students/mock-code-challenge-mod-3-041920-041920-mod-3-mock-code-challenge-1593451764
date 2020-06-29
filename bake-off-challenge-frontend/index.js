// your code here!
// console.log("🥧")

//DOM Elements 
const bakesContainer = document.querySelector("#bakes-container");
const singleBake = document.querySelector("#detail");
const newBakeForm = document.querySelector("#new-bake-form");


//Render Helpers 

function renderOneListing(listingObject) {
    // const bakeOne = document.createElement("li")
    // bakeOne.classList.add("item")
    bakeOne.dataset.id = listingObject.id
    bakeOne.innerHTML = `<li class="item" data-id="${listingObject.id}">${listingObject.name}"</li>`
    bakesContainer.appendChild(bakeOne)
}

    //Deliverable 2

    bakeOne.addEventListener("click", function(event) {
        event.preventDefault();
        renderBakeDetail(bake) 
    });

function renderBakeDetail(bake) {
    singleBake.innerHTML = `
    <img src="${bake.image_url}" alt="${bake.name}">
    <h1>${bake.name}</h1>
    <p class="description">${bake.description}</p>
    <form id="score-form" data-id="${bake.id}">
    <input value="10" type="number" name="score" min="0" max="10" step="1">
    <input type="submit" value="Rate">
    </form>`
}

function renderAllListings(listings) {
    listings.forEach(function (bake) {
        renderOneListing(bake)
    })
};

//Deliverable 1: all the bakes 
fetch('http://localhost:3000/bakes')
.then(response => response.json())
.then(bakeData => {
    renderAllListings(bakeData)
    })


 //Deliverable 3: create a new bake
    newBakeForm.addEventListener("submit", function(event) {
        event.preventDefault()

        const listingObject = {
            name: event.target.name.value,
            image_url: event.target.image_url.value,
            description: event.target.description.value,
            score: 0
        }

    fetch(`http://localhost:3000/bakes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(listingObject)
        })
        .then(r => r.json())
        .then(bake => {
        bakesContainer.innerHTML += `<img src="${bake.image_url}" alt="${bake.name}">
        <h1>${bake.name}</h1>
        <p class="description">
        ${bake.description}
        </p>
        <form id="score-form" data-id=${bake.id}>
            <input value="10" type="number" name="score" min="0" max="10" step="1">
            <input type="submit" value="Rate">
        </form>`
        })

    }); 