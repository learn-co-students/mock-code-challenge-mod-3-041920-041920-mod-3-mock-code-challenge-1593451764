// your code here!
console.log("🥧")

function fetchBakes () {
    fetch('http://127.0.0.1:3000/bakes')
    .then(response => response.json())
    .then(data => renderBakes(data));
}

function renderBakes(bakes) {
    
    let bakesUl = document.querySelector("#bakes-container")
    bakes.forEach(bake => {
        console.log(bake)
        let bakeLi = document.createElement('li')
        bakeLi.addEventListener("click", (event) => {
            
            changeDetails(bake)
        }
          )
        bakeLi.innerText = bake.name

        bakesUl.appendChild(bakeLi)
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchBakes()
    food
});


function changeDetails(obj) {
    console.log(obj)
    let detailDiv = document.querySelector('#detail')
    detailDiv.innerHTML = `
    <h1>${obj.name}</h1>
    <img src ="${obj.image_url}" />
    <p>'${obj.description}' </p>
    `
}
// 2. **When a bake is clicked in the sidebar**, the details for the bake 
// should show up in the detail area.

let food = fetch('http://127.0.0.1:3000/bakes')
.then(response => response.json())
.then(data => changeDetails(data[0]));

console.log(food)