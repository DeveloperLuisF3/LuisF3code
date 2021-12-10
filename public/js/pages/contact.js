// variables
let logoWrapper = document.getElementById("logoWrapper");

// initialize app
let initializeContactApp = () => {
    console.log("Yo soy contact...");
    $('#titleGallery').hide();
    $('#emailContact').hide();
    $('#logoHeader').hide();
    $('#title').hide();
};

// variables
let username;

// current user
firebase.auth().onAuthStateChanged((currentUser) => {
    if (!currentUser) {
        username = currentUser;
        setAppContact(username);
    } else {
        username = currentUser;
        setAppContact(username);
    };
});

// setAppContact
let setAppContact = (username) => {
    if (!username) {
        $('#titleGallery').hide(2000);
        $('#emailContact').hide(2000);
        $('#logoHeader').hide(3000);
        $('#title').hide(3000);
        $('#iconWrapper').hide(2000);
        placeCover();
    } else {
        $('#titleGallery').show(2000);
        $('#emailContact').show(2000);
        $('#logoHeader').show(3000);
        $('#title').show(3000);
        $('#iconWrapper').show(2000);
        setSocialIcon();
    }
};

// place initial application
let placeCover = () => {
    logoWrapper.style.display = "none";
    document.querySelector('#contactcoverWrapper').innerHTML = `
        <div class="col-12">
            <div class="coverPage">
                <div class="header">
                    <h1 class="card-title">WEB DEVELOPMEN</h1>
                </div>
                <div class="body">
                    <video class="img" poster="/img/appPresentation.png" autoplay loop>
                        <source src="/video/introLuisF3.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="footer">
                    <a href="#navbar">
                        <button class="btn" type="button" onclick="loginWithGoogle()">
                            Iniciar Sesión
                        </button>
                    </a>
                </div>
            </div>
        </div>
    `
};

// set socialIcon
let setSocialIcon = () => {
    logoWrapper.style.display = "flex";
    document.querySelector('#contactcoverWrapper').innerHTML = `
        <div class="col-12">
            <ul class="list-group social-icon-wrapper" id="iconWrapper">
                <li class="list-group-item social-items">
                    <a class="ancor" href="https://www.facebook.com/Developer-LuisF3-231261368847638" target="_blank" >
                        <h3 class="title">Facebook → </h3>
                    </a>
                    <a href="https://www.facebook.com/Developer-LuisF3-231261368847638" target="_blank">
                        <div class="icon-wrapper facebook"></div>
                    </a>
                </li>
                <li class="list-group-item social-items">
                    <a class="ancor" href="https://www.instagram.com/developer_luisf3/?hl=es" target="_blank">
                        <h3 class="title">Instagram → </h3>
                    </a>
                    <a href="https://www.instagram.com/developer_luisf3/?hl=es" target="_blank">
                        <div class="icon-wrapper instagram"></div>
                    </a>
                </li>
                <li class="list-group-item social-items">
                    <a class="ancor" href="https://www.youtube.com/channel/UCUe93GaLtWWz_c2vbhlFP9A" target="_blank">
                        <h3 class="title">Youtube → </h3>
                    </a>
                    <a href="https://www.youtube.com/channel/UCUe93GaLtWWz_c2vbhlFP9A" target="_blank">
                        <div class="icon-wrapper youtube"></div>
                    </a>
                </li>
                <li class="list-group-item social-items">
                    <a class="ancor" href="https://github.com/DeveloperLuisF3" target="_blank">
                        <h3 class="title">GitHub → </h3>
                    </a>
                    <a href="https://github.com/DeveloperLuisF3" target="_blank">
                        <div class="icon-wrapper github"></div>
                    </a>
                </li>
                <li class="list-group-item social-items">
                    <a class="ancor" href="https://www.tiktok.com/@developerluisf3?lang=es" target="_blank">
                        <h3 class="title">Tiktok → </h3>
                    </a>
                    <a href="https://www.tiktok.com/@developerluisf3?lang=es" target="_blank">
                        <div class="icon-wrapper tictoc"></div>
                    </a>
                </li>
                <li class="list-group-item social-items">
                    <a class="ancor" href="https://www.linkedin.com/in/developer-luisf3-62033b223/" target="_blank">
                        <h3 class="title">Linkedin → </h3>
                    </a>
                    <a href="https://www.linkedin.com/in/developer-luisf3-62033b223/" target="_blank">
                        <div class="icon-wrapper linkedin"></div>
                    </a>
                </li>
            </ul>
        </div>
    `
};

window.addEventListener('load', initializeContactApp, false);
