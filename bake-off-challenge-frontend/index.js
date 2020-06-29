const bakesContainer = document.getElementById('bakes-container')
const details = document.getElementById('detail')
const form = document.getElementById('new-bake-form')


fetch("http://localhost:3000/bakes")
.then(resp => resp.json())
.then(bakesData => {
  // console.log(bakesData)

  bakesData.forEach(bake => {
    const li = document.createElement('li')
    li.className = "item"
    li.dataset.id = bake.id
    li.innerText = bake.name
    bakesContainer.append(li)
  })
})

bakesContainer.addEventListener("click", (event) => {
  // console.dir(event.target.dataset.id)
  const bakeId = event.target.dataset.id
  fetch(`http://localhost:3000/bakes/${bakeId}`)
  .then(resp => resp.json())
  .then(bake => {
    // console.log(bake)

    details.innerHTML = `<img src=${bake.image_url}>
                        <h1>${bake.name}</h1>
                        <p class="description">
                          ${bake.description}
                        </p>
                        <form id="score-form" data-id="1">
                          <input value=${bake.score} type="number" name="score" min="0" max="10" step="1">
                          <input type="submit" value="Rate">
                        </form> `
    // input[value="Rate"]
    const rateForm = details.querySelector('#score-form')
    // console.log(rateForm)

    rateForm.addEventListener("submit", (event) => {
      event.preventDefault()
      // console.dir(typeof event.target[0].value)
      const newScore = {
        score: parseInt(event.target[0].value)
      }
      fetch(`http://localhost:3000/bakes/${bake.id}/ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 699a9ff1-88ca-4d77-a26e-e4bc31cfc261"
        },
        body: JSON.stringify(newScore)
      })
      .then(resp => resp.json())
      // .then(newLikeData => console.log("Success!", newLikeData))

      // ========================================================================================
      // ========================================================================================
      //                           COULD NOT FINISH LAST DELIVERABLE
      // ========================================================================================
      // ========================================================================================
      fetch("http://localhost:3000/bakes/winner")
      .then(resp => resp.json())
      .then(winner => {
        let currentWinner;  
        // COLLECT ALL THE <li> ELEMENTS FROM THE PAGE
        const possibleWinners = document.querySelectorAll('.item')
      
        // LOOP OVER EACH ELEMENT FROM THE LIST
        possibleWinners.forEach((competitor) => {
            // CHECK EACH ELEMENT FROM THE LIST IF ONE OF THEM HAS A CLASS OF "winner"
            console.log(competitor)
            if (competitor.className === "winner") {
              console.log("FOUND CURRENT WINNER")
              // ONCE THE ELEMENT WITH THE CLASS OF "winner" IS FOUND ASSIGN TO A currentWinner VARIABLE
              console.log(competitor)
              currentWinner = competitor
              console.log(currentWinner)
            } 
        })     
        // CHECK IF THAT currentWinner dataset.id IS EQUAL TO THE WINNER RETURNED FROM THE SERVER
        if (currentWinner === null) {
          console.log("CREATE NEW WINNER")
          const newWinner = document.querySelector(`li[data-id="${winner.id}"]`)
          newWinner.className = "winner"
        } else {
          console.log("REMOVE EXISTING WINNER")
          // IF THAT currentWinner's dataset.id IS NOT EQUAL TO THE WINNER'S ID RETURNED FROM THE SERVER...

          // 1) REMOVE THE CLASS OF "winner" FROM THE currentWinner 
          competitor.classList.remove("winner")
          // 2) COLLECT THE NEW WINNER BY ITS dataset.id 
          const newWinner = document.querySelector(`li[data-id="${winner.id}"]`)
          // ASSIGN THE CLASS "winner" TO THE NEW newWinner VARIABLE
          newWinner.className = "winner"
        }
      })
    })           


  })
})

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const newBake = {
    name: event.target.name.value,
    image_url: event.target.image_url.value,
    description: event.target.description.value
  }

  fetch("http://localhost:3000/bakes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newBake)
  })
  .then(resp => resp.json())
  // .then(newBakeData => console.log("Success!", newBakeData))
})
