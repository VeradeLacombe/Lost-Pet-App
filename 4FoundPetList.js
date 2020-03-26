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
	window.location.href = "PosterViewFound.html";
}

const lostPets = [
	new Pet("Labradoodle.jpg", "Coco", "Dog", "Choclate brown dog, labradoodle, she has a black collar", "email@email", "09-02-2020", "Breda", "Brown"),
	new Pet("Husky.jpg", "Unknown", "Dog", "It's a husky, black and white fur, blue eyes, he/she has a collar without a name", "email@email", "30-12-2019", "Rotterdam", "White"),
	new Pet("Cat.jpg", "George", "Cat", "The cat has a red collar. It has redish fur and is a bit chubby", "email@email", "26-03-2020", "Prinsenbeek", "Orange"),
	new Pet("Cat_1.jpg", "Unknown", "Cat", "A small cat brown and black stripes. He was waiting in front of my door", "email@email", "07-11-2019", "Ulvenhout", "Brown")
	]

var nameFilter = "";
var typesFilter = [];

function updatePosters() {
	var lostPetsContainer = document.getElementById("lostPetsContainer");
	lostPetsContainer.innerHTML = ''; // Clear container
	
	// Retrieve the foundPetList from local storage
	if (localStorage.foundPetList != undefined) {
		var foundPetList = JSON.parse(localStorage.foundPetList);
		
		for (var i = 0; i < foundPetList.length; i++) {
			var pet = Pet.unserialize(foundPetList[i]);

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