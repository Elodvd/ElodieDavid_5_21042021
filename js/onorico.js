// affichage liste ours

fetch("http://localhost:3000/api/teddies")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (request) {
    console.log(request);

    for (var i in request) {
      var id = request[i]._id;
      const vignette = document.createElement("div");
      const nom = document.createElement("h2");
      const photo = document.createElement("img");
      const prix = document.createElement("h3");
      const bouton = document.createElement("button");
      const conteneurVignettes = document.getElementById("main");
      const btnClickDetail = document.getElementsByClassName("bouton-click-detail");
      const lienBouton = document.createElement("a");
      const vignetteAccueil = document.getElementsByClassName("vignette-accueil");

      photo.setAttribute("src", request[i]["imageUrl"]);
      photo.setAttribute("alt", "Photo de " + request[i].name);
      lienBouton.setAttribute("href", "produit.html?id=" + id);

      photo.classList.add("photo-ours-accueil");
      bouton.classList.add("bouton-click-detail");
      vignette.classList.add("vignette-accueil");
      
      conteneurVignettes.appendChild(vignette);
      vignetteAccueil[i].appendChild(nom);
      vignetteAccueil[i].appendChild(photo);
      vignetteAccueil[i].appendChild(prix);
      vignetteAccueil[i].appendChild(bouton);
      btnClickDetail[i].appendChild(lienBouton);

      nom.textContent = request[i].name;
      prix.textContent = request[i].price + " €";
      lienBouton.textContent = "Voir le produit";
    }
  })
  .catch(function (err) {
    alert("Une erreur est survenue lors de la communication avec le serveur");
  });
