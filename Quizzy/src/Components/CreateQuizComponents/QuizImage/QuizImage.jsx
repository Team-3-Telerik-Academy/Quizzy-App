import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import AppContext from "../../../Context/AppContext";
import { deleteImage, uploadImage } from "../../../services/image.services";
import { getStorage, ref } from "firebase/storage";

const storage = getStorage();

const QuizImage = ({ quiz, setQuiz }) => {
  const {userData } = useContext(AppContext);

  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleDelete = () => {
    setQuiz({ ...quiz, image: "" });
    const imageRef = ref(storage, "createQuizImage/" + userData.username);
    deleteImage(imageRef);
  };

  const handleFileChange = (event) => {
    if (quiz.image) {
      const imageRef = ref(storage, "createQuizImage/" + userData.username);
      deleteImage(imageRef);
    }

    const file = event.target.files[0];
    const storageRef = ref(storage, "createQuizImage/" + userData.username);

    uploadImage(storageRef, file, setQuiz, quiz).then((downloadURL) => setQuiz({ ...quiz, image: downloadURL }));
  };

  return (
    <>
      {quiz?.image ? (
        <>
          <Typography variant="h6" color="primary" gutterBottom>
            Quiz Image:
          </Typography>
          <Box
            id="upload-image"
            marginBottom={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="15px"
          >
            <input
              type="file"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <img
              src={quiz.image}
              alt={quiz.title}
              style={{ width: "150px", height: "150px" }}
            />
            <Box
              id="upload-image"
              marginBottom={2}
              marginTop={1}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleUploadClick}
                style={{ marginTop: "10px" }}
              >
                Change Image
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                style={{ marginTop: "10px", width: "100%" }}
              >
                Delete Image
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box
          id="upload-image"
          marginBottom={2}
          display="flex"
          alignItems="center"
          gap="15px"
        >
          <Typography variant="h6" color="primary" gutterBottom>
            Quiz Image:
          </Typography>
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadClick}
          >
            Upload Image
          </Button>
        </Box>
      )}
    </>
  );
};

QuizImage.propTypes = {
  quiz: PropTypes.object,
  setQuiz: PropTypes.func,
};

export default QuizImage;
