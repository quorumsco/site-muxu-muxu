var tagAnalyticsCNIL = {};
tagAnalyticsCNIL.CookieConsent = function() {
    // Remplacez la valeur UA-XXXXXX-Y par l'identifiant analytics de votre site.
    var gaProperty = 'UA-77145294-1';
    // Désactive le tracking si le cookie d'Opt-out existe déjà .
    var disableStr = 'ga-disable-' + gaProperty;
    var firstCall = false;

    //Cette fonction retourne la date d'expiration du cookie de consentement
    function getCookieExpireDate() {
        // Le nombre de millisecondes que font 13 mois
        var cookieTimeout = 33696000000;
        var date = new Date();
        date.setTime(date.getTime()+cookieTimeout);
        var expires = "; expires="+date.toGMTString();
        return expires;
    }

    //Cette fonction vérifie si on  a déjà  obtenu le consentement de la personne qui visite le site.
    function checkFirstVisit() {
        var consentCookie =  getCookie('hasConsent');
        if ( !consentCookie ) return true;
    }

    //Affiche une  bannière d'information en haut de la page
    function showBanner(){
        var bodytag = document.getElementsByTagName('body')[0];
        var div = document.createElement('div');
        div.setAttribute('id','cookie-banner');
        div.setAttribute('width','70%');
        // Le code HTML de la demande de consentement
        div.innerHTML =  '\
          <div id="cookie-banner-message" class="cookie-banner-message" align="center">\
            🍪 Ce site utilise Google Analytics. En continuant à  naviguer, vous nous autorisez à  déposer un cookie à des \
            fins de mesure d\'audience. \
            <a href="javascript:tagAnalyticsCNIL.CookieConsent.showInform()" class="cookie-banner-message-link"> \
              En savoir plus ou s\'opposer.\
            </a>\
          </div>\
        ';
        // Vous pouvez modifier le contenu ainsi que le style
        // Ajoute la bannière juste au début de la page
        bodytag.insertBefore(div,bodytag.firstChild);
        document.getElementsByTagName('body')[0].className+=' cookiebanner';
        createInformAndAskDiv();
    }

    // Fonction utile pour récupérer un cookie à partir de son nom
    function getCookie(NameOfCookie)  {
        if (document.cookie.length > 0) {
            begin = document.cookie.indexOf(NameOfCookie+"=");
            if (begin != -1)  {
                begin += NameOfCookie.length+1;
                end = document.cookie.indexOf(";", begin);
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(begin, end));
            }
        }
        return null;
    }

    //Récupère la version d'Internet Explorer, si c'est un autre navigateur la fonction renvoie -1
    function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator.appName == 'Microsoft Internet Explorer')  {
            var ua = navigator.userAgent;
            var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }  else if (navigator.appName == 'Netscape')  {
            var ua = navigator.userAgent;
            var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                rv = parseFloat( RegExp.$1 );
        }
        return rv;
    }

    //Effectue une demande de confirmation de DNT pour les utilisateurs d'IE
    function askDNTConfirmation() {
        var r = confirm("La signal DoNotTrack de votre navigateur est activé, confirmez vous activer \
        la fonction DoNotTrack?")
        return r;
    }

    //Vérifie la valeur de navigator.DoNotTrack pour savoir si le signal est activé et est à  1
    function notToTrack() {
        if ( (navigator.doNotTrack && (navigator.doNotTrack=='yes' || navigator.doNotTrack=='1'))
            || ( navigator.msDoNotTrack && navigator.msDoNotTrack == '1') ) {
            var isIE = (getInternetExplorerVersion()!=-1)
            if (!isIE){
                return true;
            }
            return false;
        }
    }

    //Si le signal est à  0 on considère que le consentement a déjà  été obtenu
    function isToTrack() {
        if ( navigator.doNotTrack && (navigator.doNotTrack=='no' || navigator.doNotTrack==0 )) {
            return true;
        }
    }

    // Fonction d'effacement des cookies
    function delCookie(name )   {
        var path = ";path=" + "/";
        var hostname = document.location.hostname;
        if (hostname.indexOf("www.") === 0)
            hostname = hostname.substring(4);
        var domain = ";domain=" + "."+hostname;
        var expiration = "Thu, 01-Jan-1970 00:00:01 GMT";
        document.cookie = name + "=" + path + domain + ";expires=" + expiration;
    }

    // Efface tous les types de cookies utilisés par Google Analytics
    function deleteAnalyticsCookies() {
        var cookieNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"]
        for (var i=0; i<cookieNames.length; i++)
            delCookie(cookieNames[i])
    }

    //La fonction qui informe et demande le consentement. Il s'agit d'un div qui apparait au centre de la page
    function createInformAndAskDiv() {
        var bodytag = document.getElementsByTagName('body')[0];
        var div = document.createElement('div');
        div.setAttribute('id','inform-and-ask');
        div.style.width= window.innerWidth+"px" ;
        div.style.height= window.innerHeight+"px";
        div.style.display= "none";
        div.style.position= "fixed";
        // Le code HTML de la demande de consentement
        // Vous pouvez modifier le contenu ainsi que le style
        div.innerHTML =  '\
          <div id="inform-and-consent" class="cookie-popup">\
            <div><span><b>Les cookies Google Analytics</b></span></div><br>\
            <div>\
              Ce site utilise des cookies de Google Analytics, ces cookies nous aident à identifier le contenu qui vous \
              interesse le plus ainsi qu\'à repérer certains dysfonctionnements. Vos données de navigations sur ce site sont\
              envoyées à Google Inc\
            </div>\
            <div style="padding :10px 10px;text-align:center;">\
              <button style="margin-right:50px;" name="S\'opposer" onclick="tagAnalyticsCNIL.CookieConsent.gaOptout(); tagAnalyticsCNIL.CookieConsent.hideInform();" id="optout-button" >\
                S\'opposer\
              </button>\
              <button name="cancel" onclick="tagAnalyticsCNIL.CookieConsent.hideInform()">\
                Accepter\
              </button>\
            </div>\
          </div>\
        ';
        // Ajoute la bannière juste au début de la page
        bodytag.insertBefore(div,bodytag.firstChild);
    }

    function isClickOnOptOut( evt) {
        // Si le noeud parent ou le noeud parent du parent est la bannière, on ignore le clic
        return(evt.target.parentNode.id == 'cookie-banner' || evt.target.parentNode.parentNode.id =='cookie-banner'
        || evt.target.id == 'optout-button')
    }

    function consent(evt) {
        // On vérifie qu'il ne s'agit pas d'un clic sur la bannière
        if (!isClickOnOptOut(evt) ) {
            if ( !clickprocessed) {
                evt.preventDefault();
                document.cookie = 'hasConsent=true; '+ getCookieExpireDate() +' ; path=/';
                callGoogleAnalytics();
                clickprocessed = true;
                window.setTimeout(function() {evt.target.click();}, 1000)
            }
        }
    }

    // Tag Google Analytics, cette version est avec le tag Universal Analytics
    function callGoogleAnalytics() {
        if (firstCall) return;
        else firstCall = true;

        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', gaProperty , 'auto');  // Créer le tracker.
        ga('send', 'pageview');             // Envoyer l'information qu'une page a été visitée.
    }

    return {
        // La fonction d'opt-out
        gaOptout: function() {
            document.cookie = disableStr + '=true;'+ getCookieExpireDate() +' ; path=/';
            document.cookie = 'hasConsent=false;'+ getCookieExpireDate() +' ; path=/';
            var div = document.getElementById('cookie-banner');
            // Ci dessous le code de la bannià¨re affichà©e une fois que l'utilisateur s'est opposà© au dà©pot
            // Vous pouvez modifier le contenu et le style
            if ( div!= null ) div.innerHTML = '<div style="background-color:#fff;text-align:center;padding:5px;font-size:12px;\
            border-bottom:1px solid #eeeeee;" id="cookie-message"> Vous vous êtes opposé au dépôt de cookies de mesures d\'audience\
            dans votre navigateur </div>'
            window[disableStr] = true;
            clickprocessed = true;
            deleteAnalyticsCookies();
        },

        showInform: function() {
            var div = document.getElementById("inform-and-ask");
            div.style.display = "";
        },

        hideInform: function() {
            var div = document.getElementById("inform-and-ask");
            div.style.display = "none";
            var div = document.getElementById("cookie-banner");
            div.style.display = "none";
        },

        start: function() {
            //Ce bout de code và©rifie que le consentement n'a pas dà©jà  à©tà© obtenu avant d'afficher
            // la bannià¨re
            var consentCookie =  getCookie('hasConsent');
            clickprocessed = false;
            if (!consentCookie) {
                //L'utilisateur n'a pas encore de cookie, on affiche la bannià©re.
                //Si il clique sur un autre à©là©ment que la bannià©re on enregistre le consentement
                if ( notToTrack() ) {
                    //L'utilisateur a activà© DoNotTrack. Do not ask for consent and just opt him out
                    tagAnalyticsCNIL.CookieConsent.gaOptout()
                    console.log("You've enabled DNT, we're respecting your choice")
                } else {
                    if (isToTrack() ) {
                        consent();
                    } else {
                        if (window.addEventListener) {
                            window.addEventListener("load", showBanner, false);
                            document.addEventListener("click", consent, false);
                        } else {
                            window.attachEvent("onload", showBanner);
                            document.attachEvent("onclick", consent);
                        }
                    }
                }
            } else {
                if (document.cookie.indexOf('hasConsent=false') > -1)
                    window[disableStr] = true;
                else
                    callGoogleAnalytics();
            }
        }
    }
}();

tagAnalyticsCNIL.CookieConsent.start();
// Tag Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', gaProperty]);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') +
        '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
