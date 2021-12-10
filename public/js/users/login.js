// firestore DB
var db = firebase.firestore();
let usersRef = db.collection("users");
let visitorsRef = db.collection("visitors");

// variables
let btnLogin = document.getElementById('btnLogin');
let btnSignOut = document.getElementById('btnSignOut');
let clickLogin = document.getElementById('clickLogin');
let user;

// initialize app
let initializeLogin = () => {
	$('#dropdownAdmin').hide();
	btnLogin.addEventListener('click', loginWithGoogle, false);
	btnSignOut.addEventListener('click', leave, false);
	$('#alertSignOut').hide();
	$('#modalTextLogout').hide();
	$('#modalTextLogout2').hide();
	$('.hideLink').hide(2000);
};

// current user
firebase.auth().onAuthStateChanged(function (u) {
	if (!u) console.log("Recuerda loguearte para publicar")
	else {
		user = u;
		setUser(user);
	}
});

// login user
let loginWithGoogle = () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
			user = result.user;
			createUser(user);
			setUser(user);
			setModal();
		}).catch((error) => {
			console.log(error);
		})
};

// virtual navbar
let setUser = (user) => {
	if (!user) {
		document.querySelector('#loginButtonWrapper').innerHTML = `
			<button class="btn" id="btnLogin" type="btn">Iniciar Sesión</button>
			<img class="imgAvatar" src="../../img/lf3.png" alt="UserAvatar" />
		`
		$('#logOutNav').hide(1000);
		let btnLogin = document.getElementById('btnLogin');
		btnLogin.addEventListener('click', function () {
			loginWithGoogle();
		})
		$('.hideLink').hide(2000);
	} else {
		document.querySelector('#logOutNav').innerHTML = `
			<a class="nav-link" data-bs-toggle="modal" data-bs-target="#signOutModal" href="#">Cancelar Suscripción</a>
		`
		$('#logOutNav').show(2000);
		document.querySelector('#loginButtonWrapper').innerHTML = `
			<button class="btn" id="btnLogOut" type="btn">Cerrar Sesión</button>
			<img class="imgAvatar" src="${user.photoURL}" alt="UserAvatar" />
		`
		let btnLogOut = document.getElementById('btnLogOut');
		btnLogOut.addEventListener('click', function () {
			logOut();
		})
		$('.hideLink').show(2000);
	}
};

// create User
let createUser = (user) => {
	let userCreationDate = new Date();
	usersRef.doc(user.uid).set({
		name: user.displayName,
		email: user.email,
		image: user.photoURL,
		userId: user.uid,
		date: userCreationDate
	})
		.then(() => {
			console.log("user created!");
			createVisitor(user);
		})
		.catch((error) => {
			console.log("Que gusto verte de nuevo!");
		});
};

// create visitors
let createVisitor = (visitor) => {
	let visitorCreationDate = new Date();
	visitorsRef.doc(visitor.uid).set({
		visitorId: visitor.uid,
		name: visitor.displayName,
		email: visitor.email,
		image: visitor.photoURL,
		date: visitorCreationDate
	}).then(() => {
		console.log("Visitor successfully created!!!");
	}).catch((error) => {
		console.log("Registered Visitor");
	})
};

// logOut user
let logOut = () => {
	firebase.auth().signOut().then(() => {
		user = undefined;
		setUser(user);
		console.log("User LogOut");
	}).catch((error) => {
		console.log(error);
	});
};

// delete user
let leave = () => {
	let userSup = firebase.auth().currentUser;
	usersRef.doc(userSup.uid)
		.delete()
		.then(() => {
			console.log("User Deleted");
			signOut();
		})
		.catch((error) => {
			console.log(error);
		});
};

// signOut user
let signOut = () => {
	let userDel = firebase.auth().currentUser;
	userDel.delete().then(function () {
		user = undefined;
		setUser(user);
		setNav();
		console.log("User SignOut");
	}).catch(function (error) {
		console.log(error);
	});
};

// deleteFromAdmin 
/* let deleteFromAdmin = (dfa) => {
	let userClean = dfa;
	usersRef.doc(userClean)
		.delete()
		.then(() => {
			signOutFromAdmin(userClean);
			console.log("User Deleted");
		}).catch((error) => {
			console.log(error);
		});

};
let signOutFromAdmin = (userClean) => {
	userClean.delete().then(() => {
		user = undefined;
		setUser(user);
		setNav();
		console.log("User SignOut");
	}).catch((error) => {
		console.log(error);
	});
}; */

// after signOut
let setNav = () => {
	$('#alertSignOut').show(1000);
	$('#modalTextLogin').hide(1000);
	$('#modalTextLogin2').hide(1000);
	$('#modalTextLogout').show(3000);
	$('#modalTextLogout2').show(3000);
	$('#btnSignOut').hide(2000);
	document.querySelector('#logOutNav').innerHTML = `
		<a class="nav-link" id="clickLogin" href="#">
			Registrar
		</a>
	`
	let clickLogin = document.getElementById('clickLogin');
	clickLogin.addEventListener('click', function () {
		loginWithGoogle();
	})
};

// set modal
let setModal = () => {
	$('#alertSignOut').hide();
	$('#modalTextLogin').show();
	$('#modalTextLogin2').show();
	$('#modalTextLogout').hide();
	$('#modalTextLogout2').hide();
	$('#btnSignOut').show();
	console.log("set modal");
}

window.addEventListener(`load`, initializeLogin, false);
