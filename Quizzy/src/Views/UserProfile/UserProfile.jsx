import toast from "react-hot-toast";
import {
  getUserByUsername,
  updateUserInfo,
} from "../../services/users.service";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import UploadImage from "../../Components/UploadImage/UploadImage";
import { Divider } from "@mui/material";
import {
  ChangeInfo,
  InfoBox,
  InfoText,
  LeftInfoBox,
  ProfileContent,
  RightInfoBox,
  UserProfileBox,
} from "./userProfileStyle";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import EditField from "../../Components/EditField/EditField";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { username } = useParams();
  const { userData } = useContext(AppContext);
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    getUserByUsername(username).then((result) => setUser(result.val()));
  }, []);

  const handleFirstNameChange = () => {
    if (profileInfo.firstName.length < 4 || profileInfo.firstName.length > 32) {
      toast.error("First Name should be between 4 and 32 characters long!");
      return;
    }

    updateUserInfo(userData.username, "firstName", profileInfo.firstName).then(
      () => setEditProfile({ ...editProfile, firstName: false })
    );
  };

  const handleLastNameChange = () => {
    if (profileInfo.lastName.length < 4 || profileInfo.lastName.length > 32) {
      toast.error("Last Name should be between 4 and 32 characters long!");
      return;
    }

    updateUserInfo(userData.username, "lastName", profileInfo.lastName).then(
      () => setEditProfile({ ...editProfile, lastName: false })
    );
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

    updateUserInfo(userData.username, "phone", profileInfo.phone).then(() => {
      userData.phone = profileInfo.phone;
      setEditProfile({ ...editProfile, phone: false });
    });
  };

  return (
    <>
      {user && (
        <UserProfileBox>
          <ProfileHeader
            user={userData.username === username ? userData : user}
          />
          <InfoBox style={{ backgroundColor: "#F3F4F6" }}>
            <LeftInfoBox>
              <ProfileContent>
                <ChangeInfo>
                  <InfoText variant="body1">
                    <strong>Username:</strong> <br /> {user.username}
                  </InfoText>
                  <Divider />
                  <InfoText variant="body1">
                    <strong>Email:</strong> <br /> {user.email}
                  </InfoText>
                  <Divider />
                  {userData.username === username ? (
                    <EditField
                      label="First Name"
                      value={profileInfo.firstName}
                      isEditing={editProfile.firstName}
                      onEdit={() =>
                        setEditProfile({ ...editProfile, firstName: true })
                      }
                      onChange={(e) => {
                        setProfileInfo({
                          ...profileInfo,
                          firstName: e.target.value,
                        });
                      }}
                      onSave={handleFirstNameChange}
                    />
                  ) : (
                    <InfoText variant="body1">
                      <strong>First Name:</strong> <br /> {user.firstName}
                    </InfoText>
                  )}
                  <Divider />
                  {userData.username === username ? (
                    <EditField
                      label="Last Name"
                      value={profileInfo.lastName}
                      isEditing={editProfile.lastName}
                      onEdit={() =>
                        setEditProfile({ ...editProfile, lastName: true })
                      }
                      onChange={(e) => {
                        setProfileInfo({
                          ...profileInfo,
                          lastName: e.target.value,
                        });
                      }}
                      onSave={handleLastNameChange}
                    />
                  ) : (
                    <InfoText variant="body1">
                      <strong>Last Name:</strong> <br /> {user.lastName}
                    </InfoText>
                  )}
                  <Divider />
                  {userData.username === username ? (
                    <EditField
                      label="Phone"
                      value={profileInfo.phone}
                      isEditing={editProfile.phone}
                      onEdit={() =>
                        setEditProfile({ ...editProfile, phone: true })
                      }
                      onChange={(e) => {
                        setProfileInfo({
                          ...profileInfo,
                          phone: e.target.value,
                        });
                      }}
                      onSave={handlePhoneChange}
                    />
                  ) : (
                    <InfoText variant="body1">
                      <strong>Phone:</strong> <br /> {user.phone}
                    </InfoText>
                  )}
                </ChangeInfo>
              </ProfileContent>
            </LeftInfoBox>
            {userData.username === username && (
              <RightInfoBox style={{ marginTop: "30px" }}>
                <UploadImage prop={userData} value="userImage" />
              </RightInfoBox>
            )}
          </InfoBox>
        </UserProfileBox>
      )}
    </>
  );
};

export default UserProfile;
