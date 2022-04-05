import {getRandomInteger, getRandomFloat, getArrayRandomElements} from './util.js';

const PRICE_MIN=500;
const PRICE_MAX=10000;
const ROOM_MIN=1;
const ROOM_MAX=50;
const GUEST_MIN=1;
const GUEST_MAX=10;
const LAT_MIN=35.65000;
const LAT_MAX=35.70000;
const LNG_MIN= 139.70000;
const LNG_MAX= 139.80000;
const ADVERTS_AMOUNT=10;

const TITLES=['Заголовок-1', 'Заголовок-2', 'Заголовок-3', 'Заголовок-4', 'Заголовок-5',];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTION=['Описание-1', 'Описание-2','Описание-3','Описание-4','Описание-5',];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAvatarLink = (upTo = 10) => {
  const index = getRandomInteger(1, upTo);
  return index < 10
    ? `img/avatars/user0${index}.png`
    : `img/avatars/user${index}.png`;
};

const createAuthorObject = (numberOfPhotoAvatars) => ({
  author: createAvatarLink(numberOfPhotoAvatars),
});
const createOfferObject = (lat, lng) => ({
  title: getArrayRandomElements(TITLES,1),
  address: `${lat}, ${lng}`,
  price: getRandomInteger(PRICE_MIN, PRICE_MAX),
  type: getArrayRandomElements(TYPES,1),
  rooms: getRandomInteger(ROOM_MIN, ROOM_MAX),
  guests: getRandomInteger(GUEST_MIN, GUEST_MAX),
  checkin: getArrayRandomElements(CHECKIN, 1),
  checkout: getArrayRandomElements(CHECKOUT, 1),
  features: getArrayRandomElements(FEATURES),
  description: getArrayRandomElements(DESCRIPTION,1),
  photos: getArrayRandomElements(PHOTOS),
});

const createLocationObject=(lat, lng)=>({
  lat: lat,
  lng: lng,
});

const createHousingObject = () =>{
  const lat=getRandomFloat (LAT_MIN, LAT_MAX, 5);
  const lng=getRandomFloat (LNG_MIN, LNG_MAX, 5);
  return ({
    author: createAuthorObject(),
    offer: createOfferObject(lat,lng),
    location: createLocationObject(lat,lng),
  });};

const createArrayOffer = ()=> Array.from({length: ADVERTS_AMOUNT}, createHousingObject);
createArrayOffer ();
export {createArrayOffer};
