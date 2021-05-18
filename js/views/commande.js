if (typeof localStorage != "undefined" && JSON) {
  if (localStorage.getItem("commande") == null) {
    // affichage d'un message si aucune commande en cours
    document.getElementById("txt-no-commande").innerHTML = "Vous n'avez aucune commande en cours.";
    // sinon affichage d'un message de remerciement + numéro de commande et montant total du panier
  } else {
    var commande_json = localStorage.getItem("commande");
    var commande = JSON.parse(commande_json);

    var merci = document.getElementById("merci");
    merci.innerHTML = "Nous vous remercions pour vos achats !";

    var numeroCommande = document.getElementById("numero-commande");
    numeroCommande.innerHTML = "Votre numéro de commande : " + commande.orderId;

    var montantTotal = document.getElementById("montant-total");
    montantTotal.innerHTML = "Montant total de vos achats : " + commande.totalPanier + "€";
  }
}
// suppression du contenu du local storage pour finir 
localStorage.clear();
