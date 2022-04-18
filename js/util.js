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

const getArrayRandomElements = (ArrayElements, numberOfRandomElements) => {
  if (numberOfRandomElements === 1) {
    return ArrayElements[getRandomInteger(0, ArrayElements.length - 1)];
  }
  if (numberOfRandomElements === ArrayElements.length) {
    return ArrayElements;
  }
  if (numberOfRandomElements > ArrayElements.length) {
    return `Ошибка. Заданное количество случайных элементов (${numberOfRandomElements}) превышает количество элементов массива (${ArrayElements.length})`;
  }
  const copyArrayElements = ArrayElements.slice();
  if (!numberOfRandomElements) {
    numberOfRandomElements = getRandomInteger(1, ArrayElements.length - 1);
  }
  for (let i = 0; i < numberOfRandomElements; i++) {
    const tempElement = copyArrayElements[i];
    const tempIndex = getRandomInteger(i, copyArrayElements.length - 1);
    copyArrayElements[i] = copyArrayElements[tempIndex];
    copyArrayElements[tempIndex] = tempElement;
  }
  return copyArrayElements.slice(0, numberOfRandomElements);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 6000);
};

const debounce = (cb, timeoutDelay) => {
  let timerId;

  return (...rest) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

const RENDER_DELAY = 500;

export {
  getRandomInteger,
  getRandomFloat,
  getArrayRandomElements,
  isEscapeKey,
  showAlert,
  debounce,
  RENDER_DELAY,
};
