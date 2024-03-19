import { Box } from "@mui/material";
import AppContext from "../../Context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { sendMessage } from "../../services/users.service";
import UserProfilePic from "../../Components/UserProfilePic/UserProfilePic";

const Messenger = () => {
  const { userData, chatUser } = useContext(AppContext);
  const [people, setPeople] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (userData?.messages) {
      const people = Object.values(userData.messages);
      if (inputValue) {
        const peopleFilteredByInput = people.filter((person) => {
          return person.firstName.toLowerCase().includes(inputValue);
        });
        setPeople(peopleFilteredByInput);
      } else {
        setPeople(people);
      }
    }
  }, [inputValue]);

  useEffect(() => {
    if (
      selectedPerson &&
      userData?.messages[selectedPerson?.selected?.username]
    ) {
      setChat(userData?.messages[selectedPerson.selected.username].chat);
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
      await sendMessage(personSendingMessage, content, personReceivingMessage, userData.firstName + " " + userData.lastName, userData.image);
      setMessage("");
    }
  };

  useEffect(() => {
    if (userData?.messages) {
      const people = Object.values(userData.messages);
      setPeople(people);
      if (chatUser) {
        const selectedChatUser = people.filter(
          (person) => person.username === chatUser
        );
        setSelectedPerson({ selected: selectedChatUser[0] });
      } else if (selectedPerson === null) {
        setSelectedPerson({ selected: people[0] });
      }
    }
  }, [userData?.messages]);

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
          width: "35%",
          paddingLeft: "15px",
          paddingTop: "15px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          margin: 0,
          justifyContent: "center",
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
        <Box
          sx={{
            borderRight: "3px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            placeholder="Search in Messenger"
            value={inputValue}
            style={{
              marginTop: "10px",
              width: "97%",
              height: "40px",
              borderRadius: "15px",
              padding: "10px",
              outline: "none",
              border: "4px solid #f3f4f6",
              backgroundColor: "#f3f4f6",
              marginBottom: "10px",
              fontFamily: "Segoe UI",
            }}
            onChange={(e) => setInputValue(e.target.value)}
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
          {people?.map((person, idx) => {
            return (
              <Box
                key={idx}
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
                onClick={() => setSelectedPerson({ selected: person })}
              >
                <UserProfilePic image={person.image} status={person.status} />
                {/* <img
                  src={person.image}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  alt=""
                /> */}
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
            height: "15%",
            borderBottom: "3px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            padding: "15px",
          }}
        >
          {selectedPerson?.selected?.image && (
            <img
              src={selectedPerson?.selected?.image}
              style={{ width: "65px", height: "65px", borderRadius: "50%" }}
              alt=""
            />
          )}
          <span
            style={{
              fontFamily: "Georgia",
              fontWeight: "bold",
              color: "#394e6a",
              fontSize: "25px",
              marginLeft: "10px",
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
              paddingTop: "40px",
              paddingRight: "25px",
              borderRight: "3px solid #f3f4f6",
              fontFamily: "Segoe UI",
            }}
          >
            {chat &&
              Object.values(chat).map((message, idx) => {
                if (message.name !== userData.username) {
                  return (
                    <>
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "35px",
                            padding: "10px",
                            borderRadius: "15px",
                            color: "black",
                            fontSize: "15px",
                            marginLeft: "5px",
                          }}
                        >
                          {message.hour === 0 ? "00" : message.hour}:
                          {message.minutes < 10
                            ? `0${message.minutes}`
                            : message.minutes}
                        </span>
                        <span
                          style={{
                            backgroundColor: "#dfe0e2",

                            height: "auto",
                            padding: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "15px",
                            color: "black",
                            fontSize: "17px",
                            marginBottom: "8px",
                            maxWidth: "500px",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {message.message}
                        </span>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div
                      key={idx}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <span
                        style={{
                          backgroundColor: "rgb(3,165,251)",
                          height: "auto",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "15px",
                          color: "white",
                          fontSize: "17px",
                          marginBottom: "8px",
                          maxWidth: "500px",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {message.message}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "30px",
                          padding: "10px",
                          borderRadius: "15px",
                          color: "black",
                          fontSize: "15px",
                          marginLeft: "5px",
                        }}
                      >
                        {message.hour === 0 ? "00" : message.hour}:
                        {message.minutes < 10
                          ? `0${message.minutes}`
                          : message.minutes}
                      </span>
                    </div>
                  );
                }
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
              fontFamily: "Segoe UI",
              width: "95%",
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
