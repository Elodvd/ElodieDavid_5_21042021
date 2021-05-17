class Produit {
    constructor(id, nom, couleur, prix, quantite) {
      this.id = id;
      this.nom = nom;
      this.couleur = couleur;
      this.prix = prix;
      this.quantite = quantite;
    }
  }
/*
class contact {
  constructor(prenom, nom, adresse, ville, email) {
    this.prenom = prenom;
    this.nom=nom;
    this.adresse=adresse;
    this.ville=ville;
    this.email=email;
  }
}
*/
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