import { Button, TextField, Grid, Container, Typography, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 
export default function SignUp() {
  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AccountCircleIcon style={{ fontSize: 60, color: 'rgb(3, 165, 251)' }} />
        <Typography component="h1" variant="h5" style={{ marginBottom: '20px', textAlign: 'center' }}>
          Sign up
        </Typography>
        <form style={{ width: '100%', marginTop: '8px' }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                size="small"
                style={{ borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                size="small"
                style={{ borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                size="small"
                style={{ borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
                style={{ borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel"
                size="small"
                style={{ borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
                style={{ borderRadius: '10px', marginBottom: '20px' }}
              />
            </Grid>
            <Grid container spacing={1} justifyContent="space-between" style={{width: '100%', marginLeft: '7px'}}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ margin: '0 0 16px', backgroundColor: '#fff', color: 'rgb(3, 165, 251)' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(3, 165, 251)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = 'rgb(3, 165, 251)';
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
                  style={{ margin: '0 0 16px', backgroundColor: 'rgb(3, 165, 251)', color: '#fff' }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}