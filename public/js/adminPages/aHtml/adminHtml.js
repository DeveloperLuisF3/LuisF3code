// firestore DB
var storage = firebase.storage();

// variables
let openImgWrapper = document.getElementById('openImgWrapper');
let closeImgWrapper = document.getElementById('closeImgWrapper');
let openImgPort = document.getElementById('openImgPort');
let closeImgPort = document.getElementById('closeImgPort');
let openFormHtml = document.getElementById('openFormHtml');
let closeFormHtml = document.getElementById('closeFormHtml');
let openListHtml = document.getElementById('openListHtml');
let closeListHtml = document.getElementById('closeListHtml');
let addImage = document.getElementById('addImage');

// initialize app
let initializeAdminHtml = () => {
	openImgWrapper.addEventListener('click', showImgWrapper, false);
	closeImgWrapper.addEventListener('click', hideImgWrapper, false);
	openImgPort.addEventListener('click', showImgPort, false);
	closeImgPort.addEventListener('click', hideImgPort, false);
	openFormHtml.addEventListener('click', showFormHtml, false);
	closeFormHtml.addEventListener('click', hideFormHtml, false);
	openListHtml.addEventListener('click', showListHtml, false);
	closeListHtml.addEventListener('click', hideListHtml, false);
	addImage.addEventListener('click', loadImg, false);
	$('#imgWrapper').hide();
	$('#closeImgWrapper').hide();
	$('#imgPortWrapper').hide();
	$('#closeImgPort').hide();
	$('#formHtmlWrapper').hide();
	$('#closeFormHtml').hide();
	$('#updateFormHtml').hide();
	$('#projectListHtml').hide();
	$('#closeListHtml').hide();
	$('#alertWithoutImg').hide();
	$('#alertLoadImg').hide();
};

// load image
let loadImg = () => {
	let file = ($(`.img`))[1].files[0];
	console.log(file);
	if (!file) {
		$('#alertWithoutImg').show(2000);
		$('#alertWithoutImg').hide(4000);
	} else {
		let metadata = {
			contentType: `image/jpeg`
		};
		let storageRef = storage.ref(`/adminHtml/` + file.name);
		let uploadTask = storageRef.put(file, metadata);
		uploadTask.on(
			`state_changed`, (snapshot) => {
				console.log(snapshot);
			},
			(error) => {
				alert(error);
			},
			() => {
				$('#alertLoadImg').show(1000);
				$('#alertLoadImg').hide(4000);
				uploadTask.snapshot.ref.getDownloadURL().then(
					(downloadURL) => {
						crearNodoEnBD(file.name, downloadURL);
					}
				);
			}
		);
		$("input").val("");
		showImgWrapper();
	};
};

let crearNodoEnBD = (name, downloadURL) => {
	console.log("img", "=>", name, downloadURL);
};

// open imgWrapper
let showImgWrapper = () => {
	$('#openImgWrapper').hide(1000);
	$('#imgWrapper').show(2000);
	$('#closeImgWrapper').show(3000);
};
// close imgWrapper
let hideImgWrapper = () => {
	$('#closeImgWrapper').hide(1000);
	$('#imgWrapper').hide(2000);
	$('#openImgWrapper').show(3000);
};
// open imgPort
let showImgPort = () => {
	$('#openImgPort').hide(1000);
	$('#imgPortWrapper').show(2000);
	$('#closeImgPort').show(3000);
};
// close imgPort
let hideImgPort = () => {
	$('#closeImgPort').hide(1000);
	$('#imgPortWrapper').hide(2000);
	$('#openImgPort').show(3000);
};

// open formHtml
let showFormHtml = () => {
	$('#openFormHtml').hide(1000);
	$('#formHtmlWrapper').show(2000);
	$('#closeFormHtml').show(3000);
};
// close formHtml
let hideFormHtml = () => {
	$('#closeFormHtml').hide(1000);
	$('#formHtmlWrapper').hide(2000);
	$('#openFormHtml').show(3000);
};

// open listHtml
let showListHtml = () => {
	$('#openListHtml').hide(1000);
	$('#projectListHtml').show(2000);
	$('#closeListHtml').show(3000);
};
// close listHtml
let hideListHtml = () => {
	$('#closeListHtml').hide(1000);
	$('#projectListHtml').hide(2000);
	$('#openListHtml').show(3000);
};

window.addEventListener(`load`, initializeAdminHtml, false);
