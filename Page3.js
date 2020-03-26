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

function readURL(input) 
{
    document.getElementById("PicturePreview").style.display = "block";

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('PicturePreview').src =  e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
	var scale = Math.max(img.width * img.height / 300000, 1);
	img.width = img.width / scale;
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function RegisterPet(nextPage) {
	var image = "data:image/png;base64," + getBase64Image(document.getElementById("PicturePreview"));
	
	var name = document.getElementById("name").value;
	if (name == "") {
		name = "Unknown";
	}
	
	var typeDropdown = document.getElementById("Kind");
	var type = typeDropdown.options[typeDropdown.selectedIndex].value;
	if (type == "Others") {
		type = document.getElementById("Pet").value;
	}
	
	var description = document.getElementById("Description").value;
	var email = document.getElementById("email").value;
	var date = document.getElementById("date").value;
	var location = document.getElementById("location").value;
	
	var colors = document.getElementsByClassName("color");
	var color;
	
	for (var i = 0; i < colors.length; i++) {
		if ($(colors[i]).is(":visible")) {
			color = colors[i].value;
			break;
		}
	}
	
	var newPet = new Pet(image, name, type, description, email, date, location, color);
	localStorage.newRegisteredPet = newPet;
	window.location.href = nextPage;
}