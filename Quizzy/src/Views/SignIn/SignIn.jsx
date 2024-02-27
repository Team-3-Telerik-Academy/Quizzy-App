import Avatar from "@mui/material/Avatar";
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
import { useNavigate } from "react-router-dom";
import signInBackground from "../../Images/sign-in-background.jpg";

const theme = createTheme({
  palette: {
    primary: { main: "rgb(3, 165, 251)" },
    secondary: { main: "rgb(3, 165, 251)" },
  },
});

const SignIn = () => {
  const navigate = useNavigate();
  const { setContext } = useContext(AppContext);
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
    // TODO: validate form before submitting

    loginUser(form.email, form.password)
      .then((credential) => {
        setContext({
          user: credential.user,
        });
      })
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.log(e.message));
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
          {" "}
          <CssBaseline />{" "}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {" "}
              <LockOutlinedIcon />{" "}
            </Avatar>{" "}
            <Typography component="h1" variant="h5">
              {" "}
              Sign in{" "}
            </Typography>{" "}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {" "}
              <TextField
                value={form.email}
                onChange={updateForm("email")}
                margin="normal"
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
