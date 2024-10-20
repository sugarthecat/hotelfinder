//top cities is a global variable, can be accessed in sketch.js
var topCities = []

/**
 * @param citylist A list of strings, with each one corresponding to a city.
 */
function parseCities(citylist) {
    let prevCities = []
    let newCities = cities.slice()
    let uCities = citylist.slice() //undecided cities
    for (let i = 0; i < cities.length; i++) {
        for (let j = 0; j < uCities.length; j++) {
            if (uCities[j].toLowerCase() == cities[i].city_ascii.toLowerCase()) {
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
    for (let i = 0; i < 6; i++) {
        topCities[i] = newCities[i];
    }
    let prevCities = parse.prevCities;
    //data analysis time
    //population (compared logarithmically)
    let logpops = applyFunction(getField(prevCities, "population"), log)
    let meanlogpop = mean(logpops)
    let popVariance = max(0.001, meanVariance(logpops, meanlogpop))
    //GDP per capita
    let gdpPerCapita = divideArr(getField(prevCities, "GDP"), getField(prevCities, "population"))
    let meanGDPCapita = mean(gdpPerCapita);
    let meanWealthVariance = max(0.001, meanVariance(gdpPerCapita, meanGDPCapita));
    //distance
    let latitudes = getField(prevCities, "lat")
    let avgLatitude = mean(latitudes)
    let longidutes = getField(prevCities, "lng");
    let avgLong = mean(longidutes);
    if (avgLoopDist(longidutes, avgLong - 180) < avgLoopDist(longidutes, avgLong)) {
        avgLong = avgLong - 180;
    }

    let distFunction = function (city) { return cityDist({ lng: avgLong, lat: avgLatitude }, city) }
    let distances = applyFunction(prevCities, distFunction);
    let avgDist = mean(distances);
    //console.log(logpops,meanlogpop,popVariance)
    function scoringFunction(city) {
        let score = 0;
        score -= cityDist({ lng: avgLong, lat: avgLatitude }, city) / avgDist / 2;
        score -= Math.abs(meanlogpop - log(city.population)) / popVariance;
        score -= Math.abs(meanGDPCapita - city.GDP / city.population) / meanWealthVariance;
        return score
    }
    if (isNaN(scoringFunction(newCities[0]))) {
        console.error("City scoring function producing invalid input")
    }
    for (let i = 0; i < newCities.length; i++) {
        if (scoringFunction(topCities[5]) < scoringFunction(newCities[i])) {
            topCities[5] = newCities[i];
            let j = 5;
            while (j > 0 && scoringFunction(topCities[j - 1]) < scoringFunction(topCities[j])) {
                let temp = topCities[j - 1];
                topCities[j - 1] = topCities[j];
                topCities[j] = temp;
                j--;
            }
        }
    }
    return topCities
}

function getTopCities(){
    return topCities;
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

function applyFunction(arr, f) {
    let newArr = []
    for (let i = 0; i < arr.length; i++) {
        newArr.push(f(arr[i]));
    }
    return newArr
}

function meanVariance(arr, val) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += Math.abs(val - arr[i])
    }
    return sum / arr.length
}

function divideArr(arr1, arr2) {
    let newArr = []
    for (let i = 0; i < arr1.length; i++) {
        newArr.push((arr1[i]) / arr2[i]);
    }
    return newArr

}
function loopDist(point1, point2) {
    return min(abs(point1 - point2)/*, abs(360 - abs(point1 - point2))*/)
}
function avgLoopDist(arr, point) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += loopDist(point, arr[i])
    }
    return sum / arr.length;
}
//credit:
//https://www.movable-type.co.uk/scripts/latlong.html
function cityDist(city1, city2) {
    const R = 6371e3; // metres
    const φ1 = city1.lat * Math.PI / 180; // φ, λ in radians
    const φ2 = city2.lat * Math.PI / 180;
    const Δφ = (city2.lat - city1.lat) * Math.PI / 180;
    const Δλ = (city2.lng - city1.lng) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
}