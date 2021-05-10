var searchParams = new URLSearchParams(window.location.search);

var orderId= searchParams.get("orderId");
var totalPanier=searchParams.get("totalPanier");
  
  
  if(typeof localStorage!='undefined' && JSON) {
    if (localStorage.getItem('panier') == null) {
        // affichage d'un message si aucune commande en cours
        document.getElementById("txt-no-commande").innerHTML =
      "Vous n'avez aucune commande en cours.";
    }
    else{

    var panier_json = localStorage.getItem("panier");
    var panier = JSON.parse(panier_json);    

    var merci = document.getElementById("merci");
    merci.innerHTML="Nous vous remercions pour vos achats !";

    var numeroCommande = document.getElementById("numero-commande");
    numeroCommande.innerHTML="Votre numéro de commande : " + orderId;

    var montantTotal = document.getElementById("montant-total");
    montantTotal.innerHTML="Montant total de vos achats : " + totalPanier + "€";

    }

}