import IrinaImage from "..//../Images/Irina.jpeg";
import MariusImage from "..//../Images/Marius.jpg";
import phoneIcon from "..//../Images/phone-icon.svg";
import mailIcon from "..//../Images/mail-icon.svg";

const owners = [
  {
    name: "Marius Naydenov",
    designation: "Junior Frontend Developer",
    content:
      "Ambitious Web Developer with a strong foundation in front-end technologies and a passion for creating intuitive user experiences. Eager to leverage 6 months of experience in a dynamic environment that fosters growth, innovation, and collaboration while honing critical thinking and leadership abilities.",
    id: 1,
    image: MariusImage,
    phone: "+359 888 989 350",
    email: "marius.naydenov1994@gmail.com",
  },
  {
    name: "Irina Demostenova",
    designation: "Junior Frontend Developer",
    content:
      "Driven Front-End Engineer adapt at crafting visually appealing and functional interfaces, equipped with 6 months of hands-on experience. Pursuing a role that not only challenges problem-solving abilities but also encourages leadership development and continuous enhancement of technical proficiencies.",
    id: 2,
    image: IrinaImage,
    phone: "+359 888 010 798",
    email: "i.demostenova@gmail.com",
  },
];

const Profile = () => {
  return (
    <div
      className="profile_component"
      style={{
        backgroundColor: "#F3F4f6",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        gap: "30px",
        // alignItems: "center",
      }}
    >
      {owners.map((owner) => {
        return (
          <div
            key={owner.id}
            className="person-profile"
            style={{
              width: "450px",
              height: "430px",
              backgroundColor: "#FFFFFF",
              marginTop: "70px",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "10px",
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
              padding: "0px 5px 0px 5px",
            }}
          >
            <img
              src={owner.image}
              alt=""
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                position: "absolute",
                top: "4%",
                border: "5px solid white",
              }}
            />
            <span
              style={{
                marginTop: "90px",
                fontFamily: "Georgia, serif",
                fontSize: "35px",
                color: "rgb(3,165,251)",
              }}
            >
              {owner.name}
            </span>
            <span
              style={{
                marginTop: "10px",
                fontFamily: "Georgia, serif",
                fontSize: "20px",
              }}
            >
              {owner.designation}
            </span>
            <div
              style={{
                textAlign: "center",
                fontSize: "16px",
                marginTop: "13px",
                marginBottom: "13px",
                padding: "7px",
                color: "#4B5563",
                fontFamily: "Georgia, serif",
              }}
            >
              <span>{owner.content}</span>
            </div>
            <div
              className="contact_details"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
                borderTop: "1px solid gray",
                width: "230px",
              }}
            >
              <span style={{ marginTop: "7px", fontSize: "25px" ,color: "rgb(3,165,251)"}}>
                Contact details
              </span>

              <span
                style={{
                  marginTop: "7px",
                  fontSize: "17px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={phoneIcon}
                  style={{ width: "18px", marginRight: "7px" }}
                  alt=""
                />

                {owner.phone}
              </span>
              <span
                style={{
                  marginTop: "7px",
                  fontSize: "17px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={mailIcon}
                  style={{ width: "18px", height: "18px", marginRight: "7px" }}
                  alt=""
                />
                {owner.email}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
