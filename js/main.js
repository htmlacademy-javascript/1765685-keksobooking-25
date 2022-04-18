import './popap.js';
import './form-condition.js';
import './slider.js';
import './photo.js';
import { setUserFormSubmit } from './form.js';
import { createMarkers } from './map.js';
import { getData } from './api.js';
import { debounce, showAlert } from './util.js';
import { filterChange } from './filter.js';
import { RENDER_DELAY } from './util.js';

getData((ads) => {
  createMarkers(ads);
  filterChange(debounce(() => createMarkers(ads), RENDER_DELAY));
}, showAlert);

setUserFormSubmit();
