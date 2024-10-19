/**
 * @param citylist A list of strings, with each one corresponding to a city.
 */
function parseCities(citylist){
    let prevCities = []
    let newCities = cities.slice()
    let uCities = citylist.slice() //undecided cities
    for(let i = 0; i<cities.length; i++){
        for(let j = 0; j<uCities.length; j++){
            if(uCities[j].toLowerCase() == cities[i].city.toLowerCase()){
                prevCities.push(cities[i]);
                //newCities = cities able to reccommend. If this city has already been visited, but hasnt been reccommended.
                if(newCities.includes(cities[i])){
                    newCities.splice(newCities.indexOf(cities[i]),1)
                }
            }
        }
    }
    return {
        prevCities: prevCities,
        newCities: newCities
    }
}
/**
 * 
 * @param citylist 
 */
function reccommendCities(citylist){
    let parse = parseCities(citylist)
    let newCities = parse.newCities;
    let prevCities = parse.prevCities;
    
}