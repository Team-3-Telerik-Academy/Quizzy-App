import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import AppContext from "../../Context/AppContext";
import { deleteImage, uploadImage } from "../../services/image.services";
import { getStorage, ref } from "firebase/storage";

const storage = getStorage();

/**
 * Renders an image upload component for creating a quiz or group image.
 *
 * @component
 * @param {Object} prop - The props for the component.
 * @param {Object} prop.prop - The prop object containing the image and file information.
 * @param {Function} prop.fn - The function to update the prop object.
 * @param {string} prop.value - The value indicating whether the image is for a quiz or a group.
 * @returns {JSX.Element} The QuizImage component.
 */
const QuizImage = ({ prop, fn, value }) => {
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (prop.file) {
      let path;

      if (value === "quiz") {
        path = "createQuizImage/";
      } else if (value === "group") {
        path = "createGroupImage/";
      }

      const storageRef = ref(storage, path + userData.username);

      uploadImage(storageRef, prop.file)
        .then((downloadURL) => fn({ ...prop, image: downloadURL }))
        .catch((error) => console.error(error));
    }
  }, [prop.file]);

  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleDelete = () => {
    fn({ ...prop, image: "" });

    let path;

    if (value === "quiz") {
      path = "createQuizImage/";
    } else if (value === "group") {
      path = "createGroupImage/";
    }

    const imageRef = ref(storage, path + userData.username);
    deleteImage(imageRef);
  };

  const handleFileChange = (event) => {
    if (prop.image) {
      let path;

      if (value === "quiz") {
        path = "createQuizImage/";
      } else if (value === "group") {
        path = "createGroupImage/";
      }

      const imageRef = ref(storage, path + userData.username);
      deleteImage(imageRef);
    }

    const file = event.target.files[0];
    fn({ ...prop, file: file });
  };

  return (
    <>
      {prop?.image ? (
        <>
          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "rgb(3,165,251)" }}
          >
            {value === "quiz" ? "Quiz" : "Group"} Image:
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
              src={prop.image}
              alt={prop.title}
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
                onClick={handleUploadClick}
                style={{ marginTop: "10px", backgroundColor: "rgb(3,165,251)" }}
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
          <Typography
            variant="h6"
            color="primary"
            gutterBottom
            style={{ color: "rgb(3,165,251)" }}
          >
            {value === "quiz" ? "Quiz" : "Group"} Image:
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
            style={{ backgroundColor: "rgb(3,165,251)" }}
          >
            Upload Image
          </Button>
        </Box>
      )}
    </>
  );
};

QuizImage.propTypes = {
  prop: PropTypes.object,
  fn: PropTypes.func,
  value: PropTypes.string,
};

export default QuizImage;
