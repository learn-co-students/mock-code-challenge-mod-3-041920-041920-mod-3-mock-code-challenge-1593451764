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
            function changeDetails(bake) {
                console.log(bake)
                let detailDiv = document.querySelector('#detail')
                detailDiv.innerHTML = `
                <h1>${bake.name}</h1>
                <img src ="${bake.image_url}" />
                <p>'${bake.description}' </p>
                `
            }
            changeDetails(bake)
        }
          )
        bakeLi.innerText = bake.name

        bakesUl.appendChild(bakeLi)
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchBakes()
});



// 2. **When a bake is clicked in the sidebar**, the details for the bake 
// should show up in the detail area.