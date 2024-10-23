let currSlide = 1;
let userCities = []
let destinations = []
let cityHotels = [null, null, null, null, null, null];
function switchToSlide(slide) {
    panning = slide <= 3;
    if (slide == 3) {
        userCities = []
        for (let i = 1; i <= 6; i++) {
            userCities.push(document.getElementById('city' + i).value)
        }
        if (parseCities(userCities).prevCities.length <= 0) {
            switchToSlide(0);
            return;
        } else {
            destinations = reccommendCities(userCities);
            //console.log(destinations)
            for (let i = 0; i < destinations.length; i++) {
                document.getElementById(`slide${i}title`).innerText = (i + 1) + ") " + destinations[i].city
                document.getElementById(`slide${i}country`).innerText = destinations[i].country
                cityHotels[i] = [];
                for (let j = 0; j < hotels.length; j++) {
                    if (hotels[j][" cityName"] == destinations[i].city_ascii && hotels[j][" countyName"] == destinations[i].country) {
                        switch (hotels[j][" HotelRating"]) {
                            case "ThreeStar":
                                cityHotels[i][2] = hotels[j];
                                break;
                            case "FourStar":
                                cityHotels[i][1] = hotels[j];
                                break;
                            case "FiveStar":
                                cityHotels[i][0] = hotels[j];
                                break;
                        }
                        if (cityHotels[i].length == 3 && cityHotels[i][0] !== undefined && cityHotels[i][1] !== undefined) {
                            break;
                        }
                    }
                }
            }
        }
    }
    if (slide > 3) {
        targetLat = destinations[slide - 4].lat;
        targetLong = 180 - destinations[slide - 4].lng;
        let hotels = cityHotels[slide - 4];
        document.getElementById("hotelInfo").hidden = (hotels.length == 0)
        for (let i = 0; i < hotels.length; i++) {
            document.getElementById(`hotel${i + 1}`).innerText = stringifyHotel(hotels[i])
        }
    } else {

        document.getElementById("hotelInfo").hidden = true
    }
    document.getElementById(`slide${currSlide}`).hidden = true;
    //print((i+1) + ") " + destinations[i].city)
    //    print(r)


    currSlide = slide;
    document.getElementById(`slide${currSlide}`).hidden = false
    //print(currSlide - 4);
}

function getCurrSlide() {
    return currSlide - 4;
}

let cities = [];
async function loadCities() {
    cities = await fetch("cities.json").then(x => x.json());
}

let hotels = [];
async function loadHotels() {
    hotels = await fetch("tophotels.json").then(x => x.json());
}
function stringifyHotel(hotel) {
    if (hotel === undefined) {
        return "";
    }
    starsSymbol = ""
    switch (hotel[" HotelRating"]) {
        case "ThreeStar":
            starsSymbol = "★★★☆☆"
            break;
        case "FourStar":
            starsSymbol = "★★★★☆"
            break;
        case "FiveStar":
            starsSymbol = "★★★★★"
            break;
    }
    return `${hotel[" HotelName"]} ${starsSymbol}`
}
loadCities();
loadHotels();