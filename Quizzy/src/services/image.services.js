import {
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import toast from "react-hot-toast";

/**
 * Deletes an image from the specified image reference.
 *
 * @param {string} imageRef - The reference to the image to be deleted.
 * @returns {Promise<void>} A promise that resolves when the image is deleted successfully.
 */
export const deleteImage = (imageRef) => {

  deleteObject(imageRef)
    .then(() => {
      console.log("Image deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Uploads an image file to the specified storage reference.
 * @param {Object} storageRef - The storage reference to upload the image to.
 * @param {File} file - The image file to be uploaded.
 * @returns {Promise<string>} A promise that resolves to the download URL of the uploaded image.
 * @throws {Error} If the file format is invalid.
 */
export const uploadImage = (storageRef, file) => {
  const fileExtension = file.name.split('.').pop().toLowerCase();

  const validImageFileExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'tiff'];

  if (!validImageFileExtensions.includes(fileExtension)) {
    toast.error('Invalid file format. Only image files are allowed.');
    return Promise.reject(new Error('Invalid file format. Only image files are allowed.'));
  }

  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      console.log("File available at", downloadURL);
      return downloadURL;
    })
    .catch((error) => {
      toast.error(`Upload failed: ${error.message}`);
    });
}