// Leave this here! 
// Show the form
const modal = document.querySelector("#modal")
const newBakeForm = document.querySelector("#new-bake-form")

document.querySelector("#make-bake-button").addEventListener("click", () => {
  modal.style.display = "block"
})
// Hide the form
modal.addEventListener("click", e => {
  if (e.target.dataset.action === "close") {
    modal.style.display = "none"
  }
})

newBakeForm.addEventListener("submit", event => {
  newBakeObj = {
    name: `${event.target.name.value}`,
    image_url: `${event.target.image_url.value}`,
    description: `${event.target.description.value}`
  }
  fetch(bakesUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newBakeObj)
  })
  .then(res => res.json())
})