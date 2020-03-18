export default class Pet {
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