var searchParams = new URLSearchParams(window.location.search);

var id= searchParams.get("id") 
 
fetch("http://localhost:3000/api/teddies/"+id)
    .then(function(res) {
        if (res.ok) {
            return res.json();    
        }
    })
    .then (function(teddy) {
        //création vignetteDetail 
        const vignetteDetail = document.createElement("div");
        vignetteDetail.classList.add("vignette-detail"); 
        
        //création conteneur vignettes
        const conteneurVignettes = document.getElementById("main");
        conteneurVignettes.appendChild(vignetteDetail);

     
       
        //insertion nom de l'ours
        
        const nom = document.createElement("h2");
        vignetteDetail.appendChild(nom); 
        nom.textContent = teddy.name;
        nameOurs = teddy.name;
        
        //insertion photo de l'ours
        const photo = document.createElement("img");
        vignetteDetail.appendChild(photo); 
        photo.setAttribute("src", teddy["imageUrl"]);
        photo.setAttribute("width", "280");
        photo.setAttribute("height", "200");
        photo.setAttribute("alt", "Photo de " + teddy.name);
        

        //insertion description de l'ours
        const description = document.createElement("p");
        vignetteDetail.appendChild(description); 
        description.textContent = teddy.description;

        //insertion prix de l'ours
        const prix = document.createElement("h3");
        vignetteDetail.appendChild(prix);
        prix.textContent = teddy.price + " €";
        prix.setAttribute ("id", "prix-ours");

        //création menu déroulant pour choix couleur de l'ours
        const selectionCouleur = document.createElement("select");
        vignetteDetail.appendChild(selectionCouleur);
        selectionCouleur.setAttribute ("required", "true");
        selectionCouleur.setAttribute("id", "couleur-selectionnee");
        
        
        // insertion des options de couleur pour les ours dans le menu déroulant
        function creerOption(valeur1, valeur2) {
            var valeur1 = document.createElement("option");
            valeur1.textContent = teddy.colors[valeur2];
            selectionCouleur.appendChild (valeur1);
        }

       creerOption("couleurA", 0);
       creerOption("couleurB", 1);
       creerOption("couleurC", 2);

        // création bouton ajouter au panier
        const soumettre = document.createElement ("input");
        vignetteDetail.appendChild (soumettre);
        soumettre.setAttribute ("value", "Ajouter au panier");
        soumettre.setAttribute ("type", "submit");
        soumettre.setAttribute ("id", "Ajout-panier");
    
        // Sauvegarder produits ajoutés dans local storage
        document.getElementById('Ajout-panier').onclick = function() {
            if(typeof localStorage!='undefined' && JSON) {
                if (localStorage.getItem('panier') == null) {
                    var ligneProduitAjoute = {
                        'id': teddy._id,
                        'nom': teddy.name,
                        'couleur': document.getElementById("couleur-selectionnee").value,
                        'prix': teddy.price,
                        'quantite': 1
                    }
                    var panier = [ligneProduitAjoute];
                    
                    var panier_json = JSON.stringify(panier);
                    localStorage.setItem("panier",panier_json);
                    alert("Produit ajouté au panier");

                } else {
                    var panier_json = localStorage.getItem("panier");
                    var panier = JSON.parse(panier_json);

                    for (var j in panier){
                        if ((panier[j].nom==teddy.name) && (panier[j].couleur==document.getElementById("couleur-selectionnee").value)){
                            panier[j].quantite++;
                            var produitTrouve=true;
                        }    
                    }

                    if (produitTrouve==null){
                        var ligneProduitAjoute =  {
                            'id': teddy._id,
                            'nom': teddy.name,
                            'couleur': document.getElementById("couleur-selectionnee").value,
                            'prix': teddy.price,
                            'quantite': 1
                        }

                        panier.push(ligneProduitAjoute);
                    } 

                    var panier_json = JSON.stringify(panier);
                    localStorage.setItem("panier",panier_json);
                    alert("Produit ajouté au panier");
                }
    
            } else { 
                alert("localStorage n'est pas supporté"); 
            }
        }

    })
    .catch(function(err) {
        console.log(err);
    });

   
