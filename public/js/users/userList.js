// firestore DB
var db = firebase.firestore();
let usersListRef = db.collection("users");
let usersAdminRef = db.collection("admins");

// variables
let listItems;

// initialize app
let initializeList = () => {
	console.log("Yo Soy userList");
};

// observer userList
usersListRef.onSnapshot((querySnapshot) => {
	querySnapshot.forEach((doc) => {
		// console.log(doc.id, " => ", doc.data());
		listItems = doc.data();
		fillUserList(listItems);
	})
});

let fillUserList = (listItems) => {
	console.log(listItems);
	// $("#listGroup").empty();
	$("#listGroup").append(
		`
			<li class="list-group-item">
				<div class="title-wrapper">
					<img class="img-user-list" src="${listItems.image}" alt="UserAvatar" />
					<p>id: ${listItems.userId}</p>
					<p>${listItems.name}</p>
					<p>${listItems.email}</p>
					<p>${listItems.date}</p>
					<button 
						class="btn userAdmin" 
						onclick="createAdmin(
							'${listItems.userId}',
							'${listItems.image}',
							'${listItems.name}',
							'${listItems.email}'
						)"
					>
						Create User Admin
					</button>
				</div>
			</li>
		`
	)
};

let createAdmin = (userId, image, name, email) => {
	let adminUserCreationDate = new Date();
	usersAdminRef.doc(userId).set({
		adminName: name,
		adminEmail: email,
		adminImage: image,
		adminId: userId,
		adminDate: adminUserCreationDate
	})
		.then(() => {
			console.log("Administrator Created");
		})
		.catch((error) => {
			console.log(error);
		});
};

window.addEventListener(`load`, initializeList, false);
