import { apiPath } from '../config';

export const getImagePath = (img) => {
  if (img && img.indexOf('uploads') !== -1) {
    return `${apiPath}/${img}`;
  }
  return img;
};

export const majorAsText = major => `Web ${major.charAt(0).toUpperCase()}${major.slice(1)}`;
