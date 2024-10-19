/**
 * @param citylist A list of strings, with each one corresponding to a city.
 */
function parseCities(citylist) {
    let prevCities = []
    let newCities = cities.slice()
    let uCities = citylist.slice() //undecided cities
    for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < uCities.length; j++) {
            if (uCities[j].toLowerCase() == cities[i].city.toLowerCase()) {
                prevCities.push(cities[i]);
                //newCities = cities able to reccommend. If this city has already been visited, but hasnt been reccommended.
                if (newCities.includes(cities[i])) {
                    newCities.splice(newCities.indexOf(cities[i]), 1)
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
function reccommendCities(citylist) {
    let parse = parseCities(citylist)
    let newCities = parse.newCities;
    let topCities = []
    for (let i = 0; i < 5; i++) {
        topCities[i] = newCities[i];
    }
    let prevCities = parse.prevCities;
    //data analysis time
    let latitudes = getField(prevCities, "lat")
    let avgLatitude = mean(latitudes)
    let latVariance = max(0.001,meanVariance(latitudes,avgLatitude))
    //console.log(latitudes,avgLatitude,latVariance)
    let logpops = applyFunction(getField(prevCities,"population"),log)
    let meanlogpop = mean(logpops)
    let popVariance = max(0.001,meanVariance(logpops,meanlogpop))
    //
    let gdpPerCapita = divideArr(getField(prevCities,"GDP"),getField(prevCities,"population"))
    let meanGDPCapita = mean(gdpPerCapita);
    let meanWealthVariance = max(0.001,meanVariance(gdpPerCapita,meanGDPCapita));
    //console.log(logpops,meanlogpop,popVariance)
    function scoringFunction(city) {
        let score = 0;
        score -= Math.abs(avgLatitude - city.lat) / latVariance;
        score -= Math.abs(meanlogpop - log(city.population)) / popVariance;
        score -= Math.abs(meanGDPCapita - city.GDP / city.population) / meanWealthVariance;
        return score
    }
    for (let i = 0; i < newCities.length; i++) {
        if (scoringFunction(topCities[4]) < scoringFunction(newCities[i])) {
            topCities[4] = newCities[i];
            let j = 4;
            while(j > 0 && scoringFunction(topCities[j-1]) < scoringFunction(topCities[j])){
                let temp = topCities[j-1];
                topCities[j-1]= topCities[j];
                topCities[j] = temp;
                j--;
            }
        }
    }
    return [topCities,prevCities]
}

function getField(arr, field) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i][field]);
    }
    return newArr
}

function mean(arr) {
    if (arr.length == 0) {
        console.error("Attempted to find mean of an empty array")
        return 0;
    }
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum / arr.length;
}

function median(arr) {
    arrSorted = arr.sort();

    if (arr.length == 0) {
        console.error("Attempted to find median of an empty array")
        return 0;
    }
    return arr[Math.floor(arr.length / 2)]
}

function applyFunction(arr,f) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push(f(arr[i]));
    }
    return newArr
}

function meanVariance(arr,val){
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += Math.abs(val-arr[i])
    }
    return sum/arr.length
}

function divideArr(arr1,arr2){
    let newArr = []
    for (let i = 0; i < arr1.length; i++) {
        newArr.push((arr1[i])/arr2[i]);
    }
    return newArr

}