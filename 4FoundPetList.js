/* eslint-env es6 */

class Pet {
	constructor(image, name, type, description, email) {
		this.image = image;
		this.name = name;
		this.type = type; 
		this.description = description; 
		this.email = email; 
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
		
		return poster; 
	}
}

const lostPets = [
	new Pet("Labradoodle.jpg", "Coco", "Dog", "Choclate brown dog, labradoodle, she has a black collar", "email@email"),
	new Pet("Husky.jpg", "Unknown", "Dog", "It's a huskt, black and white fur, blue eyes, he/she has a collar without a name", "email@email"),
	new Pet("Cat.jpg", "George", "Cat", "The cat has a red collar. It has redish fur and is a bit chubby", "email@email"),
	new Pet("Cat_1.jpg", "Unknown", "Cat", "A small cat brown and black stripes. He was waiting in front of my door", "email@email")
	]

var nameFilter = "";
var typesFilter = [];

function updatePosters() {
	var lostPetsContainer = document.getElementById("lostPetsContainer");
	lostPetsContainer.innerHTML = ''; // Clear container
	for (var pet of lostPets) {
		
		// Check if pet has the correct name
		if (!(new RegExp(nameFilter.toLowerCase())).test(pet.name.toLowerCase())) continue;
		
		// Check if pet is of the correct type
		if (typesFilter.length != 0 && !typesFilter.some(function(type) { return pet.type == type; })) continue;
		
		lostPetsContainer.appendChild(pet.createPoster());
	}
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