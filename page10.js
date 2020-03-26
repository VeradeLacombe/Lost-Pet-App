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

function SubmitPet(list, nextPage) {
	// If there is no PetList in localstorage
	if (localStorage.getItem(list) == undefined) {
		// Then create a list, with the newly registerd pet
		localStorage.setItem(list, JSON.stringify([localStorage.newRegisteredPet]));
	} 
	// If there already is a PetList in localstorage
	else {
		// Retrieve that list
		var petList = JSON.parse(localStorage.getItem(list));
		
		// Add the newly registered pet to it
		petList.push(localStorage.newRegisteredPet);
		
		// And store the list in local storage again
		localStorage.setItem(list, JSON.stringify(petList));
	}
	
	window.location.href = nextPage;
}

$(document).ready(function() {
	var pet = Pet.unserialize(localStorage.newRegisteredPet);
	document.getElementById("Picture").src = pet.image;
	document.getElementById("name").innerHTML = pet.name;
	document.getElementById("type").innerHTML = pet.type;
	document.getElementById("description").innerHTML = pet.description;
	document.getElementById("date").innerHTML = pet.date;
	document.getElementById("location").innerHTML = pet.location;
});