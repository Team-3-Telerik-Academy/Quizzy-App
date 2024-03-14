import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { uploadImage } from "../../services/image.services";
import { validateGroup } from "./validations";
import toast from "react-hot-toast";
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
  Container,
  Paper,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/users.service";
import QuizImage from "../../Components/CreateImage/CreateImage";
import { addGroup, getGroupByTitle } from "../../services/groups.services";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(3,165,251)",
    },
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgb(3,165,251)",
    },
  },
});

const storage = getStorage();

const CreateGroup = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [users, setUsers] = useState(null);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [group, setGroup] = useState({
    title: "",
    image: "",
    description: "",
    invitedUsers: [],
    file: null,
  });

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const updateGroup = (prop) => (e) => {
    setGroup({
      ...group,
      [prop]: e.target.value,
    });
  };

  const handleAddGroup = () => {
    if (validateGroup(group)) return;
    setCreatingGroup(true);

    let promise;

    if (group.image) {
      const pastStorageRef = ref(
        storage,
        "createGroupImage/" + userData.username
      );
      const newStorageRef = ref(storage, "groupsImages/" + group.title);

      promise = deleteObject(pastStorageRef)
        .then(() => setGroup({ ...group, image: "" }))
        .then(() => uploadImage(newStorageRef, group.file));
    } else {
      promise = Promise.resolve();
    }

    promise
      .then((downloadURL) =>
        getGroupByTitle(group.title).then((snapshot) => ({
          snapshot,
          downloadURL,
        }))
      )
      .then(({ snapshot, downloadURL }) => {
        if (snapshot.exists()) {
          toast.error(`Group with title '${group.title}' has already exists!`);
          throw new Error(
            `Group with title '${group.title}' has already exists!`
          );
        }
        return addGroup(
          group.title,
          downloadURL,
          group.description,
          group.invitedUsers,
          userData.username,
          userData.email
        );
      })
      .then()
      .then(() => navigate("/CreateSuccess/Group"));
  };

  return (
    <>
      <Dialog open={creatingGroup}>
        <DialogContent>
          <CircularProgress />
        </DialogContent>
      </Dialog>
      <div style={{ margin: "60px 0" }}>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            style={{ padding: "20px", background: "#f5f5f5" }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              style={{ color: "#394E6A", fontFamily: "Fantasy" }}
            >
              Create new Group:
            </Typography>
            <StyledTextField
              value={group.title}
              onChange={updateGroup("title")}
              type="text"
              name="groupTitle"
              id="groupTitle"
              placeholder="Group Title"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            />
            <StyledTextField
              value={group.description}
              onChange={updateGroup("description")}
              type="text"
              name="groupDescription"
              id="groupDescription"
              placeholder="Group Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              style={{ marginBottom: "20px" }}
            />
            <QuizImage prop={group} fn={setGroup} value="group" />
            <FormControl component="fieldset">
              <Box
                id="upload-image"
                marginBottom={2}
                display="flex"
                alignItems="center"
                flexWrap="wrap"
              >
                <ThemeProvider theme={theme}>
                  <FormLabel component="legend" style={{ marginRight: "15px" }}>
                    Invite Users:
                  </FormLabel>
                  {users?.map((user) => (
                    <>
                      {user.username !== userData.username && (
                        <FormControlLabel
                          key={user.username}
                          control={
                            <Checkbox
                              value={user.username}
                              onChange={(e) =>
                                setGroup({
                                  ...group,
                                  invitedUsers: e.target.checked
                                    ? [...group.invitedUsers, user.username]
                                    : group.invitedUsers.filter(
                                        (el) => el !== user.username
                                      ),
                                })
                              }
                            />
                          }
                          label={user.username}
                        />
                      )}
                    </>
                  ))}
                </ThemeProvider>
              </Box>
            </FormControl>
          </Paper>
        </Container>
        <Box
          width="79%"
          display="flex"
          justifyContent="flex-end"
          marginTop={2}
          gap="5.8vw"
        >
          <Button
            variant="contained"
            onClick={handleAddGroup}
            sx={{
              fontSize: "20px",
              padding: "10px",
              backgroundColor: "rgb(3, 165, 251)",
            }}
          >
            Create Group
          </Button>
        </Box>
      </div>
    </>
  );
};

export default CreateGroup;
