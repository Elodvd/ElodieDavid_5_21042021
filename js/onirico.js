// affichage liste ours

fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
        return res.json();      
    }
  })
  .then(function(request) {
    console.log(request);

    for (var i in request) {
        var id = request[i]._id;
        const vignette = document.createElement("div");
        const nom = document.createElement("h2");
        
        const photo = document.createElement("img");
        photo.setAttribute("src", request[i]["imageUrl"]);
        photo.setAttribute("width", "280");
        photo.setAttribute("height", "200");
        photo.setAttribute("alt", "Photo de " + request[i].name);

        const prix = document.createElement("h3");
        
        const bouton=document.createElement("button");
        bouton.classList.add("bouton-click-detail");
        const lienBouton = document.createElement("a");
        lienBouton.setAttribute("href", "produit.html?id="+id);
        lienBouton.textContent = "Voir le produit"

        const conteneurVignettes = document.getElementById("main");
        conteneurVignettes.appendChild(vignette);
        
        vignette.classList.add("vignette-accueil"); 
        const vignetteAccueil = document.getElementsByClassName("vignette-accueil");
        
        vignetteAccueil[i].appendChild(nom);
        vignetteAccueil[i].appendChild(photo);
        vignetteAccueil[i].appendChild(prix);
        vignetteAccueil[i].appendChild(bouton);

        const btnClickDetail = document.getElementsByClassName("bouton-click-detail");
        btnClickDetail[i].appendChild(lienBouton);


        nom.textContent = request[i].name;
        prix.textContent = request[i].price + " €";
    }
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

/*var request = new XMLHttpRequest();
request.onreadystatechange = function() { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
        var request = JSON.parse(this.responseText);
        for (var i in request) {
            var id = request[i]._id;
            const vignette = document.createElement("div");
            const nom = document.createElement("h2");
            
            const photo = document.createElement("img");
            photo.setAttribute("src", request[i]["imageUrl"]);
            photo.setAttribute("width", "280");
            photo.setAttribute("height", "200");
            photo.setAttribute("alt", "Photo de " + request[i].name);

            const prix = document.createElement("h3");
            
            const bouton=document.createElement("button");
            bouton.classList.add("bouton-click-detail");
            const lienBouton = document.createElement("a");
            lienBouton.setAttribute("href", "produit.html?id="+id);
            lienBouton.textContent = "Voir le produit"

            const conteneurVignettes = document.getElementById("main");
            conteneurVignettes.appendChild(vignette);
            
            vignette.classList.add("vignette-accueil"); 
            const vignetteAccueil = document.getElementsByClassName("vignette-accueil");
            
            vignetteAccueil[i].appendChild(nom);
            vignetteAccueil[i].appendChild(photo);
            vignetteAccueil[i].appendChild(prix);
            vignetteAccueil[i].appendChild(bouton);

            const btnClickDetail = document.getElementsByClassName("bouton-click-detail");
            btnClickDetail[i].appendChild(lienBouton);


            nom.textContent = request[i].name;
            prix.textContent = request[i].price + " €";
            
        }
    }

}
request.open("GET", "http://localhost:3000/api/teddies");
request.send();
*/
