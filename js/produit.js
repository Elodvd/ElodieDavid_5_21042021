var searchParams = new URLSearchParams(window.location.search);

var id= searchParams.get("id") 
console.log(id)

var request = new XMLHttpRequest();
request.onreadystatechange = function() { 
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) { 
        var request = JSON.parse(this.responseText);
        for (var i in request) {
            if (id == request[i]._id){
                
                //création vignetteDetail 
                const vignetteDetail = document.createElement("div");
                vignetteDetail.classList.add("vignette-detail"); 
                
                //création conteneur vignettes
                const conteneurVignettes = document.getElementById("main");
                conteneurVignettes.appendChild(vignetteDetail);

                //insertion nom de l'ours
                const nom = document.createElement("h2");
                vignetteDetail.appendChild(nom);
                nom.textContent = request[i].name;
                

                //insertion photo de l'ours
                const photo = document.createElement("img");
                photo.setAttribute("src", request[i]["imageUrl"]);
                photo.setAttribute("width", "280");
                photo.setAttribute("height", "200");
                photo.setAttribute("alt", "Photo de " + request[i].name);
                vignetteDetail.appendChild(photo);

                //insertion description de l'ours
                const description = document.createElement("p");
                vignetteDetail.appendChild(description);
                description.textContent = request[i].description;

                //insertion prix de l'ours
                const prix = document.createElement("h3");
                vignetteDetail.appendChild(prix);
                prix.textContent = request[i].price + " €";
                
                //choix couleur de l'ours
                
                const selectionCouleur = document.createElement("select");
                vignetteDetail.appendChild(selectionCouleur);
                selectionCouleur.setAttribute ("required", "true");
                
                const couleurA = document.createElement("option");
                couleurA.textContent = request[i].colors[0];
                selectionCouleur.appendChild (couleurA);

                const couleurB = document.createElement("option");
                couleurB.textContent = request[i].colors[1];
                selectionCouleur.appendChild (couleurB);

                const couleurC = document.createElement("option");
                couleurC.textContent = request[i].colors[2];
                selectionCouleur.appendChild (couleurC);

                // bouton ajouter au panier
                const soumettre = document.createElement ("input");
                vignetteDetail.appendChild (soumettre);
                soumettre.setAttribute ("value", "Ajouter au panier");
                soumettre.setAttribute ("type", "submit");
                console.log(soumettre);

            }
        }
            

    }
}
        request.open("GET", "http://localhost:3000/api/teddies");
        request.send();
        