import { apiPath } from '../config';

export const getImagePath = (img) => {
  if (img && img.indexOf('uploads') !== -1) {
    return `${apiPath}/${img}`;
  }
  return img;
};

export const getPdfPath = path => {
  if (path && path.indexOf('uploads') !== -1) {
    return `${apiPath}/${path}`;
  }
  return path;
}

export const majorAsText = major => `Web ${major.charAt(0).toUpperCase()}${major.slice(1)}`;
