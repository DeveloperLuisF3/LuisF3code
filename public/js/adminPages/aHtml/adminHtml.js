// firebase DB
var storage = firebase.storage();
var db = firebase.firestore();
var imageHtmlRef = db.collection('imagesAdminHtml');
var projectHtml = db.collection('projectHtml');

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
let imgHtml = document.getElementById('img');
let goToImgGallery = document.getElementById('goToImgGallery');
let setModalHtml = document.getElementById('setModalHtml');
let submitProjectHtml = document.getElementById('submitProjectHtml');
let htmlImgItems;
let files, fl, i, file;

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
	goToImgGallery.addEventListener('click', showImgWrapper, false);
	setModalHtml.addEventListener('click', showModalHtml, false);
	submitProjectHtml.addEventListener('click', getHtmlData, false);
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
	$('#alertDeleteImg').hide();
	$('#alertImgForm').hide();
	$('#alertImgHtml').hide();
	$('#alertCreateHtml').hide();
};

// current image
let htmlImageCurrentState = () => {
	imageHtmlRef.onSnapshot((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			presentHtmlImg([doc.data()]);
		});
	});
};

let sendImgToProject = (url) => {
	$('#htmlProjectImage').empty();
	showFormHtml();
	$('#htmlProjectImage').val(url);
	$('#alertImgForm').show(2000);
	$('#alertImgForm').hide(4000);
	$('#alertImgHtml').show(2000);
	$('#alertImgHtml').hide(4000);
	hideImgWrapper();
};

let getHtmlData = () => {
	let dateHtml = new Date();
	let nameHtml = document.getElementById('htmlProjectName').value;
	let technologyHtml = document.getElementById('htmlProjectTech').value;
	let descriptionHtml = document.getElementById('htmlProjectDescription').value;
	let documentationHtml = document.getElementById('htmlProjectDoc').value;
	let videoHtml = document.getElementById('htmlProjectVideo').value;
	let imageHtml = document.getElementById('htmlProjectImage').value;
	projectHtml.doc(nameHtml).set({
		date: dateHtml,
		name: nameHtml,
		technology: technologyHtml,
		description: descriptionHtml,
		documentation: documentationHtml,
		video: videoHtml,
		image: imageHtml
	}).then(() => {
		$("input").val("");
		$("textarea").val("");
		$('#alertCreateHtml').show(2000);
		$('#alertCreateHtml').hide(4000);
		$('#textModalHtml').hide(2000);
		$('#submitProjectHtml').hide(2000);
		$("#modalBodyHtml").append(
			`
        		<p id="proCreat">PRODUCTO CREADO!!!</p>
    		`
		);
		document.getElementById("proCreat").style.color = '#81c784';
		hideFormHtml();
	}).catch((error) => {
		console.log("Error writing document: ", error);
	});
};

// load image
let loadImg = () => {
	if ('files' in imgHtml) {
		if (imgHtml.files.length == 0) {
			$('#imgWrapper').empty();
			showImgWrapper();
			$('#alertWithoutImg').show(2000);
			$('#alertWithoutImg').hide(4000);
		} else {
			files = imgHtml.files;
			fl = files.length;
			i = 0;
			while (i < fl) {
				file = files[i];
				loadHtmlStorage(file);
				i++;
			};
		};
	}
	else {
		if (imgHtml.value == "") {
			console.log("Select one or more files.");
		} else {
			console.log("Image Upload successful");
		};
	};
};

// upload image to storage
let loadHtmlStorage = (file) => {
	console.log(file);
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
			uploadTask.snapshot.ref.getDownloadURL().then(
				(downloadURL) => {
					crearNodoEnBD(file.name, downloadURL);
				}
			);
		}
	);
	$("input").val("");
};

// add image to firestoreDB
let crearNodoEnBD = (name, downloadURL) => {
	console.log('File available at ' + downloadURL, "=>", name);
	let dateHtml = new Date();
	imageHtmlRef.doc(name).set({
		nombre: name,
		url: downloadURL,
		date: dateHtml
	}).then(() => {
		$('#imgWrapper').empty();
		showImgWrapper();
		$('#alertLoadImg').show(3000);
		$('#alertLoadImg').hide(4000);
	}).catch((error) => {
		console.error("Error writing image: ", error);
	});
};

// image container fill
let presentHtmlImg = (array) => {
	console.log(array);
	array.forEach((el, index) => {
		console.log(el, "=>", index);
		$("#imgWrapper").append(
			`
				<div class="col-6 col-sm-4 col-md-3 col-lg-2" id="${index}" >
					<div class="w-100">&nbsp</div>
					<div class="img-card">
						<img src="${el.url}" alt="..." class="img-thumbnail img" />
						<div class="img-body">
							<small class="title">${el.nombre}</small>
						</div>
						<ul class="list-group list-group-flush img-wrapper-btn">
							<a href="#uploadProject"><button type="button" class="btn carry-send" onclick="sendImgToProject('${el.url}')">
								Send to
							</button></a>
							<button type="button" class="btn del-img" data-bs-toggle="modal" data-bs-target="#modalElimImg"  onclick="passDataToDelete('${el.nombre}', '${index}')">
								Delete
							</button>
						</ul>
					</div>
					<div class="w-100">&nbsp</div>
				</div>
			`
		);
	})
};

// pass image to delete
let passDataToDelete = (nombre, index) => {
	$('#modalBodyImg').empty();
	$('#modalBodyImg').append(
		`
			<p id="textModalImg">Está segura(o) de eliminar este archivo???</p>
		`
	)
	$('#modalFooterImg').append(
		`
			<p class="nam-img-footer">${nombre}</p>
			<button type="button" class="btn modal-signOut" onclick="deleteImgStor('${nombre}', '${index}')">
				Aceptar
			</button>
			<button type="button" class="btn modal-cancel" data-bs-dismiss="modal">
				Cancelar
			</button>
		`
	)
};

// remove image from storage
let deleteImgStor = (nombre, index) => {
	let figureRef = storage.ref('adminHtml/' + nombre);
	figureRef.delete().then(
		function () {
			suprImg(nombre, index);
		}
	).catch(
		function (error) {
			// Uh-oh, an error occurred!
		}
	);
};

// remove image from firestore
let suprImg = (nombre) => {
	imageHtmlRef.doc(nombre).delete().then(() => {
		console.log("Document successfully deleted!");
		$('#imgWrapper').empty();
		$('#modalFooterImg').empty();
		htmlImageCurrentState();
		$('#modalBodyImg').append(
			`
				<p id="textImgDel">Archivo Eliminado!!!</p>
			`
		)
		$('#alertDeleteImg').show(2000);
		$('#alertDeleteImg').hide(4000);
		$('#textModalImg').hide(2000);
	}).catch((error) => {
		console.log("Error removing document: ", error);
	});
};

// open imgWrapper
let showImgWrapper = () => {
	$('#openImgWrapper').hide(1000);
	$('#imgWrapper').show(2000);
	$('#closeImgWrapper').show(3000);
	htmlImageCurrentState();
};
// close imgWrapper
let hideImgWrapper = () => {
	$('#closeImgWrapper').hide(1000);
	$('#imgWrapper').hide(2000);
	$('#openImgWrapper').show(3000);
	$('#imgWrapper').empty();
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

// show modal create project html
let showModalHtml = () => {
	$('#proCreat').hide();
	$('#textModalHtml').show(2000);
	$('#submitProjectHtml').show(2000);
};

window.addEventListener(`load`, initializeAdminHtml, false);
