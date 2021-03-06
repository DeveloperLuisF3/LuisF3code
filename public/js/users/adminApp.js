// firestore DB 
var db = firebase.firestore();

// variables
let currentuser;
let adminItemDb;

let initializeAdminApp = () => {
	$('#dropdownAdmin').hide();
	console.log("Yo Soy adminApp");
};

firebase.auth().onAuthStateChanged((cu) => {
	if (!cu) $('#dropdownAdmin').hide();
	else {
		currentuser = cu.uid;
		getAdmin(currentuser);
	}
});

let getAdmin = (currentuser) => {
	let currentAdminUser = db.collection('admins').doc(currentuser);
	// console.log(currentAdminUser);
	currentAdminUser.get().then((doc) => {
		if (doc.exists) {
			adminItemDb = doc.data();
			setAdminNav(adminItemDb);
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}).catch((error) => {
		// console.log("Error getting document:", error);
		setAdminNav();
	});

};

let setAdminNav = (adminItemDb) => {
	if (!adminItemDb) {
		$('#dropdownAdmin').hide();
	} else {
		$('#dropdownAdmin').show();
		document.querySelector('#dropdownAdmin').innerHTML = `
			<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
			data-bs-toggle="dropdown" aria-expanded="false">
				Admin
			</a>
			<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
				<li>
					<a class="dropdown-item" href="../adminPages/adminHtml.html">
						HTML, CSS, JS
					</a>
				</li>
				<li>
					<a class="dropdown-item" href="../adminPages/userList.html">
						Lista de Usuarios
					</a>
				</li>
				<li>
					<a class="dropdown-item" href="../adminPages/adminUsers.html">
						Usuario Administrador
					</a>
				</li>
				<li>
					<a class="dropdown-item" href="../adminPages/visitorList.html">
						Lista de visitantes
					</a>
				</li>
			</ul>
		`
	}
};

window.addEventListener(`load`, initializeAdminApp, false);
