let currSlide = 1;
function switchToSlide(slide){
    document.getElementById(`slide${currSlide}`).hidden = true
    currSlide = slide;
    document.getElementById(`slide${currSlide}`).hidden = false
    if(slide == 3){
        //yacc = 0.00003
    }
}
let cities = [];
async function loadCities(){
    cities = await fetch("cities.json").then(x => x.json());
}
loadCities();