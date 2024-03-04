import toast from "react-hot-toast";
import { updateUserInfo } from "../../services/users.service";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import UploadImage from "../../Components/UploadImage/UploadImage";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

const UserProfileBox = styled(Box)({
  backgroundColor: "white",
  color: "black",
  marginTop: "50px",
  boxShadow: "0 0 10px 0 rgba(0,0,0,0.7)",
});

const HeaderBox = styled(Box)({
  backgroundColor: "rgb(3,165,251)",
  color: "white",
  padding: "1em",
  display: "flex",
  justifyContent: "space-between",
});

const InfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "1em",
});

const LeftInfoBox = styled(Box)({
  flex: "1 1 50%",
  marginRight: "1em",
});

const RightInfoBox = styled(Box)({
  flex: "1 1 50%",
});

const InfoText = styled(Typography)({
  margin: "1em 0",
});

const ProfileContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "1em",
});

const ChangeInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const InfoInput = styled(TextField)({
  marginBottom: "1em",
});

const UserProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const [profileInfo, setProfileInfo] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    phone: userData?.phone || "",
  });

  const [editProfile, setEditProfile] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    image: false,
  });

  const handleFirstNameChange = () => {
    if (profileInfo.firstName.length < 4 || profileInfo.firstName.length > 32) {
      toast.error("First Name should be between 4 and 32 characters long!");
      return;
    }

    updateUserInfo(
      userData.username,
      "firstName",
      profileInfo.firstName,
      setUserData
    ).then(() => setEditProfile({ ...editProfile, firstName: false }));
  };

  const handleLastNameChange = () => {
    if (profileInfo.lastName.length < 4 || profileInfo.lastName.length > 32) {
      toast.error("Last Name should be between 4 and 32 characters long!");
      return;
    }

    updateUserInfo(
      userData.username,
      "lastName",
      profileInfo.lastName,
      setUserData
    ).then(() => setEditProfile({ ...editProfile, lastName: false }));
  };

  const handlePhoneChange = () => {
    if (!profileInfo.phone) {
      toast.error("Phone number cannot be empty!");
      return;
    }

    if (!/^\d+$/.test(profileInfo.phone)) {
      toast.error("Phone number can only contain digits!");
      return;
    }

    if (profileInfo.phone.length !== 10) {
      toast.error("Phone number must be 10 digits long");
      return;
    }

    updateUserInfo(
      userData.username,
      "number",
      profileInfo.phone,
      setUserData
    ).then(() => {
      userData.phone = profileInfo.phone;
      setEditProfile({ ...editProfile, phone: false });
    });
  };

  // const deleteNumber = () => {
  //   setEditProfile({ ...editProfile, phone: true });
  //   updateUserInfo(userData.username, "number", null, setUserData).then(() => {
  //     setProfileInfo({ ...profileInfo, phone: "" });
  //     setEditProfile({ ...editProfile, phone: false });
  //   });
  // };

  return (
    <UserProfileBox>
      <HeaderBox>
        <Box>
          {userData?.image && (
            <img
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              src={userData?.image}
              alt={userData?.username}
            />
          )}
          <Typography variant="h4" marginLeft="17px">
            {userData?.username}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">
            Created quizzes:{" "}
            {userData?.quizzes ? Object.keys(userData.quizzes).length : 0}
          </Typography>
          <Typography variant="body1">
            Taken quizzes: {userData?.takenQuizzes || 0}
          </Typography>
          <Typography variant="body1">
            Rank / Scoreboard Place: {userData?.rank || 0}
          </Typography>
          <Typography variant="body1">
            Joined on:{" "}
            {new Date(userData?.createdOn).toLocaleString("bg-BG", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          {userData?.isBlocked && (
            <Typography>This profile is blocked!</Typography>
          )}
        </Box>
      </HeaderBox>
      <InfoBox>
        <LeftInfoBox>
          <ProfileContent>
            <ChangeInfo>
              <InfoText variant="body1">
                <strong>Username:</strong> <br /> {userData?.username}
              </InfoText>
              <Divider />
              <InfoText variant="body1">
                <strong>Email:</strong> <br /> {userData?.email}
              </InfoText>
              <Divider />
              <InfoText variant="body1" position="relative">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  style={{ flexDirection: "column", height: "100%" }}
                >
                  <div style={{ lineHeight: "2" }}>
                    <strong>First Name:</strong> <br />
                    {editProfile.firstName ? (
                      <InfoInput
                        type="text"
                        value={profileInfo.firstName}
                        onChange={(e) => {
                          setProfileInfo({
                            ...profileInfo,
                            firstName: e.target.value,
                          });
                        }}
                        name="firstName"
                        id="firstName"
                        style={{ paddingTop: "7px", marginRight: "-10px" }}
                        inputProps={{ style: { padding: "7px" } }}
                      />
                    ) : (
                      <>{userData?.firstName}</>
                    )}
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      position: "absolute",
                      bottom: "19%",
                    }}
                  >
                    {editProfile.firstName ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleFirstNameChange}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() =>
                          setEditProfile({ ...editProfile, firstName: true })
                        }
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </Box>
              </InfoText>
              <Divider />
              <InfoText variant="body1" position="relative">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  style={{ flexDirection: "column", height: "100%" }}
                >
                  <div style={{ lineHeight: "2" }}>
                    <strong>Last Name:</strong> <br />
                    {editProfile.lastName ? (
                      <InfoInput
                        type="text"
                        value={profileInfo.lastName}
                        onChange={(e) => {
                          setProfileInfo({
                            ...profileInfo,
                            lastName: e.target.value,
                          });
                        }}
                        name="secondName"
                        id="secondName"
                        style={{ paddingTop: "7px", marginRight: "-10px" }}
                        inputProps={{ style: { padding: "7px" } }}
                      />
                    ) : (
                      <>{userData?.lastName}</>
                    )}
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      position: "absolute",
                      bottom: "24%",
                    }}
                  >
                    {editProfile.lastName ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLastNameChange}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() =>
                          setEditProfile({ ...editProfile, lastName: true })
                        }
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </Box>
              </InfoText>
              <Divider />

              <InfoText variant="body1" position="relative">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  style={{ flexDirection: "column", height: "100%" }}
                >
                  <div style={{ lineHeight: "2" }}>
                    <strong>Phone Number:</strong> <br />
                    {editProfile.phone ? (
                      <InfoInput
                        type="text"
                        value={profileInfo.phone}
                        onChange={(e) => {
                          setProfileInfo({
                            ...profileInfo,
                            phone: e.target.value,
                          });
                        }}
                        name="phone"
                        id="phone"
                        style={{ paddingTop: "7px", marginRight: "-10px" }}
                        inputProps={{ style: { padding: "7px" } }}
                      />
                    ) : (
                      <>{userData?.number}</>
                    )}
                  </div>
                  <div
                    style={{
                      alignSelf: "flex-end",
                      position: "absolute",
                      bottom: "22%",
                    }}
                  >
                    {editProfile.phone ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handlePhoneChange}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() =>
                          setEditProfile({ ...editProfile, phone: true })
                        }
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </Box>
              </InfoText>
            </ChangeInfo>
          </ProfileContent>
        </LeftInfoBox>
        <RightInfoBox>
          <UploadImage prop={userData} value="userImage" fn={setUserData} />
        </RightInfoBox>
      </InfoBox>
    </UserProfileBox>
  );
};

export default UserProfile;
