// your code here!
// console.log("🥧")

//DOM Elements 
const bakesContainer = document.querySelector("#bakes-container");
const singleBake = document.querySelector("#detail");
const newBakeForm = document.querySelector("#new-bake-form");

//Deliverable 1: all the bakes 
fetch('http://localhost:3000/bakes')
.then(response => response.json())
.then(bakeData => {
    bakeData.forEach(function(bake) {
    bakesContainer.innerHTML += 
    `<li class="item" data-id=${bake.id}>${bake.name}</li>`
    })
});

//Deliverable 2: show a clicked bake on the main page 
bakesContainer.addEventListener("click", function(event) {
    const outerCard = event.target.closest(".item")
    const listingId = outerCard.dataset.id

    fetch('http://localhost:3000/${listingId}')
    .then(response => response.json())
    .then(bake => {
            singleBake.innerHTML = `<img src="${bake.image_url}" alt="${bake.name}">
            <h1>${bake.name}</h1>
            <p class="description">
            ${bake.description}
            </p>
            <form id="score-form" data-id=${bake.id}>
                <input value="10" type="number" name="score" min="0" max="10" step="1">
                <input type="submit" value="Rate">
            </form>`
        })
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