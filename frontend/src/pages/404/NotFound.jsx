import { Link } from "react-router-dom";

// @mui
import { Stack } from "@mui/material";
import styled from "@emotion/styled";

// Style
import "./notFound.scss";

const NotFound = () => {
  return (
    <Container className='notFound'>
      404 Page Not Found Go Back <Link to='/'>Home</Link>
    </Container>
  );
};

export default NotFound;

const Container = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "& a": {
    color: theme.palette.secondary.light,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));
