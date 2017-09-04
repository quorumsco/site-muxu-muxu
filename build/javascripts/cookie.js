var getCookie = function(key) {
  var cookies = document.cookie;
  var values = cookies.split(';');
  var item = null;
  values.forEach(function(val) {
    var keyVal = val.split('=');
    if (keyVal[0].trim() == key) {
      item = keyVal[1].trim();
    }
  });
  return item;
};

CNIL_KEY = 'CNIL_DISPLAYED';

var cnil = getCookie(CNIL_KEY);

if (!cnil) {
  var cnilMessage = document.getElementById('cnil_message');
  cnilMessage.style.display = 'block';
} else {
  closeCnilBanner();
}

document.cookie = CNIL_KEY + '=true';
