// firestore DB
var db = firebase.firestore();
let usersRef = db.collection("users");

// variables
let btnLogin = document.getElementById('btnLogin');
let user;

// initialize app
let initial = () => {
	btnLogin.addEventListener('click', loginWithGoogle, false);
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
	let provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth()
		.signInWithPopup(provider)
		.then((result) => {
			user = result.user;
			createUser(user);
			setUser(user);
		}).catch((error) => {
			console.log(error);
		})
};

// virtual navbar
let setUser = (user) => {
	if (!user) {
		document.querySelector('#loginButtonWrapper').innerHTML = `
			<button class="btn" id="btnLogin" type="btn">Iniciar Sesión</button>
			<img class="imgAvatar" src="img/ardulink.png" alt="UserAvatar" />
		`
		let btnLogin = document.getElementById('btnLogin');
		btnLogin.addEventListener('click', function () {
			loginWithGoogle();
		})
	} else {
		document.querySelector('#loginButtonWrapper').innerHTML = `
		<button class="btn" id="btnLogOut" type="btn">Cerrar Sesión</button>
		<button class="btn" id="btnSignOut" type="btn">Cancelar Suscripción</button>
		<img class="imgAvatar" src="${user.photoURL}" alt="UserAvatar" />
		`
		let btnLogOut = document.getElementById('btnLogOut');
		let btnSignOut = document.getElementById('btnSignOut');
		btnLogOut.addEventListener('click', function () {
			logOut();
		})
		btnSignOut.addEventListener('click', function () {
			// signOut();
			leave(user);
		})
	}
};

// create User
let createUser = (user) => {
	usersRef.doc(user.uid).set({
		name: user.displayName,
		email: user.email,
		image: user.photoURL,
		userId: user.uid
	})
		.then(() => {
			console.log("user created!");
		})
		.catch((error) => {
			console.log("Que gusto verte de nuevo!");
		});
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
let leave = (userDel) => {
	usersRef.doc(userDel.uid)
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
		// leave(userDel);
		console.log("User SignOut");
	}).catch(function (error) {
		console.log(error);
	});
};

window.addEventListener(`load`, initial, false);
