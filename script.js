const resDOM = [
	'resIP',
	'resLocation',
	'resTimezone',
	'resISP',
].map((res) => document.getElementById(res));


const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
	e.preventDefault();
	const inputIP = document.getElementById('inputIP').value;
	update(inputIP);
})

const apiKey = 'at_efBANOYpeh3EmEvTkM6xpePpNTpYn';
const fetchData = async (inputIP) => {
	const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${inputIP}`);
	const json = await response.json();
	return json;
}

const dataToDOM = (data) => {
	if (data.code) {
		alert(`error ${data.code}, ${data.messages}`);
	}
	const {ip, location: {city, country, timezone},  isp} = data;
	resDOM[0].textContent = ip;
	resDOM[1].textContent = `${city}, ${country}`;
	resDOM[2].textContent = timezone;
	resDOM[3].textContent = isp;
}

const mapToken = 'pk.eyJ1IjoibG1hbzciLCJhIjoiY2tleXVmNnBtMDh1bjJ3bzA0cTc2ZWh6biJ9.em9fD0JqwWLrLDk14jlwbQ';
let mymap;
const updateMap = (data) => {
	const { location: {lat, lng} } = data;
	mymap !== undefined ? mymap.remove() : null;
	mymap = L.map('mapid').setView([lat, lng], 13);
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: 'mapbox/streets-v11',
			tileSize: 512,
			zoomOffset: -1,
			accessToken: mapToken
	}).addTo(mymap);

	const marker = L.marker([lat, lng]).addTo(mymap);
}

const update = async (inputIP) => {
	const data = await fetchData(inputIP);
	dataToDOM(data);
	updateMap(data);
}

const inputIP = '216.58.193.206';
update(inputIP);