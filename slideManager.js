let currSlide = 1;
let userCities = []
let destinations = []
function switchToSlide(slide){
    if(slide == 3){
        userCities = []
        for(let i = 1; i<=6; i++){
            userCities.push(document.getElementById('city'+i).value)
        }
        if(parseCities(userCities).prevCities.length <= 0){
            switchToSlide(0);
            return;
        }else{
            destinations = reccommendCities(userCities);
            console.log(destinations)
            for(let i = 0; i<destinations.length; i++){
                document.getElementById(`slide${i}title`).innerText = destinations[i].city
            }
        }
    }
    document.getElementById(`slide${currSlide}`).hidden = true
    currSlide = slide;
    document.getElementById(`slide${currSlide}`).hidden = false
}
let cities = [];
async function loadCities(){
    cities = await fetch("cities.json").then(x => x.json());
}
loadCities();