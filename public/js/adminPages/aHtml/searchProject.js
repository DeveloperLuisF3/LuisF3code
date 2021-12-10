// firestore DB
var db = firebase.firestore();
var searchHtmlRef = db.collection('projectHtml');

// variables
let searchingDoc = document.getElementById('searching');
let closeResult = document.getElementById('closeResult');

// initialize app
let initializeSearchProject = () => {
    console.log("Estoy en desarrollo!!!");
    $('#closeResultWrapper').hide();
    // searchingDoc.addEventListener('keydown', writeSearch, false);
};

let searchFor = (string) => {
    $('#reproductorHtml').hide();
    console.log("buscando", string);
    searchHtmlRef.where("name", "==", string)
        .get("name")
        .then((querySnapshot) => {
            if (querySnapshot.empty)
                document.querySelector('#searchWrapper').innerHTML = `
                    <div class="alert alert-errorSearch alert-dismissible fade show" role="alert">
                        <h1>No hay proyectos!</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            querySnapshot.forEach((doc) => {
                $('#resultWrapper').empty();
                $("#searching").val("");
                $('#closeResultWrapper').show(2000);
                fillSearchVisitor([doc.data()]);
            })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
};

let fillSearchVisitor = (arrayVisitor) => {
    console.log(arrayVisitor);
    $('#resultWrapper').show(2000);
    arrayVisitor.forEach((value, index) => {
        $('#resultWrapper').append(
            `
                <div class="col-12 col-lg-6 col-xl-3">
                    <div class="card card-gallery" id="${index}">
                        <div class="gallery-img">
                            <img src="${value.image}" class="card-img-top" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${value.name}</h5>
                            <p class="card-text">${value.technology}
                            </p>
                        </div>
                        <div class="card-footer">
                            <a href="#navbar"> 
                                <button class="btn" onclick="setVideoHtml('${index}', '${value.description}', '${value.documentation}', '${value.image}', '${value.name}', '${value.technology}', '${value.video}')">
                                    Ver Video
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            `
        )
    })
}

searchingDoc.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        searchFor(e.target.value);
    }
});

/* let writeSearch = (e) => {
    // e.preventDefault();
    searchFor(e.target.value);
}; */

closeResult.addEventListener('click', () => {
    $('#resultWrapper').hide(2000);
    $('#closeResultWrapper').hide(2000);
});

window.addEventListener(`load`, initializeSearchProject, false);
