// @mui
import { Stack } from "@mui/material";
import styled from "@emotion/styled";

// Style
import "./footer.scss";

const Footer = () => {
  return (
    <Container className='footer'>
      <div className='footer--logo'>
        <img src='./logo.png' alt='logo' />
      </div> 
      <span className='footer--text'>Scandiweb Test assignment</span>
    </Container>
  );
};

export default Footer;

const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  borderColor: theme.palette.divider,
}));
