//création éléments HTML
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

panierVide = document.getElementById("panier-vide");

var formulaire = document.getElementById("formulaire");

// On récupère les données que l'on a stockées dans le local storage depuis la page produit
if (typeof localStorage != "undefined" && JSON) {
  if (localStorage.getItem("panier") == null) {
    // si le panier est vide alors on affiche pas le formulaire créé dans le fichier panier.html
    formulaire.style.visibility = "hidden";
    conteneurTableau.style.visibility = "hidden";
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
      pxOurs.innerHTML = panier[i].prix + " €";

      /* Affichage du prix total de la ligne */
      var tdTotalOurs = document.createElement("td");
      ajoutLigneTableau.appendChild(tdTotalOurs);
      var pxTotalOurs = panier[i].prix * panier[i].quantite;
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

// vérification du bon format de l'email avec une regex avant envoi
function validationEmail(email) {
  var verif = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
  if (verif.exec(email) == null) {
    return false;
  } else {
    return true;
  }
}

//vérification du bon format du nom, prénom et ville - accepte seulement lettres, espaces et tirets
function validationChampsTexte(texte) {
  const result = /^[a-zA-Z\-\s]*$/.test(texte);
  console.log(texte + " : " + result);
  return /^[a-zA-Z\-\s]*$/.test(texte);
}

// Création class Commande
class Commande {
  constructor(prenom, nom, adresse, ville, email, panier) {
    this.contact = {
      firstName: prenom,
      lastName: nom,
      address: adresse,
      city: ville,
      email: email,
    };
    this.products = panier;
  }
}


// vérification champs remplis +  fonction bon format + fonction email au click sur "valider commande"
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
        /*var contact = {
          firstName: prenom,
          lastName: nom,
          address: adresse,
          city: ville,
          email: email,
        }

        //création d'une variable commande qui contient les champs du formulaire + le contenu du tableau de produits
        var commande = {
          contact: contact,
          products: products,
        };*/
        var commande = new Commande(prenom, nom, adresse, ville, email, products);
        console.log("TEST CLASS COMMANDE :");
        console.log(commande.contact.firstName);
        console.log(commande.products);
        // envoi des infos à l'API
        event.preventDefault();
        fetch("http://localhost:3000/api/teddies/order", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commande),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json();
            }
          })
          // récupération du numéro de commande
          .then(function (value) {
            window.location.href = "commande.html?orderId=" + value.orderId + "&totalPanier=" + totalPanier;
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
