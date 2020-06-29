let allBakes = []
const baseUrl = 'http://localhost:3000/bakes'

fetchAllBakes(baseUrl)
addNewBake()
judgeBakeEvent()


/** Fetch requests */
function fetchAllBakes(url){
  fetch(url)
  .then(response => response.json())
  .then(bakes => {
    allBakes = [...bakes]
    console.log(allBakes)
    renderBakes(allBakes)
  })
}

function updateAllBakes(newBake){
  debugger
  allBakes[newBake.id] = newBake
  console.log('updated')
  console.log(allBakes)
}

function createBakeFetch(newBake){
  // debugger
  const newBakeObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newBake.name.value,
      image_url: newBake.image_url.value,
      description: newBake.description.value
    })
  }
  // debugger
  fetch(baseUrl, newBakeObj)
    .then(res => res.json())
    .then(bakeObj => {
      renderOneBake(bakeObj)
      closeModal()
    })
}

function patchScoreFetch(score, bakeId){
  const scoreObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261"
    },
    body: JSON.stringify({
      score: parseInt(score)
    })
  }
  fetch(`http://localhost:3000/bakes/${bakeId}/ratings`, scoreObj)
    .then(res => res.json())
    .then(bakeObj => {
      
      /** how do I keep score present???? */
      console.log("after update score")
      console.log(bakeObj)
      
      bake = bakeObj
      updateAllBakes(bakeObj)

      console.log("initial bake")
      console.log(bake)
    })
}

function winnerFetch(){
  fetch(baseUrl+'/winner')
    .then(res => res.json())
    .then(findWinner)
}

/** DOM render */

/* initial render */
function renderBakes(bakes){
  console.log(bakes)
  bakes.forEach(renderOneBake);
  // renderDetail(bakes[0])
}

function renderOneBake(bake){  
  const bakeList = document.querySelector('#bakes-container')
  const bakeLi = document.createElement('li')
  bakeLi.setAttribute('data-id', bake.id)
  bakeLi.className = 'item'
  bakeLi.innerText = bake.name
  bakeList.append(bakeLi)

  bakeLi.addEventListener('click', function(e){
    // console.log(e.target.dataset.id)
    renderDetail(bake)
  })
}

function renderDetail(bake = bakes[0]){  
  const detailContainer = document.querySelector('#detail')
  detailContainer.innerHTML = `
    <img src=${bake.image_url} alt="Alice’s Orange & Cardamom ‘Ice Cream’ Buns">
    <h1>${bake.name}</h1>
    <p class="description">
      ${bake.description}
    </p>
    <form id="score-form" data-id="${bake.id}">
      <input value="${bake.score}" type="number" name="score" min="0" max="10" step="1">
      <input type="submit" value="Rate">
    </form>
  `
  const scoreForm = detailContainer.querySelector('#score-form')
  
  scoreForm.addEventListener('submit', e => {
    e.preventDefault()
    // debugger
    const score = e.target.score.value
    const bakeId = e.target.closest('#score-form').dataset.id
    patchScoreFetch(score, bakeId)
  })
}

function findWinner(winner){
  const bakeLists = document.querySelectorAll(".item")
  // debugger
  bakeLists.forEach(function(li) {
      if(li.dataset.id === winner.id.toString()) {
          li.classList.add("winner")
      }
      else {
          li.classList.remove("winner")
      }
  })
}

/** Add Events */

function addNewBake(){
  const newForm = document.querySelector('#new-bake-form')
  // console.log(newForm)
  newForm.addEventListener('submit',e => {
    e.preventDefault()
    const newBake = e.target
    createBakeFetch(newBake)
  })
}

function judgeBakeEvent(){
  const judgeBtn = document.querySelector('#judge-bake-button')
  judgeBtn.addEventListener('click', e => {
    winnerFetch()
  })
}

/** helpers */
function closeModal(){
  const modal = document.querySelector('#modal')
  modal.style.display = "none"
  const newBakeForm = document.querySelector("#new-bake-form") 
  newBakeForm.reset()
}




