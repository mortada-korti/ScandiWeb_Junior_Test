import { Route, Routes, useNavigate } from "react-router-dom";

// Context
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { SelectedProductsContext } from "../../context/SelectedProductsContext";
import { MenuOpenContext } from "../../context/MenuOpenContext";

// @mui
import { IconButton, Stack } from "@mui/material";
import { MaterialUISwitch } from "../switch/MaterialUISwitch";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

// Style
import "./header.scss";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isOpen, setIsOpen } = useContext(MenuOpenContext);
  const { selectedProducts } = useContext(SelectedProductsContext);
  const navigate = useNavigate();

  const props = {
    darkMode,
    toggleDarkMode,
    isOpen,
    setIsOpen,
    selectedProducts,
    navigate,
  };

  return (
    <Routes>
      <Route path='/' element={<ListHeader props={props} />} />
      <Route path='/add-product' element={<AddHeader props={props} />} />
      <Route path='*' element={<NotFoundHeader props={props} />} />
    </Routes>
  );
};

export default Header;

const ListHeader = ({ props }) => {
  return (
    <Container className='header'>
      <h1 className='header--title'>Product List</h1>

      <MaterialUISwitch
        onChange={props.toggleDarkMode}
        checked={props.darkMode}
      />

      <div className='header--buttons'>
        <Button
          endIcon={<AddIcon />}
          color='primary'
          variant='contained'
          onClick={() => props.navigate("/add-product")}>
          ADD
        </Button>
        <Tooltip TransitionComponent={Zoom} title='Delete Selected Products'>
          <Badge
            badgeContent={props.selectedProducts.length}
            showZero
            color='error'>
            <Button
              endIcon={<DeleteIcon />}
              color='error'
              variant='contained'
              type='submit'
              id='delete-product-btn'
              form='product_form'>
              MASS DELETE
            </Button>
          </Badge>
        </Tooltip>
      </div>

      {!props.isOpen && (
        <IconButton
          className='header--menu'
          onClick={() => props.setIsOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}

      {props.isOpen && (
        <>
          <IconButton
            className='header--menu'
            onClick={() => props.setIsOpen(false)}>
            <CloseIcon />
          </IconButton>

          <Items className='menu--items'>
            <Button
              endIcon={<AddIcon />}
              color='primary'
              variant='contained'
              onClick={() => props.navigate("/add-product")}>
              ADD
            </Button>

            <Badge
              badgeContent={props.selectedProducts.length}
              showZero
              color='error'>
              <Button
                endIcon={<DeleteIcon />}
                color='error'
                variant='contained'
                type='submit'
                id='delete-product-btn'
                form='product_form'>
                MASS DELETE
              </Button>
            </Badge>
          </Items>
        </>
      )}
    </Container>
  );
};

const AddHeader = ({ props }) => {
  return (
    <Container className='header'>
      <h1 className='header--title'>Product Add</h1>

      <MaterialUISwitch
        onChange={props.toggleDarkMode}
        checked={props.darkMode}
      />

      <div className='header--buttons'>
        <Button
          endIcon={<SaveIcon />}
          color='success'
          variant='contained'
          type='submit'
          form='product_form'>
          Save
        </Button>

        <Button
          endIcon={<CancelIcon />}
          color='error'
          variant='contained'
          onClick={() => props.navigate("/")}>
          Cancel
        </Button>
      </div>

      {!props.isOpen && (
        <IconButton
          className='header--menu'
          onClick={() => props.setIsOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}

      {props.isOpen && (
        <>
          <IconButton
            className='header--menu'
            onClick={() => props.setIsOpen(false)}>
            <CloseIcon />
          </IconButton>

          <Items className='menu--items'>
            <Button
              endIcon={<SaveIcon />}
              color='success'
              variant='contained'
              type='submit'
              form='product_form'>
              Save
            </Button>

            <Button
              endIcon={<CancelIcon />}
              color='error'
              variant='contained'
              onClick={() => props.navigate("/")}>
              Cancel
            </Button>
          </Items>
        </>
      )}
    </Container>
  );
};

const NotFoundHeader = ({ props }) => {
  return (
    <Container className='header'>
      <h1 className='header--title'>Scandiweb</h1>

      <MaterialUISwitch
        onChange={props.toggleDarkMode}
        checked={props.darkMode}
      />

      <div className='header--buttons'>
        <Button
          endIcon={<HomeIcon />}
          color='secondary'
          variant='contained'
          onClick={() => props.navigate("/")}>
          Home
        </Button>
      </div>

      {!props.isOpen && (
        <IconButton
          className='header--menu'
          onClick={() => props.setIsOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}

      {props.isOpen && (
        <>
          <IconButton
            className='header--menu'
            onClick={() => props.setIsOpen(false)}>
            <CloseIcon />
          </IconButton>

          <Items className='menu--items'>
            <Button
              endIcon={<HomeIcon />}
              color='secondary'
              variant='contained'
              onClick={() => props.navigate("/")}>
              HOME
            </Button>
          </Items>
        </>
      )}
    </Container>
  );
};

const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  borderColor: theme.palette.divider,
}));

const Items = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A1A1A" : "#eee",
  border: "1px solid transparent",
  borderTop: "none",
  borderColor: theme.palette.divider,
}));
