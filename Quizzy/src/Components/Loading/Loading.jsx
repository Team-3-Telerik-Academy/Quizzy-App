import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import signUpBackground from "../../Images/sign-up-background.jpg";

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: `url(${signUpBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <CircularProgress sx={{ color: 'rgb(3, 165, 251)', marginBottom: '1rem' }} />
    <Typography variant="h6" style={{color: 'rgb(3, 165, 251)'}}>
      Loading, please wait...
    </Typography>
  </Box>
);

export default Loading;
