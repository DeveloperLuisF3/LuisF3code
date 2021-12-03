// firestore DB
var db = firebase.firestore();
var projectHtmlRef = db.collection('projectHtml');

// initialize app
let initializeHtmlApp = () => {

	$('#titleGalleryHtml').hide();
	$('#vidHtmlWrapper').hide();
	$('#cardDescription').hide();
	$('#card-gallery').hide();
	$('#resultWrapper').hide();
};

// listener projectHtml
let startDB = () => {
	projectHtmlRef.onSnapshot((querySnapshot) => {
		$('#draftHtmlWrapper').empty();
		querySnapshot.forEach((doc) => {
			fillProjectHtml([doc.data()]);
			console.log([doc.data()]);
		});
	});
};

// current user
firebase.auth().onAuthStateChanged(function (username) {
	if (!username) {
		reader = username;
		setContent(reader);
	}
	else {
		reader = username;
		setContent(reader);
	}
});

// set content
let setContent = (reader) => {
	console.log(reader);
	if (!reader) {
		$('#navbarSearchWrapper').hide();
		$('#titleGalleryHtml').hide();
		document.querySelector('#draftHtmlWrapper').innerHTML = `
			<div class="col-12">
				<div class="coverPage">
					<div class="header">
						<h1 class="card-title">WEB DEVELOPMEN</h1>
					</div>
					<div class="body">
						<iframe class="img" src="https://www.youtube.com/embed/exlHooJcaMQ"></iframe>
					</div>
					<div class="footer">
						<a href="#navbar">
							<button class="btn" id="buttonLogin" type="button">
								Inicia Sesión
							</button>
						</a>
					</div>
				</div>
			</div>
		`
	} else {
		$('#navbarSearchWrapper').show(2000);
		startDB();
	}
};

let fillProjectHtml = (array) => {
	array.forEach((value, index) => {
		console.log(value, index);
		$('#titleGalleryHtml').show(2000);
		$('#draftHtmlWrapper').append(
			`
				<div class="col-12 col-lg-6 col-xl-3">
					<div class="card card-gallery" id="${index} card-gallery">
						<div class="gallery-img">
							<img src="${value.image}" class="card-img-top" alt="...">
						</div>
						<div class="card-body">
							<h5 class="card-title">${value.name}</h5>
							<p class="card-text">${value.technology}</p>
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
	});
};

let setVideoHtml = (index, description, documentation, image, name, technology, video) => {
	document.querySelector('#reproductorHtml').innerHTML = `
		<div class="col-12 col-xl-8" id="${index}">
			<div class="vidHtml-wrapper" id="vidHtmlWrapper">
				<iframe src="${video}">
				</iframe> 
			</div> 
		</div>
		<div class="col-12 col-xl-4">
			<div class="card card-description" id="cardDescription">
				<div class="card-header">
					<h3 class="signClose">X</h3>
				</div>
				<div class="card-body">
					<h4 class="title">${name}</h4>
					<h6 class="subtitle">${technology}</h6>
					<p class="card-text">${description}</p>
					<a href="${documentation}" target="_blank">
						<h4 class="card-link">Ver Documentación</h4>
					</a>
					<small>Created By LuisF3</small>
				</div>
			</div>
		</div>
	`
};

window.addEventListener(`load`, initializeHtmlApp, false);
