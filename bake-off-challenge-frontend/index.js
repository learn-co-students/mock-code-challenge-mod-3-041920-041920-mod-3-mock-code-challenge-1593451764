// your code here!
console.log("🥧")

const bakesUrl = "http://localhost:3000/bakes"
const bakesContainer = document.querySelector("#bakes-container");
const detailDiv = document.querySelector("#detail");
const judgeBakes = document.querySelector("#judge-bake-button");

document.addEventListener("DOMContentLoaded", () => {
    fetch(bakesUrl)
    .then(res => res.json())
    .then(allBakes => {
        renderAllBakes(allBakes)
    })

    bakesContainer.addEventListener("click", event => {
        if (event.target.className === "item") {
            const bakeId = event.target.dataset.id
            fetch(bakesUrl + `/${bakeId}`)
            .then(res => res.json())
            .then(bake => {
                renderBakeDetail(bake)
            })
        }
    })

    judgeBakes.addEventListener("click", event => {
        fetch(bakesUrl + "/winner")
        .then(res => res.json())
        .then(winningBake => {
            updateBakeLi(winningBake)
        })
    })
})

function renderAllBakes(bakeArray){
    bakeArray.forEach(bake => {
        const bakeLi = document.createElement("li")
        bakeLi.innerHTML = `<li class="item" data-id='${bake.id}'>${bake.name}</li>`
        bakesContainer.append(bakeLi)
    });
}

function renderBakeDetail(bake) {
    detailDiv.innerHTML = 
        `
        <img src='${bake.image_url}' alt='${bake.name}'>
        <h1>${bake.name}</h1>
        <p class="description">${bake.description}</p>
        <form id="score-form" data-id='${bake.id}'>
        <input value='${bake.score}' type="number" name="score" min="0" max="10" step="1">
        <input type="submit" value="Rate">
        </form>
        `
    
    const scoreForm = document.querySelector("#score-form");
    scoreForm.addEventListener("submit", event => {
        event.preventDefault()
        const scoreObj = {
            score: event.target.score.value
        }
        fetch(bakesUrl + `/${bake.id}` + `/ratings`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261'
            },
            body: JSON.stringify(scoreObj)
        })
        .then(res => res.json())
        .then(updatedBake => {
            renderBakeDetail(updatedBake)
        })
    })
}

function updateBakeLi(bake) {
   const bakeLi = bakesContainer.querySelector(`li[data-id = '${bake.id}']`)
   bakeLi.classList.add("winner")
}