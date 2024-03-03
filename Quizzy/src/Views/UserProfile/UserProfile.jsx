import toast from "react-hot-toast";
import { updateUserInfo } from "../../services/users.service";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import UploadImage from "../../Components/UploadImage/UploadImage";

const UserProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const [profileInfo, setProfileInfo] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    number: userData?.number || "",
  });

  const [editProfile, setEditProfile] = useState({
    firstName: false,
    lastName: false,
    number: false,
    image: false,
  });

  const handleFirstNameChange = () => {
    if (profileInfo.firstName.length < 4 || profileInfo.firstName.length > 32) {
      toast.error("First Name should be between 4 and 32 characters long!");
      return;
    }

    updateUserInfo(userData.username, "firstName", profileInfo.firstName, setUserData).then(
      () => setEditProfile({ ...editProfile, firstName: false })
    );
  };

  const handleLastNameChange = () => {
    if (profileInfo.lastName.length < 4 || profileInfo.lastName.length > 32) {
      toast.error("Last Name should be between 4 and 32 characters long!");
      return;
    }

    updateUserInfo(userData.username, "lastName", profileInfo.lastName, setUserData).then(
      () => setEditProfile({ ...editProfile, lastName: false })
    );
  };

  const handlePhoneChange = () => {
    if (!profileInfo.number) {
      toast.error("Phone number cannot be empty!");
      return;
    }

    if (!/^\d+$/.test(profileInfo.number)) {
      toast.error("Phone number can only contain digits!");
      return;
    }

    if (profileInfo.number.length !== 10) {
      toast.error("Phone number must be 10 digits long");
      return;
    }

    updateUserInfo(userData.username, "number", profileInfo.number, setUserData).then(() => {
      userData.number = profileInfo.number;
      setEditProfile({ ...editProfile, number: false });
    });
  };

  const deleteNumber = () => {
    setEditProfile({ ...editProfile, number: true });
    updateUserInfo(userData.username, "number", null, setUserData).then(() => {
      setProfileInfo({ ...profileInfo, number: "" });
      setEditProfile({ ...editProfile, number: false });
    });
  };

  return (
    <div id="user-profile">
      <div id="profile-header">
        <div id="username-and-image">
          {userData?.image && (
            <img
              id="little-image-display"
              src={userData?.image}
              alt={userData?.username}
            />
          )}

          <h1>{userData?.username}</h1>
        </div>
        <div id="header-profile-info">
          <p className="info">
            Created quizzes <br />{" "}
            {userData?.quizzes ? Object.keys(userData.quizzes).length : 0}
          </p>
          <div className="vertical-line"></div>
          <p className="info">
            Taken quizzes <br /> {userData?.takenQuizzes || 0}
          </p>
          <div className="vertical-line"></div>
          <p className="info">
            Rank / Scoreboard Place <br /> {userData?.rank || 0}
          </p>
          <div className="vertical-line"></div>
          <p className="info">
            Joined <br />{" "}
            {new Date(userData?.createdOn).toLocaleString("bg-BG", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {userData?.isBlocked && (
            <div id="blocked-info">This profile is blocked!</div>
          )}
        </div>
      </div>
      <div id="profile-main-content">
          <div id="profile-change-info">
            <div id="change-info-left-side">
              <p className="info">
                <strong>Username:</strong> <br /> {userData?.username}
                <hr />
              </p>
              <p className="info">
                <strong>Email:</strong> <br /> {userData?.email}
              </p>
              <hr />
              <p className="info">
                <strong>First Name:</strong> <br />
                {editProfile.firstName ? (
                  <>
                    <input
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
                    />
                    <button onClick={handleFirstNameChange}>Done</button>
                  </>
                ) : (
                  <>
                    {userData?.firstName}
                    <button
                      onClick={() =>
                        setEditProfile({ ...editProfile, firstName: true })
                      }
                    >
                      Edit
                    </button>
                  </>
                )}
              </p>
              <hr />
              <p className="info">
                <strong>Last Name:</strong> <br />
                {editProfile.lastName ? (
                  <>
                    <input
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
                    />
                    <button onClick={handleLastNameChange}>Done</button>
                  </>
                ) : (
                  <>
                    {userData?.lastName}
                    <button
                      onClick={() =>
                        setEditProfile({ ...editProfile, lastName: true })
                      }
                    >
                      Edit
                    </button>
                  </>
                )}
              </p>
              <hr />
              {userData?.admin && (
                <p className="info">
                  <strong>Phone Number:</strong> <br />
                  {editProfile.number ? (
                    <>
                      <input
                        type="text"
                        value={profileInfo.number}
                        onChange={(e) => {
                          setProfileInfo({
                            ...profileInfo,
                            number: e.target.value,
                          });
                        }}
                        name="phone"
                        id="phone"
                      />
                      <button onClick={handlePhoneChange} color={"#d98f40"}>
                        Done
                      </button>
                    </>
                  ) : (
                    <>
                      {userData?.number}
                      <button
                        onClick={() =>
                          setEditProfile({ ...editProfile, number: true })
                        }
                        color={"#d98f40"}
                      >
                        Edit
                      </button>
                      {userData.number && (
                        <button
                          id={"delete-number-button"}
                          onClick={deleteNumber}
                          color={"#d98f40"}
                        >
                          Delete
                        </button>
                      )}
                    </>
                  )}
                </p>
              )}
            </div>
            <UploadImage
              prop={userData}
              value="userImage"
              fn={setUserData}
            />
          </div>
      </div>
    </div>
  );
};

export default UserProfile;
