// utils/cropUtils.js

export const getCroppedImageData = (imageSrc, crop) => {
  const image = new Image();
  image.src = imageSrc;
  return new Promise((resolve) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toDataURL("image/jpeg", (dataUrl) => {
        resolve(dataUrl);
      });
    };
  });
};
