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


/*

if (screen.width <= 768) {
document.location = "responsive-index.html";
}


*/

