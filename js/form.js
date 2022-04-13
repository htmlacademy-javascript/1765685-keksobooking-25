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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
