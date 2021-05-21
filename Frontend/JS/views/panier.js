panierVide = document.getElementById("panier-vide");
let formulaire = document.getElementById("formulaire");

//création éléments HTML pour la tableau contenant les éléments du panier
const conteneurPage = document.getElementById("main-panier");
const Titretableau = document.createElement("h2");
const tableau = document.createElement("table");
const conteneurTableau = document.getElementById("conteneur-tableau");
const ligneEnTete = document.createElement("tr");

const nomEnTete = document.createElement("th");
const quantiteEnTete = document.createElement("th");
const pxUnitaireEnTete = document.createElement("th");
const pxTotalEnTete = document.createElement("th");

conteneurPage.appendChild(conteneurTableau);
conteneurTableau.appendChild(Titretableau);
conteneurTableau.appendChild(tableau);
tableau.appendChild(ligneEnTete);

ligneEnTete.appendChild(nomEnTete);
ligneEnTete.appendChild(quantiteEnTete);
ligneEnTete.appendChild(pxUnitaireEnTete);
ligneEnTete.appendChild(pxTotalEnTete);

tableau.classList.add("bordure");

// On récupère les données que l'on a stockées dans le local storage depuis la page produit
if (typeof localStorage != "undefined" && JSON) {
  if (localStorage.getItem("panier") == null) {
    // si le panier est vide alors on affiche ni le tableau ni le formulaire
    formulaire.style.visibility = "hidden";
    conteneurTableau.style.visibility = "hidden";
    //sinon, le message "votre panier est vide" n'apparait pas et on fait apparaitre le tableau + le formulaire
  } else {
    panierVide.style.visibility = "hidden";
    Titretableau.innerHTML = " Votre panier : ";
    nomEnTete.innerHTML = "Nom";
    quantiteEnTete.innerHTML = "Qté";
    pxUnitaireEnTete.innerHTML = "Prix unitaire";
    pxTotalEnTete.innerHTML = "Prix Total";

    //création d'un tableau de produits dans le local Storage sous forme de tableau
    var panier_json = localStorage.getItem("panier");
    var panier = JSON.parse(panier_json);
    var totalPanier = 0;
    var products = [];

    for (var i in panier) {
      var ajoutLigneTableau = document.createElement("tr");
      tableau.appendChild(ajoutLigneTableau);

      /* Affichage du nom du produit */
      var nomOurs = document.createElement("td");
      ajoutLigneTableau.appendChild(nomOurs);
      nomOurs.innerHTML = panier[i].nom;

      /* Affichage de la quantité du produit */
      var qteOurs = document.createElement("td");
      ajoutLigneTableau.appendChild(qteOurs);
      qteOurs.innerHTML = panier[i].quantite;

      /* Affichage du prix du produit */
      var pxOurs = document.createElement("td");
      ajoutLigneTableau.appendChild(pxOurs);
      pxOurs.innerHTML = panier[i].prix/100 + " €";

      /* Affichage du prix total de la ligne */
      var tdTotalOurs = document.createElement("td");
      ajoutLigneTableau.appendChild(tdTotalOurs);
      var pxTotalOurs = panier[i].prix/100 * panier[i].quantite;
      tdTotalOurs.innerHTML = pxTotalOurs + " €";
      totalPanier += pxTotalOurs;
    }
    /* Affichage du prix total du panier */
    var pTotalPanier = document.createElement("p");
    conteneurTableau.appendChild(pTotalPanier);
    pTotalPanier.innerHTML = "TOTAL : " + totalPanier + " €";

    /* Ajout des ID dans le tableau products */
    products.push(panier[i].id);
  }
} else {
  alert("localStorage n'est pas supporté");
}

// au click, vérification champs remplis +  formats corrects (avec les fonctions)
const submitCommande = document.getElementById("valider-commande");
submitCommande.addEventListener("click", function () {
  var nom = document.getElementById("nom").value;
  var prenom = document.getElementById("prenom").value;
  var email = document.getElementById("email").value;
  var adresse = document.getElementById("adresse").value;
  var ville = document.getElementById("ville").value;

  if (nom != "" && prenom != "" && email != "" && adresse != "" && ville != "") {
    if (validationChampsTexte(nom) && validationChampsTexte(prenom) && validationChampsTexte(ville)) {
      if (validationEmail(email)) {
        var contact = new Contact(prenom, nom, adresse, ville, email);
        var panier = new Panier(contact, products);

        // envoi des infos à l'API
        event.preventDefault();
        fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(panier),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json();
            }
          })
          // récupération du numéro de commande
          .then(function (value) {
            // sauvegarde de la commande dans le local storage
            if (typeof localStorage != "undefined" && JSON) {
              if (localStorage.getItem("commande") == null) {
                var confirmationCommande = new Commande(value.orderId, totalPanier);

                localStorage.setItem("commande", JSON.stringify(confirmationCommande));
              }
            }
            window.location.href = "commande.html";
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        alert("Mauvais format Email");
      }
    } else {
      alert("Utilisez uniquement des caractères alphabétiques dans les champs nom, prénom et ville");
    }
  }
});
