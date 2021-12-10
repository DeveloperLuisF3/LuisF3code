// firestore DB
var db = firebase.firestore();
var projectHtmlRef = db.collection("projectHtml").orderBy("date", "desc");

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
		$('#reproductorHtml').hide(2000);
		$('#navbarSearchWrapper').hide();
		$('#titleGalleryHtml').hide();
		document.querySelector('#draftHtmlWrapper').innerHTML = `
			<div class="col-12">
				<div class="coverPage">
					<div class="header">
						<h1 class="card-title">WEB DEVELOPMEN</h1>
					</div>
					<div class="body">
						<video class="img" poster="/img/appPresentation.png" autoplay loop>
							<source src="/video/introLuisF3.mp4" type="video/mp4">
						</video>
					</div>
					<div class="footer">
						<a href="#navbar">
							<button class="btn" type="button" onclick="loginWithGoogle()">
								Iniciar Sesión
							</button>
						</a>
					</div>
				</div>
			</div>
		`
	} else {
		$('#navbarSearchWrapper').show(2000);
		$('#titleGalleryHtml').show(2000);
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
					<div class="card card-gallery" id="${index}">
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
	$('#resultWrapper').hide();
	$('#closeResultWrapper').hide();
	$('#reproductorHtml').show(2000);
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
					<h3 class="signClose" onclick="closePlayer()">X</h3>
				</div>
				<div class="card-body">
					<h4 class="title">${name}</h4>
					<h6 class="subtitle">${technology}</h6>
					<p class="card-text">${description}</p>
					<a href="${documentation}" target="_blank">
						<p class="card-link">Documentación → ${documentation}</p>
					</a>
					<small>Created By LuisF3</small>
				</div>
			</div>
		</div>
	`
};

let closePlayer = () => {
	$('#reproductorHtml').hide(2000);
	$('#titleGalleryHtml').show(2000);
};

window.addEventListener(`load`, initializeHtmlApp, false);
