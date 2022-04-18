import { adForm } from './form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const avatarInputElement = adForm.querySelector('#avatar');
const avatarPreviewElement = adForm.querySelector(
  '.ad-form-header__preview img'
);
const housePhotoElement = adForm.querySelector('#images');
const housePreviewElement = adForm.querySelector('.ad-form__photo');

avatarInputElement.addEventListener('change', () => {
  const avatar = avatarInputElement.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((file) => avatarName.endsWith(file));

  if (matches) {
    avatarPreviewElement.src = URL.createObjectURL(avatar);
  }
});

housePhotoElement.addEventListener('change', () => {
  const photo = housePhotoElement.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = FILE_TYPES.some((file) => photoName.endsWith(file));

  if (matches) {
    const newImage = document.createElement('img');
    newImage.style.width = '100%';
    newImage.style.height = '100%';
    newImage.src = URL.createObjectURL(photo);

    housePreviewElement.append(newImage);
  }
});
