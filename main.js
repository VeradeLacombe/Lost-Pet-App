// JavaScript Document
const name = document.getElementById ("location"). submit ();
const form = document.getElementById ("form")

form.addEventListener ("submit", (e)=> {
	let messages = []
	if (location.value ==="" || name.value == null) {
		messages.push ("Location is required")
	}
	
	if (messages.length > 0){
		e.preventDefault ()
		errorElement.innerText = messages.join (",")
	}

})