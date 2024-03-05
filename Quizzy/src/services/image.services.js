import {
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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
  return uploadBytes(storageRef, file)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref);
    })
    .then((downloadURL) => {
      console.log("File available at", downloadURL);
      return downloadURL;
    })
    .catch((error) => {
      console.log(error);
    });
}