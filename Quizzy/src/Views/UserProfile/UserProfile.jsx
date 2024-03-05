import toast from "react-hot-toast";
import { updateUserInfo } from "../../services/users.service";
import { useContext, useState } from "react";
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
import ProfileEditField from "../../Components/ProfileEditField/ProfileEditField";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";

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

  return (
    <UserProfileBox>
      <ProfileHeader />
      <InfoBox style={{backgroundColor: '#F3F4F6'}}>
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
              <ProfileEditField
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
              <Divider />
              <ProfileEditField
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
              <Divider />
              <ProfileEditField
                label="Phone"
                value={profileInfo.phone}
                isEditing={editProfile.phone}
                onEdit={() => setEditProfile({ ...editProfile, phone: true })}
                onChange={(e) => {
                  setProfileInfo({
                    ...profileInfo,
                    phone: e.target.value,
                  });
                }}
                onSave={handlePhoneChange}
              />
            </ChangeInfo>
          </ProfileContent>
        </LeftInfoBox>
        <RightInfoBox style={{marginTop: '30px'}}>
          <UploadImage prop={userData} value="userImage" fn={setUserData} />
        </RightInfoBox>
      </InfoBox>
    </UserProfileBox>
  );
};

export default UserProfile;
