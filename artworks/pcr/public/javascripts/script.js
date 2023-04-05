let idealInput = document.getElementById('ideal')
let figureInput = document.getElementById('figure')
let ideal,
    selectedFigure = "Cube";
function idealChange(e) {
    if (e.checked) {
        ideal = true;
        return;
    }
    else {
        ideal = false;
    }
}
function figureChange(e) {
    selectedFigure = e.options[e.options.selectedIndex].innerText;
    console.log(selectedFigure)
}
function loaded() {
    let loader = document.querySelector(".loader")
    loader.classList.add("hidden")
    let content = document.querySelector("#content")
    content.classList.remove("hidden")
}