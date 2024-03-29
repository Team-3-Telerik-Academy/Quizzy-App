import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { loginUser } from "../../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";
import signInBackground from "../../Images/sign-in-background.jpg";
import toast from "react-hot-toast";
import { getUserData } from "../../services/users.service";

const theme = createTheme({
  palette: {
    primary: { main: "rgb(3, 165, 251)" },
    secondary: { main: "rgb(3, 165, 251)" },
  },
});

/**
 * Sign In component.
 *
 * @component
 * @example
 * return (
 *   <SignIn />
 * )
 */
const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUserCredentials } = useContext(AppContext);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateForm = (prop) => (e) => {
    setError("");
    setForm({
      ...form,
      [prop]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onLogin();
  };

  const onLogin = () => {
    getUserData("email", form.email).then((user) => {
      if (user.exists() && Object.values(user.val())[0].isBlocked) {
        toast.error("You are blocked! Please contact the administrator.");
        return;
      }

      loginUser(form.email, form.password)
        .then((credential) => {
          toast.success("You have signed in successfully!", {
            position: "bottom-right",
          });
          setUserCredentials(credential.user);
        })
        .then(() => {
          navigate(location?.state?.from || "/");
        })
        .catch((e) => {
          console.log(e.message);
          toast.error(
            "Your login information was incorrect! Please try again."
          );
          setForm({
            ...form,
            password: "",
          });
        });
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "90.5vh",
          backgroundImage: `url(${signInBackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: "0",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {error && (
                <Alert severity="error" style={{ marginBottom: "20px" }}>
                  {error}
                </Alert>
              )}
              <TextField
                style={{ marginBottom: "15px" }}
                value={form.email}
                onChange={updateForm("email")}
                size="small"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />{" "}
              <TextField
                value={form.password}
                onChange={updateForm("password")}
                size="small"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />{" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ color: "white" }}
              >
                {" "}
                Sign In{" "}
              </Button>{" "}
              <Grid container justifyContent="flex-end">
                {" "}
                <Grid item>
                  {" "}
                  <Link href="/signUp" variant="body2">
                    {" "}
                    {"Don't have an account? Sign Up"}{" "}
                  </Link>{" "}
                </Grid>{" "}
              </Grid>{" "}
            </Box>{" "}
          </Box>{" "}
        </Container>{" "}
      </Box>
    </ThemeProvider>
  );
};

export default SignIn;
