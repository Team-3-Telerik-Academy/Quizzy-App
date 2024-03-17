import { Box } from "@mui/material";
import AppContext from "../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
import { byUsername, listenForChatUsers } from "../../services/users.service";
import { useRef } from "react";
import { sendMessage } from "../../services/users.service";

const Messenger = () => {
  const { userData, chatUser, setChatUser, setUserData } =
    useContext(AppContext);
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(null);

  useEffect(() => {
    if (
      selectedPerson &&
      userData.messages[selectedPerson.selected.username]
    ) {
      setChat(userData.messages[selectedPerson.selected.username].chat);
    }
  }, [selectedPerson, userData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleMessage = async (
    e,
    personSendingMessage,
    content,
    personReceivingMessage
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const result = await sendMessage(
        personSendingMessage,
        content,
        personReceivingMessage
        // setUserData
      );
      setMessage("");
    }
  };

  // useEffect(() => {
  //   // byUsername(userData.username).then((result) => {
  //   //   const people = Object.values(result.messages);
  //   //   setPeople(people);
  //   //   if (chatUser) {
  //   //     const selectedChatUser = people.filter(
  //   //       (person) => person.username === chatUser
  //   //     );
  //   //     setSelectedPerson({ selected: selectedChatUser[0] });
  //   //   } else {
  //   //     setSelectedPerson({ selected: people[0] });
  //   //   }
  //   // });

  //   if (userData.messages) {
  //     const people = Object.values(userData.messages);
  //     setPeople(people);
  //     if (chatUser) {
  //       const selectedChatUser = people.filter(
  //         (person) => person.username === chatUser
  //       );
  //       setSelectedPerson({ selected: selectedChatUser[0] });
  //     } else {
  //       setSelectedPerson({ selected: people[0] });
  //     }
  //   }
  // }, [userData]);

  useEffect(() => {
    if (userData.messages) {
      const people = Object.values(userData.messages);
      setPeople(people);
      if (chatUser) {
        const selectedChatUser = people.filter(
          (person) => person.username === chatUser
        );
        setSelectedPerson({ selected: selectedChatUser[0] });
      } else {
        setSelectedPerson({ selected: people[0] });
      }
    }
  }, [userData.messages]);

  // useEffect(() => {
  //   listenForChatUsers(userData.username, setPeople);
  // }, [userData.messages]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        overflow: "hidden",
        height: "92.1vh",
        marginTop: "20px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "auto",
          paddingLeft: "15px",
          paddingTop: "15px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          margin: 0,
        }}
      >
        <span
          style={{
            fontFamily: "Georgia",
            fontWeight: "bold",
            fontSize: "30px",
            borderRight: "3px solid #f3f4f6",
          }}
        >
          Messages
        </span>
        <Box sx={{ borderRight: "3px solid #f3f4f6" }}>
          <input
            placeholder="Search in Messenger"
            style={{
              marginTop: "10px",
              width: "93%",
              height: "40px",
              borderRadius: "15px",
              padding: "10px",
              outline: "none",
              border: "1px solid #f3f4f6",
              backgroundColor: "#f3f4f6",
              marginBottom: "10px",
            }}
          ></input>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            flex: "1",
            height: "100%",
            borderRight: "3px solid #f3f4f6",
          }}
        >
          {people?.map((person) => {
            return (
              <Box
                key={person.username}
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  backgroundColor:
                    selectedPerson?.selected === person ? "#ADD8E6" : "white",
                  marginBottom: "1px",
                  alignItems: "center",
                  width: "360px",
                  borderRadius: "7px",
                  padding: "5px",
                  transition: "background-color 0.3s ease",
                  ":hover": {
                    backgroundColor:
                      selectedPerson?.selected === person
                        ? "#ADD8E6"
                        : "#e7e8eb",
                  },
                }}
              >
                <img
                  src={person.image}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  alt=""
                />
                <span
                  style={{
                    marginLeft: "20px",
                    fontFamily: "Georgia",
                    fontWeight: "bold",
                    color: "#394e6a",
                  }}
                >
                  {person.firstName} {person.lastName}
                </span>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "13%",
            borderBottom: "3px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <img
            src={selectedPerson?.selected?.image}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              marginLeft: "10px",
            }}
            alt=""
          />
          <span
            style={{
              fontFamily: "Georgia",
              fontWeight: "bold",
              color: "#394e6a",
              fontSize: "25px",
            }}
          >
            {selectedPerson?.selected?.firstName}{" "}
            {selectedPerson?.selected?.lastName}
          </span>
        </Box>
        <Box sx={{ height: "100vh" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              flex: "1",
              height: "69vh",
              padding: "10px",
              borderRight: "3px solid #f3f4f6",
            }}
          >
            {chat &&
              Object.values(chat).map((message) => {
                return <h3>{message.message}</h3>;
              })}
            <div ref={messagesEndRef} />
          </Box>
          <textarea
            style={{
              marginTop: "3px",
              borderRadius: "15px",
              marginLeft: "10px",
              padding: "10px",
              resize: "none",
              border: "3px solid #f3f4f6",
            }}
            onKeyDown={(e) =>
              handleMessage(
                e,
                userData.username,
                message,
                selectedPerson?.selected.username
              )
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name=""
            id=""
            cols="137"
            rows="2"
          ></textarea>
        </Box>
      </Box>
    </Box>
  );
};

export default Messenger;
