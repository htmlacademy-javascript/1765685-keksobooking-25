import { createArrayOffer } from './data.js';
const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');
const similarAds = createArrayOffer();
const similarListElement = document.querySelector('#map-canvas');
const typesDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createAd = ({ offer, author }) => {
  const adElement = cardTemplate.cloneNode(true);
  const adElementPhotoContainer = adElement.querySelector('.popup__photos');
  const adElementPhotoTemplate =
    adElementPhotoContainer.querySelector('.popup__photo');
  adElementPhotoContainer.querySelector('.popup__photo').remove();
  const createPhotos = (photosList) => {
    const photosListFragment = document.createDocumentFragment();
    photosList.forEach((photo) => {
      const photoElement = adElementPhotoTemplate.cloneNode();
      photoElement.src = photo;
      photosListFragment.append(photoElement);
    });
    return photosListFragment;
  };

  const createFeatures = (featureList) => {
    const featureListFragment = document.createDocumentFragment();

    featureList.forEach((featureItem) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${featureItem}`);
      featureListFragment.append(featureElement);
    });

    return featureListFragment;
  };

  if (author.author) {
    adElement.querySelector('.popup__avatar').src = author.author;
  } else {
    adElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (offer.title) {
    adElement.querySelector('.popup__title').textContent = offer.title;
  } else {
    adElement.querySelector('.popup_tittle').classList.add('hidden');
  }

  if (offer.address) {
    adElement.querySelector('.popup__text--address').textContent =
      offer.address;
  } else {
    adElement.querySelector('.popup__text--address').classList.add('hidden');
  }

  if (offer.price) {
    adElement.querySelector(
      '.popup__text--price'
    ).textContent = `${offer.price} ₽/ночь`;
  } else {
    adElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (offer.type) {
    adElement.querySelector('.popup__type').textContent =
      typesDictionary[offer.type];
  } else {
    adElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (offer.rooms && offer.guests) {
    adElement.querySelector(
      '.popup__text--capacity'
    ).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    adElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (offer.checkin && offer.checkout) {
    adElement.querySelector(
      '.popup__text--time'
    ).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    adElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  const featureContainer = adElement.querySelector('.popup__features');
  featureContainer.innerHTML = '';
  if (offer.features) {
    featureContainer.append(createFeatures(offer.features));
  } else {
    featureContainer.classList.add('hidden');
  }

  const popupDescription = adElement.querySelector('.popup__description');
  popupDescription.innerHTML = '';
  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.classList.add('hidden');
  }

  const photosContainer = adElement.querySelector('.popup__photos');
  if (offer.photos) {
    photosContainer.append(createPhotos(offer.photos));
  } else {
    photosContainer.classList.add('hidden');
  }

  return adElement;
};

const drawAd = () => {
  const similarListFragment = document.createDocumentFragment();
  similarAds.forEach(({ offer, author }) => {
    similarListFragment.append(createAd({ offer, author }));
  });
  similarListElement.append(similarListFragment);
};
drawAd();
export {createAd, similarAds};
