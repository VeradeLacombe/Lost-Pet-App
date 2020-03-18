import Pet from "./Pet.js"

const lostPets = [
	new Pet("Pepper_cat.jpeg", "Pepper", "Cat", "A small cat with grey hair.", "email@email"),
	new Pet("Bella_dog.webp", "Bella", "Dog", "It is a Golden Retriever. She has white fur.", "email@email"),
	new Pet("Lucky_cat.jpeg", "Lucky", "Cat", "A small cat with brown hair.", "email@email"),
	new Pet("Rebbel_cat.jpeg", "Cookies", "Cat", "A small cat with black hair and white socks and chest.", "email@email")
]

var nameFilter = "";
var typesFilter = [];

function updatePosters() {
	var lostPetsContainer = document.getElementById("lostPetsContainer");
	lostPetsContainer.innerHTML = ''; // Clear container
	for (var pet of lostPets) {
		
		// Check if pet has the correct name
		if (!(new RegExp(nameFilter)).test(pet.name)) continue;
		
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