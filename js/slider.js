const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const SLIDER_STEP = 1;
const SLIDER_START = 5000;

const minPriceOfType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const priceSlider = adForm.querySelector('.ad-form__slider');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');

noUiSlider.create(priceSlider, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: SLIDER_START,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

priceSlider.noUiSlider.on('update', () => {
  price.value = priceSlider.noUiSlider.get();
});

price.addEventListener('input', () => priceSlider.noUiSlider.set(price.value));
type.addEventListener('change', () => {
  priceSlider.noUiSlider.updateOptions({
    start: minPriceOfType[type.value],
  });
});
