const adFormMapFilteres = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const adMapFiltersElements = adFormMapFilteres.querySelectorAll('.map__filter, .map__features');
const adFormELements = adForm.querySelectorAll('.ad-form__element, .ad-form-header__input');


const addDisabledElementsForm = (form, elem) => {
  form.classList.add('ad-form--disabled');
  for(let i=0; i<elem.length; i++ ){
    elem[i].disabled=true;
  }
};

const removeDisabledElementsForm = (form, elem) => {
  form.classList.remove('ad-form--disabled');
  for(let i=0; i<elem.length; i++ ){
    elem[i].disabled=false;
  }
};

addDisabledElementsForm(adFormMapFilteres, adMapFiltersElements);
addDisabledElementsForm(adForm, adFormELements);
// removeDisabledElementsForm(adFormMapFilteres, adMapFiltersElements);
// removeDisabledElementsForm(adForm, adFormELements);

export {addDisabledElementsForm, removeDisabledElementsForm};
