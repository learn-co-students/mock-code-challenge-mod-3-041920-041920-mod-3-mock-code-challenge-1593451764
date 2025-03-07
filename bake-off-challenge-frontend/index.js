const bakeList = document.querySelector('#bakes-container')
const bakeDetail = document.querySelector('#detail')
const createBakeForm = document.querySelector('#new-bake-form')
// console.log(createBakeForm)

const BAKES = fetch('http://localhost:3000/bakes')
.then(response => response.json())
// this part is wonky
.then(bakes => renderBakes(bakes))

function renderBakes(item) {
  item.forEach(bake => renderABake(bake))
}

function renderABake(item) {
  let bakeItem = document.createElement('li')
  bakeItem.className = 'item'
  bakeItem.dataset.id = `${item.id}`
  bakeItem.textContent = `${item.name}`
  bakeList.appendChild(bakeItem)

  // changed to mouseover cause it looks cooler and this'll probably backfire on me :shrug
  bakeItem.addEventListener('mouseover', e => {
    e.preventDefault();
    renderBakeDetail(item)
  })
}

function renderBakeDetail(item) {
  bakeDetail.innerHTML = `
    <img src="${item.image_url}" alt="${item.name}">
    <h1>${item.name}</h1>
    <p class="description">${item.description}</p>
    <form id="score-form" data-id="${item.id}">
    <input value="10" type="number" name="score" min="0" max="10" step="1">
    <input type="submit" value="Rate">
    </form>
  `
}

// CREATE NEW BAKEYBOIIIIIIII
createBakeForm.addEventListener('submit', event => {
  event.preventDefault()
  console.log(createBakeForm.image_url.value)
  const bakeObj = {
    name: createBakeForm.name.value,
    description: createBakeForm.description.value,
    image_url: createBakeForm.image_url.value,
    score: 0
  }
  fetch('http://localhost:3000/bakes', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(bakeObj)
  }).then(resp => resp.json()).then(bake => renderABake(bake))
  createBakeForm.reset();
  createBakeForm.style.display = 'none';
})
