import {
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import toast from "react-hot-toast";

export const deleteImage = (imageRef) => {

  deleteObject(imageRef)
    .then(() => {
      console.log("Image deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

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