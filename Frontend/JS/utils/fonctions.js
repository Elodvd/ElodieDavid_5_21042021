// vérification du bon format de l'email avant envoi - contient une @ et termine par un .fr/com...
function validationEmail(email) {
    let verif = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
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