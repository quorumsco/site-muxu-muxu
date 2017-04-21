// This is where it all goes :)
function myMenu() {
    var x = document.getElementById("menu-toggle");
    if (x.className === "content") {
        x.className += " responsive";
    } else {
        x.className = "content";
    }
}

function closeCnilBanner() {
	var cnilMessage = document.getElementById('cnil_message');
	cnilMessage.style.display = 'none';
}