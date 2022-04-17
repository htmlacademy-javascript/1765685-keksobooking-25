import {isEscapeKey} from './util.js';
import { priceSlider } from './slider.js';
import {sendData} from './api.js';
import {getStartСoordinates, getStartMainPinMarker} from './map.js';

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error',
});

const title = adForm.querySelector('#title');

const checkTitle = (value) => value.length >= 30 && value.length <= 100;

const getTitleErrorMessage = (value) => {
  if (value.length <= 30) {
    return `Минимальное количество символов 30. Длина поля сейчас ${value.length}.`;
  }
};

pristine.addValidator(title, checkTitle, getTitleErrorMessage);

const numberRooms = adForm.querySelector('#room_number');
const numberGuests = adForm.querySelector('#capacity');

const maxCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const checkCapacity = () =>
  maxCapacity[numberRooms.value].includes(numberGuests.value);

numberRooms.addEventListener('input', () => {
  checkCapacity();
  pristine.validate(numberGuests);
});

const getGuestsErrorMessage = () =>
  `Выбор ${numberRooms.value} ${
    numberRooms.value === '1' ? 'комнаты' : 'комнат'
  } для ${numberGuests.value.toLowerCase()} ${
    numberGuests.value === '1' ? 'гостя' : 'гостей'
  } невозможен.`;

pristine.addValidator(numberGuests, checkCapacity, getGuestsErrorMessage);

const typeOfHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const minPrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const validatePrice = () =>
  price.value >= parseInt(minPrice[typeOfHousing.value], 10);

const getPriceErrorMessage = () =>
  `Для выбранного типа жилья минимальная цена за ночь ${
    minPrice[typeOfHousing.value]
  } руб.`;

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

const onTypeChange = () => {
  price.placeholder = minPrice[typeOfHousing.value];
  pristine.validate(price);
};

typeOfHousing.addEventListener('change', () => {
  onTypeChange();
});

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const onTimeChange = (element, elementChecked) => {
  element.selectedIndex = elementChecked.selectedIndex;
  pristine.validate(elementChecked);
};

timeIn.addEventListener('change', () => {
  onTimeChange(timeOut, timeIn);
});

timeOut.addEventListener('change', () => {
  onTimeChange(timeIn, timeOut);
});

// adForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// });

const showMessage = (message) => {
  const containerMessage = document.querySelector(`#${message}`).content.querySelector(`.${message}`);
  document.body.append(containerMessage);

  document.addEventListener('click', () => {
    containerMessage.classList.add('visually-hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      containerMessage.classList.add('visually-hidden');
    }
  });
};

const resetButton = document.querySelector('.ad-form__reset');

const returnOriginalState = () => {
  adForm.reset();
  priceSlider.noUiSlider.updateOptions({
    start: 0,
  });
  getStartСoordinates();
  getStartMainPinMarker();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  returnOriginalState();
});

const submitButton = document.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};


const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          showMessage('success');
          returnOriginalState();
        },
        () => {
          unblockSubmitButton();
          showMessage('error');
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
