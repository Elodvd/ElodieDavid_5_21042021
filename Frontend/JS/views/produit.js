//création des éléments HTML et de leurs attributs
const vignetteDetail = document.createElement("div");
const conteneurVignettes = document.getElementById("main");
const nom = document.createElement("h2");
const photo = document.createElement("img");
const description = document.createElement("p");
const prix = document.createElement("h3");
const selectionCouleur = document.createElement("select");
const soumettre = document.createElement("input");

vignetteDetail.classList.add("vignette-detail");

conteneurVignettes.appendChild(vignetteDetail);
vignetteDetail.appendChild(nom);
vignetteDetail.appendChild(photo);
vignetteDetail.appendChild(description);
vignetteDetail.appendChild(prix);
vignetteDetail.appendChild(selectionCouleur);
vignetteDetail.appendChild(soumettre);

selectionCouleur.setAttribute("required", "true");
selectionCouleur.setAttribute("id", "couleur-selectionnee");

soumettre.setAttribute("value", "Ajouter au panier");
soumettre.setAttribute("type", "submit");
soumettre.setAttribute("id", "Ajout-panier");

prix.setAttribute("id", "prix-ours");

photo.classList.add("photo-ours-detail");

//récupération de l'ID de l'ours
var searchParams = new URLSearchParams(window.location.search);
var id = searchParams.get("id");

fetch("http://localhost:3000/api/teddies/" + id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (teddy) {
    nom.textContent = teddy.name;
    photo.setAttribute("src", teddy["imageUrl"]);
    photo.setAttribute("alt", "Photo de " + teddy.name);
    description.textContent = teddy.description;
    prix.textContent = teddy.price/100 + " €";

    // insertion des options de couleur dans le menu déroulant
    function creerOption(couleur, emplacement) {
      var couleur = document.createElement("option");
      couleur.textContent = teddy.colors[emplacement];
      selectionCouleur.appendChild(couleur);
    }
    creerOption("couleurA", 0);
    creerOption("couleurB", 1);
    creerOption("couleurC", 2);

    // Sauvegarder produits ajoutés dans local storage
    document.getElementById("Ajout-panier").onclick = function () {
      if (typeof localStorage != "undefined" && JSON) {
        // S'il n'y a rien dans le panier, on créé une première ligne pour le produit
        if (localStorage.getItem("panier") == null) {
          var ligneProduitAjoute = new Produit(teddy._id, teddy.name, document.getElementById("couleur-selectionnee").value, teddy.price, 1);

          var panier = [ligneProduitAjoute];

          var panier_json = JSON.stringify(panier);
          localStorage.setItem("panier", panier_json);
          alert("Produit ajouté au panier");
        } else {
          panier_json = localStorage.getItem("panier");
          panier = JSON.parse(panier_json);
          //on vérifie si le même produit est déjà présent dans le panier, si oui on augmente la quantité
          for (var j in panier) {
            if (panier[j].nom == teddy.name && panier[j].couleur == document.getElementById("couleur-selectionnee").value) {
              panier[j].quantite++;
              var produitTrouve = true;
            }
          }
          // si le produit n'est pas encore présent dans le panier, on ajoute une nouvelle ligne au tableau
          if (produitTrouve == null) {
            var ligneProduitAjoute = new Produit(teddy._id, teddy.name, document.getElementById("couleur-selectionnee").value, teddy.price, 1);
            panier.push(ligneProduitAjoute);
          }

          var panier_json = JSON.stringify(panier);
          localStorage.setItem("panier", panier_json);
          alert("Produit ajouté au panier");
        }
      } else {
        alert("localStorage n'est pas supporté");
      }
    };
  })
  .catch(function (err) {
    console.log(err);
  });
