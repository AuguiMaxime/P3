

// récup des données Api //


const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

// fonction for pour afficher toutes les images de l'api // 

for (let i=0; i< works.length; i++) {

const article = works[i]; 
const sectionGallery = document.querySelector(".gallery")
const worksElement = document.createElement("article");


// création des articles de la section gallery //

const imageElement = document.createElement ("img");
imageElement.src = article.imageUrl;

const titleElement = document.createElement ("h3");
titleElement.innerHTML = article.title;

const nameElement = document.createElement ("p")
nameElement.innerHTML = article.category.name;


// rattachement des balises au dom //

sectionGallery.appendChild(worksElement)

worksElement.appendChild(imageElement)
worksElement.appendChild(titleElement)
}



// Partie Bouton filtres //
const boutonObjet = document.querySelector(".btn-objet");
boutonObjet.addEventListener("click", function(){

    const worksObjets = works.filter(work => work.category.name === "Objets");

    // On vide la galerie//
    const sectionGallery = document.querySelector(".gallery"); sectionGallery.innerHTML = "";

    worksObjets.forEach(article => { const imageElement = document.createElement("img");
         imageElement.src = article.imageUrl;
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;

        const worksElement = document.createElement("article");
       
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
        sectionGallery.appendChild(worksElement)
             });

    });

    const boutonAppartement = document.querySelector(".btn-apt");
    boutonAppartement.addEventListener("click", function(){

    const worksAppartements = works.filter(work => work.category.name === "Appartements");
    const sectionGallery = document.querySelector(".gallery"); sectionGallery.innerHTML = "";

    worksAppartements.forEach(article => { const imageElement = document.createElement("img");
         imageElement.src = article.imageUrl;
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        
        const worksElement = document.createElement("article");
       
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
        sectionGallery.appendChild(worksElement)
             });

    });
   
    const boutonHotels = document.querySelector(".btn-hotel");
    boutonHotels.addEventListener("click", function(){

    const worksHotel = works.filter(work => work.category.name === "Hotels & restaurants");
    const sectionGallery = document.querySelector(".gallery"); sectionGallery.innerHTML = "";

    worksHotel.forEach(article => { const imageElement = document.createElement("img");
         imageElement.src = article.imageUrl;
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        
        const worksElement = document.createElement("article");
       
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
        sectionGallery.appendChild(worksElement)
             });

    });

const boutonTous = document.querySelector(".btn-tous");
    boutonTous.addEventListener("click", function(){
    const sectionGallery = document.querySelector(".gallery"); sectionGallery.innerHTML = ""; // on vide//

    works.forEach(article => { const imageElement = document.createElement("img");
         imageElement.src = article.imageUrl;
        const titleElement = document.createElement("h3");
        titleElement.innerText = article.title;
        
        const worksElement = document.createElement("article");
       
        worksElement.appendChild(imageElement);
        worksElement.appendChild(titleElement);
        sectionGallery.appendChild(worksElement)
             });

    });

 // Boutons filtres terminés //

 //Partie bouton modifier et modale // 


