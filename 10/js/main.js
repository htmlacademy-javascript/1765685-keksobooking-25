import './popap.js';
import './form-condition.js';
import {setUserFormSubmit} from './form.js';
import {createMarkers} from './map.js';
import './slider.js';
import {getData} from './api.js';
import { showAlert } from './util.js';

const CREATE_MARKERS_COUNT = 5;

getData((ads) => {
  createMarkers(ads.slice(0, CREATE_MARKERS_COUNT));
},
showAlert
);

setUserFormSubmit();
