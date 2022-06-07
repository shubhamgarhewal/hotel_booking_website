let urlParams = new URLSearchParams(window.location.search);
const API_URL = "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=eiffel%20tower&lang=en_US&units=km";  
const traveladvisorHost = "travel-advisor.p.rapidapi.com";
const traveladvisorKey = "55217b26bamshfabd0bc7cc0eca4p1ecb08jsn6941f10ded1d";

let initMap = locations => {
    let center = {lat: parseFloat(locations[0][1]), lng: parseFloat(locations[0][2])};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: center
    });
    let infoWindow =  new google.maps.InfoWindow({});
    let marker, count;
    for (count = 0; count < locations.length; count++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[count][1], locations[count][2]),
            map: map,
            title: locations[count][0]
        });
        google.maps.event.addListener(marker, 'click', ((marker, count) => {
            return function() {
                infoWindow.setContent(locations[count][0]);
                infoWindow.open(map, marker);
            }
        })(marker, count));
    }
}

let initList = hotelList => {
    let hotelListElement = document.getElementById('hotel-list');
    hotelList.forEach(hotel => {
        let hotelLinkElement = document.createElement("a");
        hotelLinkElement.setAttribute("href", `detail.html?id=` + hotel.result_object.location_id);
        hotelListElement.appendChild(hotelLinkElement);
        let hotelContainer = document.createElement("div");
        hotelContainer.setAttribute("class", "hotel");
        hotelLinkElement.appendChild(hotelContainer);
        let hotelImage = "<img src=" + hotel.result_object.photo.images.medium.url + " alt='" + hotel.result_object.name + "' class='hotel-image-small'/>";
        hotelContainer.innerHTML = hotelImage;
        let hotelDetailsContainer = document.createElement("div");
        hotelDetailsContainer.setAttribute("class", "hotel-name-rating");
        hotelContainer.appendChild(hotelDetailsContainer);
        let hotelName = hotel.result_object.name;
        if(hotelName.split(' ').length > 3)
        {
            hotelDetailsContainer.innerHTML = "<h4>"+ hotel.result_object.name +"</h4>";
            hotelDetailsContainer.innerHTML += "<div id='rating'>"+ hotel.result_object.rating +" <span class='fa fa-star checked'></span></div>";
            hotelDetailsContainer.innerHTML += "<p style='font-size: small'>"+ hotel.result_object.address +"</p>";
        }
        else {
            hotelDetailsContainer.innerHTML = "<h3>"+ hotel.result_object.name +"</h3>";
            hotelDetailsContainer.innerHTML += "<div id='rating'>"+ hotel.result_object.rating +" <span class='fa fa-star checked'></span></div>";
            hotelDetailsContainer.innerHTML += "<p>"+ hotel.result_object.address +"</p>";
        } 
    });
}

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=eiffel%20tower&lang=en_US&units=km");
xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");
xhr.setRequestHeader("X-RapidAPI-Key", "55217b26bamshfabd0bc7cc0eca4p1ecb08jsn6941f10ded1d");

xhr.send(data);

fetchHotelListAPI();