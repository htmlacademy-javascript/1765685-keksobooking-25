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

const isInvalidPositive = (number) => number < 0;
const isInvalidBoundary = (from, upTo) => upTo <= from;
const isInvalidInterval = (from, upTo) => Math.ceil(from) === Math.floor(upTo);

const isErrorСonditions = (from, upTo) => {
  if (isInvalidPositive(from) || isInvalidPositive(upTo)) {
    return 'Ошибка. Значения границ диапазона должны быть больше нуля.';
  }
  if (isInvalidBoundary(from, upTo)) {
    return 'Ошибка. Максимальное значение диапазона должно быть больше минимального.';
  }
};

const isErrorBordersEquality = (from, upTo) => {
  if (isInvalidInterval(from, upTo)) {
    return 'Ошибка. Задаваемый интервал должен иметь два целочисленных значения. Значения границ тоже считаются.';
  }
};

const isErrorAccuracy = (accuracy) => {
  if (isInvalidPositive(accuracy)) {
    return 'Ошибка. Точность округления не может быть меньше нуля.';
  }
  if (!Number.isInteger(accuracy)) {
    return 'Ошибка. Точность округления задается только целочисленным значением.';
  }
};

// После указания интервала, значения границ диапазона округляются до ближайших целых значений находящихся внутри указанного интервала.
const getRandomInteger = (from, upTo) => {
  const messageBorders = isErrorBordersEquality(from, upTo);
  const messageСonditions = isErrorСonditions(from, upTo);

  if (messageBorders) {
    return messageBorders;
  }

  if (messageСonditions) {
    return messageСonditions;
  }

  const randomInteger = Math.floor(
    from + Math.random() * (Math.floor(upTo) + 1 - Math.ceil(from))
  );
  return randomInteger;
};

const getRandomFloat = (from, upTo, accuracy) => {
  const messageСonditions = isErrorСonditions(from, upTo);
  const messageAccuracy = isErrorAccuracy(accuracy);
  if (messageСonditions) {
    return messageСonditions;
  }
  if (messageAccuracy) {
    return messageAccuracy;
  }
  let randomFloat = from + Math.random() * (upTo - from);
  randomFloat = randomFloat.toFixed(accuracy);
  randomFloat = Number(randomFloat);
  return randomFloat;
};

const createAvatarLink = (upTo = 10) => {
  const index = getRandomInteger(1, upTo);
  return index < 10
    ? `img/avatars/user0${index}.png`
    : `img/avatars/user${index}.png`;
};

const getArrayRandomElements = (ArrayElements, numberOfRandomElements) => {
  if (numberOfRandomElements === 1) {
    return ArrayElements[getRandomInteger(0, ArrayElements.length - 1)];
  }
  if (numberOfRandomElements === ArrayElements.length) {
    return ArrayElements;
  }
  if (numberOfRandomElements > ArrayElements.length) {return `Ошибка. Заданное количество случайных элементов (${numberOfRandomElements}) превышает количество элементов массива (${ArrayElements.length})`;}
  const copyArrayElements = ArrayElements.slice();
  if (!numberOfRandomElements) {
    numberOfRandomElements = getRandomInteger(1, ArrayElements.length-1);
  }
  for (let i = 0; i < numberOfRandomElements; i++) {
    const tempElement = copyArrayElements[i];
    const tempIndex = getRandomInteger(i, copyArrayElements.length - 1);
    copyArrayElements[i] = copyArrayElements[tempIndex];
    copyArrayElements[tempIndex] = tempElement;
  }
  return copyArrayElements.slice(0, numberOfRandomElements);
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

createArrayOffer();
