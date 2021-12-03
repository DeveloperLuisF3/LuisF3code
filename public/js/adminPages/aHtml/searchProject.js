// firestore DB
/* var db = firebase.firestore();
var searchHtmlRef = db.collection('projectHtml'); */

// variables
var searchingDoc = document.getElementById('searching');

// initialize app
let initializeSearchProject = () => {
    searchingDoc.addEventListener('keydown', writeSearch, false);
};

/* let searchFor = (string) => {
    console.log("buscando", string);
    searchHtmlRef.where("name", "==", string)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) document.querySelector('#searchWrapper').innerHTML = `
            <h1>Sin resultados!</h1>
            `;
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}; */

let writeSearch = () => {
    console.log("Estoy en desarrollo!!!");
    // searchFor(e.target.value);
};

/* searchingDoc.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        searchFor(e.target.value);
    }
}); */

window.addEventListener(`load`, initializeSearchProject, false);
