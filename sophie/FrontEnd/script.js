console.log("JS chargé");


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

   async function init() { 
    const works = await fetchWorks(); 
    showGallery(works); 
    document.querySelector(".btn-objet").addEventListener("click", () => {
         showGallery(works.filter(w => w.category.name === "Objets"));
         });

          document.querySelector(".btn-apt").addEventListener("click", () => {
             showGallery(works.filter(w => w.category.name === "Appartements"));
             }); 

             document.querySelector(".btn-hotel").addEventListener("click", () => {
                 showGallery(works.filter(w => w.category.name === "Hotels & restaurants")); }); 

                 document.querySelector(".btn-tous").addEventListener("click", () => {
                     showGallery(works);
                     }); 
                    } 
                     init();


// ----------------------
// PARTIE LOGIN
// ----------------------

const form = document.getElementById("login-form");

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
            sessionStorage.setItem("token", data.token);; //session au lieu de local storage pour éviter de garder le token//
            window.location.href = "index.html";
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe");
        }

    } catch (error) {
        console.error("Erreur fetch :", error);
        alert("Impossible de se connecter au serveur");
    }
}


// MODE EDITION //

/// Bouton Logout ///
const logout = document.getElementById("logout")
logout.addEventListener("click", function(event){
    sessionStorage.removeItem("token");
    window.location.reload();
})

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

    const modify = document.querySelector("#modify");
    if (modify) {
        modify.style.display = "flex";

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
    }
}



// Mode Edition // 

// Modale // 
const modalContainer = document.querySelector("#modal-container")
const openModal = document.querySelector("#open-modal")
const modalClose = document.querySelector("#close-modal")
openModal.addEventListener("click", function(event){
    (modalContainer),
    modalContainer.style.display = "block";
})
modalClose.addEventListener("click", function(){
    (modalContainer)
    modalContainer.style.display = "none";
})


