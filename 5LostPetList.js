/* eslint-env es6 */

class Pet {
	constructor(image, name, type, description, email, date, location, color) {
		this.image = image;
		this.name = name;
		this.type = type; 
		this.description = description; 
		this.email = email;
		this.date = date;
		this.location = location;
		this.color = color;
	}
	
	createPoster() {
		// Create image container
		var imageContainer = document.createElement("div");
		imageContainer.className = "imageContainer";
		var image = document.createElement("img");
		image.className = "image";
		image.src = this.image;
		imageContainer.appendChild(image);
		
		// Create name container
		var nameContainer = document.createElement("p");
		nameContainer.className = "nameContainer";
		nameContainer.innerHTML = this.name;
		
		// Create type container
		var typeContainer = document.createElement("p");
		typeContainer.className = "typeContainer";
		typeContainer.innerHTML = this.type;
		
		// Create description container
		var descriptionContainer = document.createElement("p");
		descriptionContainer.className = "descriptionContainer";
		descriptionContainer.innerHTML = this.description;
		
		// Create poster, which contains the containers made above
		var poster = document.createElement("div");
		poster.className = "poster";
		poster.appendChild(imageContainer);
		poster.appendChild(nameContainer);
		poster.appendChild(typeContainer);
		poster.appendChild(descriptionContainer);
		
		// Make poster clickable
		poster.setAttribute("onclick", 'openPosterView("' + encodeURI(this.image) + '", "' + encodeURI(this.name) + '", "' + encodeURI(this.type) + '", "' + encodeURI(this.description) + '", "' + encodeURI(this.email) + '", "' + encodeURI(this.date) + '", "' + encodeURI(this.location) + '", "' + encodeURI(this.color) + '");');
		
		return poster; 
	}
}

Pet.prototype.toString = function () {
    return JSON.stringify({
		"image": this.image,
        "name": this.name,
		"type": this.type,
		"description": this.description,
		"email": this.email,	
		"date": this.date,
		"location": this.location,
		"color": this.color,
    });
};

Pet.unserialize = function (data) {
    data = JSON.parse(data);
    var pet = new Pet;
	pet.image = data.image;
    pet.name = data.name;
	pet.type = data.type;
	pet.description = data.description;
	pet.email = data.email;
	pet.date = data.date;
	pet.location = data.location;
	pet.color = data.color;
    return pet;
}

function openPosterView(image, name, type, description, email, date, location, color) {
	localStorage.posterViewPet = new Pet(decodeURI(image), decodeURI(name), decodeURI(type), decodeURI(description), decodeURI(email), decodeURI(date), decodeURI(location), decodeURI(color));
	window.location.href = "PosterViewLost.html";
}

const lostPets = [
	new Pet("Pepper_cat.jpeg", "Pepper", "Cat", "A small cat with grey hair.", "Vera@email", "23-03-2020", "Ulvenhout", "Grey"),
	new Pet("Bella_dog.jpg", "Bella", "Dog", "It is a Golden Retriever. She has white fur.", "Julia@email", "09-01-2020", "Breda", "White"),
	new Pet("Lucky_cat.jpeg", "Lucky", "Cat", "A small cat with brown hair.", "LuckyCat@email", "25-10-2019", "Prinsenbeek", "Brown"),
	new Pet("Rebbel_cat.jpeg", "Cookies", "Cat", "A chubby cat with orange hair and white socks and chest.", "mycat@email", "22-03-2020", "Rotterdam", "Orange")
]

var nameFilter = "";
var typesFilter = [];

function updatePosters() {
	var lostPetsContainer = document.getElementById("lostPetsContainer");
	lostPetsContainer.innerHTML = ''; // Clear container
	
	// Retrieve the lostPetList from local storage
	if (localStorage.lostPetList != undefined) {
		var lostPetList = JSON.parse(localStorage.lostPetList);
		
		for (var i = 0; i < lostPetList.length; i++) {
			var pet = Pet.unserialize(lostPetList[i]);

			displayPet(pet, lostPetsContainer);
		}
	}
	
	for (var j = 0; j < lostPets.length; j++) {
		displayPet(lostPets[j], lostPetsContainer);
	}		
}

function displayPet(pet, lostPetsContainer) {
	// Check if pet has the correct name
		if (!(new RegExp(nameFilter.toLowerCase())).test(pet.name.toLowerCase())) return;
		
		// Check if pet is of the correct type
		if (typesFilter.length != 0 && !typesFilter.some(function(type) { return pet.type == type; })) return;
		
		lostPetsContainer.appendChild(pet.createPoster());
}

function togglePopup() {
	if (document.getElementById('filterPopup').style.display == "") {
		document.getElementById('filterPopup').style.display = "block";
	}
	else {
		document.getElementById('filterPopup').style.display = "";
	}
}

$(document).ready(function() {
	// Update posters
    updatePosters();
	
	// Update posters, when user uses the search bar
	$("#searchBar").on("input", function() {
		nameFilter = document.getElementById("searchBar").value;
		updatePosters();
	});
	
	$(".filter").on("input", function() {
		var elements = document.getElementsByClassName("filter");
		var newTypesFilter = [];
		
		for (var element of elements) {
			if(element.checked) {
				newTypesFilter.push(element.value);
			}
		}
		
		typesFilter = newTypesFilter;
		updatePosters();
	})
});