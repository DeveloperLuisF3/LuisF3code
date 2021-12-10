// firestore Db
var db = firebase.firestore();
var visitorsListRef = db.collection("visitors");

// variables
let visitorsItems;

// initialize app
let initializeVisitorList = () => {
	console.log("Yo soy visitor list");
};

// observer visitorList
visitorsListRef.onSnapshot((querySnapshot) => {
	querySnapshot.forEach((doc) => {
		visitorsItems = doc.data();
		fillVisitorsList(visitorsItems);
	});
});

let fillVisitorsList = (visitorsItems) => {
	console.log(visitorsItems);
	$("#visitorsListGroup").append(
		`
			<li class="list-group-item">
				<div class="title-wrapper">
					<img class="img-user-list" src="${visitorsItems.image}" alt="UserAvatar" />
					<p>id: ${visitorsItems.visitorId}</p>
					<p>${visitorsItems.name}</p>
					<p>${visitorsItems.email}</p>
					<p>${visitorsItems.date}</p>
					<button 
						class="btn userAdmin"
						onclick="clearVisitorsList(
							'${visitorsItems.visitorId}'
						)"
					>
							Clear Visitor List
					</button>
				</div>
			</li>
		`
	)
};

let clearVisitorsList = (visitorId) => {
	visitorsListRef.doc(visitorId).delete().then(() => {
		console.log("visitor successfully deleted!");
	}).catch((error) => {
		console.log("Error removing document: ", error);
	});
};

window.addEventListener(`load`, initializeVisitorList, false);
