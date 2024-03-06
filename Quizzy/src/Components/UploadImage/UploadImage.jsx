import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { deleteImage, uploadImage } from "../../services/image.services";
import { getStorage, ref } from "firebase/storage";
import AppContext from "../../Context/AppContext";
import { updateUserInfo } from "../../services/users.service";

const storage = getStorage();

const UploadImage = ({ prop, fn, value }) => {
  const { userData } = useContext(AppContext);

  const defaultUserImage =
    "https://firebasestorage.googleapis.com/v0/b/quizzy-application-f0713.appspot.com/o/user.png?alt=media&token=c1fa864d-d5c8-4d63-a759-d06f32413f9d";

  const defaultQuizImage = "test";

  const fileInput = useRef();

  const handleUploadClick = () => {
    fileInput.current.click();
  };

  const handleDelete = () => {
    let path;

    //add for quiz
    if (value === "quizImage") {
      path = "quizzesImages/";
    } else if (value === "userImage") {
      path = "avatars/";
      updateUserInfo(userData.username, "image", defaultUserImage, fn);
    }

    const imageRef = ref(storage, path + userData.username);
    deleteImage(imageRef);
  };

  const handleFileChange = (event) => {
    let path;

    if (value === "quizImage") {
      path = "quizzesImages/";
    } else if (value === "userImage") {
      path = "avatars/";
    }

    const file = event.target.files[0];
    const storageRef = ref(storage, path + userData.username);

    //add for quiz
    if (
      prop?.image &&
      value === "quizImage" &&
      prop.image !== defaultQuizImage
    ) {
      deleteImage(storageRef);
    } else if (
      prop?.image &&
      value === "userImage" &&
      prop.image !== defaultUserImage
    ) {
      deleteImage(storageRef);
    }

    uploadImage(storageRef, file).then((downloadUrl) => {
      updateUserInfo(userData.username, "image", downloadUrl, fn);
    });
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {value === "quizImage" ? (
          <strong>Quiz Image:</strong>
        ) : (
          value === "userImage" && <strong>User Photo:</strong>
        )}
      </Typography>
      <Box
        id="upload-image"
        marginBottom={2}
        marginTop={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
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
          style={{ width: "200px", height: "200px" }}
        />
        <Box
          id="upload-image"
          marginBottom={2}
          marginTop={1}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap="15px"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadClick}
            style={{backgroundColor: 'rgb(3, 165, 251)'}}
          >
            Change Image
          </Button>
          {prop.image !==
            "https://firebasestorage.googleapis.com/v0/b/quizzy-application-f0713.appspot.com/o/user.png?alt=media&token=c1fa864d-d5c8-4d63-a759-d06f32413f9d" && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Delete Image
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

UploadImage.propTypes = {
  prop: PropTypes.object,
  fn: PropTypes.func,
  value: PropTypes.string,
};

export default UploadImage;
