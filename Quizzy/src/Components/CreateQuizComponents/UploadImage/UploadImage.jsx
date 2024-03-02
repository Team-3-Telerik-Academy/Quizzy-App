import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import PropTypes from "prop-types";
import { updateQuizInfo } from "../../../services/quizzes.service";

const storage = getStorage();

const UploadImage = ({ quiz, updateInfo }) => {
  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = (event) => {
    if (quiz.image) {
      deleteImage();
    }

    const file = event.target.files[0];
    const storageRef = ref(storage, "quizImages/" + quiz.title);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            updateQuizInfo(quiz.id, "image", downloadURL);
          })
          .then(updateInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteImage = () => {
    const imageRef = ref(storage, "quizImages/" + quiz.title);

    deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully");
      })
      .then(updateInfo)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="change-info-right-side">
      <span className="info">
        <strong>Quiz Image:</strong>
        {quiz.image ? (
          <>
            <input
              type="file"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button onClick={handleUploadClick}>Change</button>
            <button onClick={deleteImage}>Delete</button>
            <img src={quiz.image} alt={quiz.title} />
          </>
        ) : (
          <>
            <input
              type="file"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button onClick={handleUploadClick}>Upload</button>
          </>
        )}
      </span>
    </div>
  );
};

UploadImage.propTypes = {
  quiz: PropTypes.object,
  updateInfo: PropTypes.func,
};

export default UploadImage;
