
let worksData = []  //on globalise les works de l'api//

// ----------------------
// PARTIE GALLERIE
// ----------------------
async function fetchWorks() { 
    const response = await fetch("http://localhost:5678/api/works");
     return await response.json(); }

async function showGallery(works) {
    // Si pas de galerie → on est sur login.html
    const sectionGallery = document.querySelector(".gallery");
    if (!sectionGallery) return;
    sectionGallery.innerHTML = "";
    
// Affichage des works
     works.forEach(article => {
        const worksElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl; 
        const titleElement = document.createElement("h3"); 
        titleElement.innerText = article.title;

        worksElement.appendChild(imageElement); 
        worksElement.appendChild(titleElement); 
        sectionGallery.appendChild(worksElement); 
    }); 
}
    // ----------------------
    // BOUTONS FILTRES + init
    // ----------------------

   async function initWork() { 
    if (!document.querySelector(".gallery"))
        return; // corrige le bug du login//

    worksData = await fetchWorks(); // on envoit les données dans worksdata pour globaliser //
    console.log("worksData récupéré :", worksData);

    showGallery(worksData);//on appelle la fonction show gallery pour afficher les works//
    
    const btnObjet = document.querySelector(".btn-objet")
        btnObjet.innerText = worksData[0].category.name;
        btnObjet.addEventListener("click", () => {
         showGallery(worksData.filter(w => w.category.name === btnObjet.innerText));
         });
    const btnApt = document.querySelector(".btn-apt")
        btnApt.innerText = worksData[1].category.name;
        btnApt.addEventListener("click", () => {
         showGallery(worksData.filter(w => w.category.name === btnApt.innerText));
         });
    const btnHotel = document.querySelector(".btn-hotel")
        btnHotel.innerText = worksData[2].category.name;
        btnHotel.addEventListener("click", () => {
         showGallery(worksData.filter(w => w.category.name === btnHotel.innerText));
         });
        document.querySelector(".btn-tous").addEventListener("click", () => {
                     showGallery(worksData);
    }); 
    } 
    initWork();


// ----------------------
// PARTIE LOGIN
// ----------------------

const form = document.getElementById("login-form");
console.log("form=", form);

if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailValue = document.getElementById("email").value;
        const passwordValue = document.getElementById("password").value;

        console.log("Email :", emailValue);
        console.log("Password :", passwordValue);

        login(emailValue, passwordValue);
    });
}

async function login(emailValue, passwordValue) {

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        });
        const data = await response.json();

        if (data.token) {
            console.log("Token reçu :", data.token);
            sessionStorage.setItem("token", data.token); //session au lieu de local storage pour éviter de garder le token//
            window.location.href = "index.html";
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe.");
        }

    } catch (error) {
        console.error("Erreur fetch :", error);
        alert("Impossible de se connecter au serveur");
    }
}


// MODE EDITION //

/// Bouton Logout ///
const logout = document.getElementById("logout")
if (logout){
logout.addEventListener("click", function(event){
    sessionStorage.removeItem("token");
    window.location.reload();
})}

const token = sessionStorage.getItem("token");

if (token) {
    const editionBar = document.querySelector("#edition");
    if (editionBar) {
        editionBar.style.display = "flex";
    }

    const filtres = document.querySelector("#filtres");
    if (filtres) {
        filtres.style.display = "none";
    }
   

        const logged = document.querySelector("#login");
    if (logged) {
        logged.style.display = "none";
    }
        if (logout) {
            logout.style.display = "flex"
        }
        const portfolio = document.querySelector("#portfolio")
        if (portfolio) {
            portfolio.style.display = "flex"
        }

        const modalButton = document.querySelector(".js-modal")
        if (modalButton) {
            modalButton.style.display = null
        }

        
    }

// Mode Edition // 

// MODALE //
//ouverture modale//
let modal = null
const openModal= function(e){
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal","true")
    showModalGallery(worksData)
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)

}
//ouverture modale//
document.querySelectorAll(".js-modal").forEach(a=> {
    a.addEventListener("click", openModal)
})

//fermeture modale //
const closeModal = function(e){
    if (modal === null)
        return
    e.preventDefault()
    window.setTimeout (function(){
        modal.style.display = "none"
        modal = null
    },500)
    
    modal.setAttribute("aria-hidden","true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    
}

// garder le clic dans la modale//
const stopPropagation = function(e){
    e.stopPropagation()
}

// fermeture touche échap//
window.addEventListener("keydown", function(e){
    if (e.key==="Escape" || e.key === "Esc"){
        closeModal(e)
    }
})
// changement de titre // 
const modalH3 = document.querySelector("#title-modal")


// Affichage de la gallerie dans la modale // 
async function showModalGallery(works) {
    modalH3.innerText = "Galerie photo"
    // Si pas de galerie → on est sur login.html
    const sectionModalGallery = document.querySelector(".modal-gallery");
    if (!sectionModalGallery) return;
    sectionModalGallery.innerHTML = "";
    // Affichage des works//
     works.forEach(article => {
        const worksElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
         //bouton supprimer //
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "🗑";

        worksElement.appendChild(imageElement); 
        worksElement.appendChild(deleteButton) ;
        sectionModalGallery.appendChild(worksElement); 
    });
}
// Modale //
const modalForm = document.querySelector(".form-modal")
const modalAddContent = document.querySelector(".add-content")
const modalAddImage = document.querySelector(".modal-add-img-btn")
const modalPrevious = document.querySelector(".modal-previous")
modalAddImage.innerText = "Ajouter une photo"
const modalAddImageButton = document.querySelector(".add-img-button")
modalAddImageButton.innerText= "+Ajouter photo"

// Deuxième modale //
modalAddImage.addEventListener("click", function(){
        modalH3.innerText = "Ajout photo"
        modalPrevious.style.display = null;
        const sectionModalGallery = document.querySelector(".modal-gallery");
        sectionModalGallery.style.display = "none";
        modalAddContent.style.display = null;
        modalForm.style.display = null;
        modalAddImage.style.display = "none"
        const modalImageBtn = document.querySelector(".send-img-btn")
        modalImageBtn.innerText = "Valider"
        modalImageBtn.style.display = null
}
)
// bouton précédent // 
modalPrevious.addEventListener("click", function(){
    modalH3.innerText = "Galerie photo"
    modalPrevious.style.display = "none";
        const sectionModalGallery = document.querySelector(".modal-gallery");
        sectionModalGallery.style.display = null;
        modalAddContent.style.display = "none";
        modalForm.style.display = "none";
        modalAddImage.style.display = null
        const modalImageBtn = document.querySelector(".send-img-btn")
        modalImageBtn.innerText = "Valider"
        modalImageBtn.style.display = "none"
})
