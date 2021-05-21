if (typeof localStorage != "undefined" && JSON) {
  if (localStorage.getItem("commande") == null) {
    // affichage d'un message si aucune commande en cours
    document.getElementById("txt-no-commande").innerHTML = "Vous n'avez aucune commande en cours.";
    // sinon affichage d'un message de remerciement + numéro de commande et montant total du panier
  } else {
    let commande_json = localStorage.getItem("commande");
    let commande = JSON.parse(commande_json);

    let merci = document.getElementById("merci");
    merci.innerHTML = "Nous vous remercions pour vos achats !";

    let numeroCommande = document.getElementById("numero-commande");
    numeroCommande.innerHTML = "Votre numéro de commande : " + commande.orderId;

    let montantTotal = document.getElementById("montant-total");
    montantTotal.innerHTML = "Montant total de vos achats : " + commande.totalPanier + "€";
  }
}
// suppression du contenu du local storage pour finir 
localStorage.clear();
