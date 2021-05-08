// firestore DB 
var db = firebase.firestore();
let adminUsersRef = db.collection('admins');

// variables
let adminItems;

// initialize app
let initializeAdmin = () => {
	console.log("Yo Soy AdminUser");
};

// observer adminUsers
adminUsersRef.onSnapshot((querySnapshot) => {
	querySnapshot.forEach((doc) => {
		adminItems = doc.data();
		fillAdminUsers(adminItems);
	});
});

let fillAdminUsers = (adminItems) => {
	console.log(adminItems);
	$("#adminListGroup").append(
		`
			<li class="list-group-item">
				<div class="title-wrapper">
					<img class="img-user-list" src="${adminItems.adminImage}" alt="UserAvatar" />
					<p>id: ${adminItems.adminId}</p>
					<p>${adminItems.adminName}</p>
					<p>${adminItems.adminEmail}</p>
					<p>${adminItems.adminDate}</p>
					<button 
						class="btn userAdmin" 
						onclick="deleteAdmin(
							'${adminItems.adminId}'
						)"
					>
						Delete User Admin
					</button>
				</div>
			</li>
		`
	)
};

let deleteAdmin = (adminId) => {
	adminUsersRef.doc(adminId).delete().then(() => {
		console.log("adminUser successfully deleted!");
	}).catch((error) => {
		console.log("Error removing document: ", error);
	});
};

window.addEventListener(`load`, initializeAdmin, false);
