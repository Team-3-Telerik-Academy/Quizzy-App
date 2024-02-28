import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  Link,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import {
  createUserUsername,
  getUserByUsername,
  getUserData,
} from "../../services/users.service";
import { registerUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import signUpBackground from "../../Images/sign-up-background.jpg";
import toast, { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(3, 165, 251)",
    },
  },
});

export default function SignUp() {
  const [success, setSuccess] = useState(false);
  const { setContext } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if(success) {
      toast.success('You have signed up successfully!', {
        position: "bottom-right"
      })
    }
  }, [success])

  const updateForm = (prop) => (e) => {
    setError("");
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const validateData = () => {
    if (form.username.length < 3 || form.username.length > 30) {
      setError("Username should be between 3 and 30 characters long!");
      return false;
    }

    if (form.firstName.length < 1 || form.firstName.length > 30) {
      setError("First Name should be between 1 and 30 characters long!");
      return false;
    }

    if (!/^[A-Za-z]+$/.test(form.firstName)) {
      setError(
        "First Name should include only uppercase and lowercase letters!"
      );
      return false;
    }

    if (form.lastName.length < 1 || form.lastName.length > 30) {
      setError("Last Name should be between 1 and 30 characters long!");
      return false;
    }

    if (!/^[A-Za-z]+$/.test(form.lastName)) {
      setError(
        "Last Name should include only uppercase and lowercase letters!"
      );
      return false;
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValid = isValidEmail(form.email);

    if (!isValid) {
      setError("Email is not valid!");
      return false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Phone number should have exactly 10 digits!");
      return false;
    }

    if (!form.password) {
      setError("Password is required!");
      return false;
    }

    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validateData()) return;
    onRegister();
  };

  const onRegister = () => {
    getUserByUsername(form.username)
      .then((snapshot) => {
        if (snapshot.exists()) {
          throw new Error(`Username ${form.username} has already been taken!`);
        }
        return getUserData("phone", form.phone);
      })
      .then((snapshot) => {
        if (snapshot.exists()) {
          throw new Error(`Phone number ${form.phone} has already been taken!`);
        }
        setSuccess(true);
        return registerUser(form.email, form.password);
      })
      .then((credential) => {
        return createUserUsername(
          form.username,
          credential.user.uid,
          credential.user.email,
          form.firstName,
          form.lastName,
          form.phone
        ).then(() => {
          setContext({
            user: credential.user,
          });
        });
      })
      .then(() => navigate('./'))
      .catch((e) => {
        if (e.message.includes("email")) {
          setError("Email is already in use!");
        } else if (e.message.includes("weak-password")) {
          setError("Password should be at least 6 characters long!");
        } else {
          setError(e.message);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "90.9vh",
          backgroundImage: `url(${signUpBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: "0",
        }}
      >
        <Toaster/>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            width: "30vw",
            position: "absolute",
            left: "200px",
            bottom: "80px",
          }}
        >
          <div
            style={{
              marginTop: "64px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AccountCircleIcon
              style={{ fontSize: 60, color: "rgb(3, 165, 251)" }}
            />
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "20px", textAlign: "center" }}
            >
              Sign up
            </Typography>
            {error && (
              <Alert severity="error" style={{ marginBottom: "20px" }}>
                {error}
              </Alert>
            )}
            <form
              onSubmit={submitForm}
              style={{ width: "100%", marginTop: "8px" }}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={form.username}
                    onChange={updateForm("username")}
                    autoComplete="username"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    size="small"
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={form.firstName}
                    onChange={updateForm("firstName")}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    size="small"
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={form.lastName}
                    onChange={updateForm("lastName")}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    size="small"
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={form.email}
                    onChange={updateForm("email")}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    size="small"
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={form.phone}
                    onChange={updateForm("phone")}
                    variant="outlined"
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="tel"
                    size="small"
                    style={{ borderRadius: "10px" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={form.password}
                    onChange={updateForm("password")}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    size="small"
                    style={{ borderRadius: "10px", marginBottom: "20px" }}
                  />
                </Grid>
                <Grid
                  container
                  spacing={1}
                  justifyContent="space-between"
                  style={{ width: "100%", marginLeft: "7px" }}
                >
                  <Grid item xs={6}>
                    <Button
                      onClick={() => navigate("/")}
                      fullWidth
                      variant="contained"
                      style={{
                        margin: "0 0 16px",
                        backgroundColor: "#fff",
                        color: "rgb(3, 165, 251)",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgb(3, 165, 251)";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.color = "rgb(3, 165, 251)";
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{
                        margin: "0 0 16px",
                        backgroundColor: "rgb(3, 165, 251)",
                        color: "#fff",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      href="/signIn"
                      variant="body2"
                      style={{ color: "rgb(3, 165, 251)" }}
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
