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

getRandomInteger(20, 25);
getRandomFloat(2, 3, 1);
