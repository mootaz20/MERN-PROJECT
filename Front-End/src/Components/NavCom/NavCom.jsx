import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import AddPost from "../AddPost/AddPost";
import axios from "axios";


const settings = ['Add Post','Login',"Logout"];

const NavCom = ({data}) => {
   const [anchorElUser, setAnchorElUser] = useState(null);
   const [open, setopen] = useState(false)
   const navigate = useNavigate();

   

   const handleOpenUserMenu = (event) => {
     setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
     setAnchorElUser(null);
   };

  const handleNavigateButton = (el) => {
    if(el === 'Login'){
      navigate('/');
    }else if(el === 'Add Post'){
      setopen(true);
    }else{
      axios.post("http://localhost:3000/logout",[], {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => {
        alert(res.data.message);
        localStorage.removeItem('token');
        navigate('/');
      }).catch(err => console.log(err));
    }
  }
  const handleColse = () => {
    setopen(false)
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: "80px",
          backgroundColor: "#000",
          color: "#fff",
          padding: "0.5rem",
        }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              {data?.name}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit">
                <CgMenu />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{ display: { xs: "block", md: "none" } }}></Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              {data?.name}
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={`http://localhost:3000/${data?.image}`}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <IconButton
                      sx={{
                        textAlign: "center",
                        ":hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                      onClick={() => handleNavigateButton(setting)}>
                      {setting}
                    </IconButton>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AddPost open={open} onClose={handleColse} />
    </>
  );
}

export default NavCom