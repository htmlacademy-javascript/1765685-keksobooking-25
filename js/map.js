import { createAd } from './popap.js';
import { removeDisabledElementsForm } from './form-condition.js';
import { totalMatch } from './filter.js';

const adFormMapFilteres = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const adMapFiltersElements = adFormMapFilteres.querySelectorAll(
  '.map__filter, .map__features'
);
const adFormELements = adForm.querySelectorAll(
  '.ad-form__element, .ad-form-header__input'
);
const address = document.querySelector('#address');
const SIMILAR_CARD_NUMBER = 10;
const latitude = 35.681729;
const longtude = 139.753927;

const getStartСoordinates = () => {
  address.value = `${latitude}, ${longtude}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    removeDisabledElementsForm(adForm, adFormELements);
    removeDisabledElementsForm(adFormMapFilteres, adMapFiltersElements);
  })
  .setView(
    {
      lat: 35.681729,
      lng: 139.753927,
    },
    12
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68172,
    lng: 139.75392,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

const getStartMainPinMarker = () => {
  mainPinMarker.setLatLng({
    lat: latitude,
    lng: longtude,
  });
};

address.value = `${mainPinMarker.getLatLng()}`;

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng()}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const {
    location: { lat },
    location: { lng },
  } = ad;

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
      toGeoJSON: 5,
    }
  );

  marker.addTo(markerGroup).bindPopup(createAd(ad));
};

const createMarkers = (similarAds) => {
  markerGroup.clearLayers();
  const filteredData = totalMatch(similarAds);
  filteredData.slice(0, SIMILAR_CARD_NUMBER).forEach((ad) => {
    createMarker(ad);
  });
};

export { createMarkers, getStartСoordinates, getStartMainPinMarker };
