document.addEventListener("DOMContentLoaded", function(){
    fetchBakes()
    createNewBake()
    bakesWinner()
})

/**API FETCH FUNCTIONS **/

function fetchBakes() {
    fetch("http://localhost:3000/bakes")
    .then(function(res) {
        return res.json();
    })
    .then(function(bakesArray) {
        bakesArray.forEach(function(bake) {
            renderBakeListItem(bake)
        })
        renderBakeDetails(bakesArray[0])
    })
}

function fetchWinner() {
    fetch("http://localhost:3000/bakes/winner")
    .then(function(res) {
        return res.json();
    })
    .then(function(winnerObj) {
        updateWinnerDOM(winnerObj.name)
    })
}

function postReq(newBake) {
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(newBake)
    }
    fetch("http://localhost:3000/bakes", configObj)
    .then(function(res) {
        return res.json()
    })
    .then(function(createdBake) {
        renderBakeListItem(createdBake)
        closeModal()
    })
}

function patchScoreReq(bake, newScore) {
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261" 
        },
        body: JSON.stringify({score: newScore})
    }
    fetch(`http://localhost:3000/bakes/${bake.id}/ratings`, configObj)
    .then(function(res){
        return res.json()
    })
    .then(function(updatedBake){
        console.log(updatedBake)
    }) 
}

/** DOM/EVENT FUNCTIONS**/

function renderBakeListItem(bake) {
    const bakesContainer = document.querySelector("#bakes-container")
    const bakeLi = document.createElement("li")
    bakeLi.textContent = bake.name
    bakeLi.className = "item"
    bakesContainer.append(bakeLi)
    bakeLi.addEventListener("click", function(){
        renderBakeDetails(bake)
    })
}

function renderBakeDetails(bake) {
    const bakeDetailsContainer = document.querySelector("#detail")
    bakeDetailsContainer.innerHTML = `
        <img src="${bake.image_url}" alt=${bake.name}">
        <h1>${bake.name}</h1>
        <p class="description"> ${bake.description} </p>
        <form id="score-form" data-id="${bake.id}">
        <input value="${bake.score}" type="number" name="score" min="0" max="10" step="1">
        <input type="submit" value="Rate">
        </form>
    `
    const scoreForm = bakeDetailsContainer.querySelector("#score-form")
    scoreForm.addEventListener("submit", function(e) {
        e.preventDefault()
        patchScoreReq(bake, scoreForm.score.value)
    })
}

function createNewBake() {
   const newBakeForm = document.querySelector("#new-bake-form") 
   newBakeForm.addEventListener("submit", function(e) {
       e.preventDefault();

       const newBake = {
           name: newBakeForm.name.value,
           image_url: newBakeForm.image_url.value,
           description: newBakeForm.description.value
       }

       postReq(newBake)
   })
}

function bakesWinner() {
    const judgeBake = document.querySelector("#judge-bake-button")
    judgeBake.addEventListener("click", function(){
        fetchWinner()
    })
}

function updateWinnerDOM(winner) {
    const bakesContainer = document.querySelector("#bakes-container")
    const liArray = bakesContainer.querySelectorAll(".item")

    liArray.forEach(function(li) {
        if(li.textContent === winner) {
            li.classList.add("winner")
        }
        else {
            li.classList.remove("winner")
        }
    })
}

/** DOM HELPERS **/

function closeModal() {
    const modal = document.querySelector("#modal")
    modal.style.display = "none"

    const newBakeForm = document.querySelector("#new-bake-form") 
    newBakeForm.reset()
}