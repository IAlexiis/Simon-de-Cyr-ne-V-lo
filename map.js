const menuBurger = document.querySelector(".menu-burger");
const navLinks = document.querySelector(".nav-links");

menuBurger.addEventListener("click", function () {
  navLinks.classList.toggle("mobile-menu");
});

const depart1 = [46.21077912970491, 6.143857013562229]; /* Geneve */
const arrivee1 = [45.756264245123226, 4.840252636937282]; /* Lyon */
const depart2 = [45.52423409841546, 4.874838942079281]; /* Vienne */
const arrivee2 = [43.94671756116734, 4.806474103975196]; /* Avignon */
const depart3 = [43.94671756116734, 4.806474103975196]; /* Avignon */
const arrivee3 = [43.39539100665989, 3.6928493762036614]; /* Sète */

const map = L.map("map").setView(depart2, 10);

var veloIcon = L.icon({
  iconUrl: "/img/MarkerVelo.svg",
  iconSize: [50, 50],
});
var houseIcon = L.icon({
  iconUrl: "/img/MarkerHouse.svg",
  iconSize: [30, 30],
});
var finishIcon = L.icon({
  iconUrl: "/img/MarkerFinish.svg",
  iconSize: [30, 30],
});
var inviIcon = L.icon({
  iconUrl: "/img/MarkerHouse.svg",
  iconSize: [0, 0],
});

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
var velo = L.marker(depart2, { icon: veloIcon, zIndexOffset: 1000 }).addTo(map);
var house = L.marker(arrivee1, { icon: houseIcon }).addTo(map);
var finish = L.marker([43.39511667491752, 3.694793177162288], {
  icon: finishIcon,
}).addTo(map);
var routeCoordinates = [];
var routeIndex = 0;

var control = L.Routing.control({
  waypoints: [L.latLng(depart2), L.latLng(arrivee2)],
  routeWhileDragging: false,
  lineOptions: {
    addWaypoints: false,
    styles: [
      { color: "black", opacity: 0.15, weight: 9 },
      { color: "white", opacity: 0.8, weight: 6 },
      { color: "#2864ba", opacity: 1, weight: 3 },
    ],
  },
  router: new L.Routing.osrmv1({
    language: "fr",
    profile: "cycling",
  }),
  createMarker: function (i, waypoint, n) {
    const marker = L.marker(waypoint.latLng, {
      draggable: false,
      icon: inviIcon,
    });
    return marker;
  },
  show: true,
}).addTo(map);

function updateVeloMarker() {
  if (routeIndex >= routeCoordinates.length) {
    routeIndex = 0;
  }

  velo.setLatLng(routeCoordinates[routeIndex]);

  routeIndex++;

  setTimeout(updateVeloMarker, 1);
}

control.on("routesfound", function (e) {
  routeCoordinates = e.routes[0].coordinates;

  updateVeloMarker();
});

L.Routing.control({
  waypoints: [L.latLng(depart1), L.latLng(arrivee1), L.latLng(depart2)],
  routeWhileDragging: false,
  lineOptions: {
    addWaypoints: false,
    styles: [
      { color: "black", opacity: 0.15, weight: 9 },
      { color: "white", opacity: 0.8, weight: 6 },
      { color: "gray", opacity: 1, weight: 3 },
    ],
  },
  createMarker: function (i, waypoint, n) {
    const marker = L.marker(waypoint.latLng, {
      draggable: false,
      icon: inviIcon,
    });
    return marker;
  },
  show: false,
}).addTo(map);

L.Routing.control({
  waypoints: [L.latLng(depart3), L.latLng(arrivee3)],
  routeWhileDragging: false,
  lineOptions: {
    addWaypoints: false,
    styles: [
      { color: "black", opacity: 0.15, weight: 9 },
      { color: "white", opacity: 0.8, weight: 6 },
      { color: "gray", opacity: 1, weight: 3 },
    ],
  },
  createMarker: function (i, waypoint, n) {
    const marker = L.marker(waypoint.latLng, {
      draggable: false,
      icon: inviIcon,
    });
    return marker;
  },
  show: false,
}).addTo(map);
