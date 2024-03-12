import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const UserProfileBox = styled(Box)({
    backgroundColor: "white",
    color: "black",
    marginTop: "25px",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.7)",
});

export const InfoBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding: "1em",
});

export const LeftInfoBox = styled(Box)({
    flex: "1 1 50%",
    marginRight: "1em",
});

export const RightInfoBox = styled(Box)({
    flex: "1 1 35%",
});

export const InfoText = styled(Typography)({
    margin: "1em 0",
});

export const ProfileContent = styled(Box)({
    display: "flex",
    flexDirection: "column",
    padding: "1em",
});

export const ChangeInfo = styled(Box)({
    display: "flex",
    flexDirection: "column",
});