import * as React from "react";
import { useNavigate } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuBookIcon from "@mui/icons-material/MenuBook"; // 도서 목록에 적합!
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"; // 도서 추가 느낌!
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"; // 유저 정보에 직관적!

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  // Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  // MobileMenu
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // 창 전체모드
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClick("/book")}>dddgdsg</MenuItem>
      <MenuItem onClick={() => handleMenuClick("/register")}>dpddd </MenuItem>
    </Menu>
  );

  // 창 축소모드
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleMenuClick("/book")}>
        <IconButton size="small" color="inherit">
          <MenuBookIcon />
        </IconButton>
        <p>도서 목록 </p>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick("/register")}>
        <IconButton size="small" color="inherit">
          <LibraryAddIcon />
        </IconButton>
        <p>도서 추가</p>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClick("/userinfo")}>
        <IconButton size="small" color="inherit">
          <ManageAccountsIcon />
        </IconButton>
        <p>사용자 정보</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#9cc3ba" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={() => handleMenuClick("/book")}
          >
            AIVLE LIBRARY
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="도서를 검색하세요.."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => handleMenuClick("/book")}
            >
              <Badge badgeContent={17} color="info">
                {" "}
                {/* 수정필요) 17 -> 도서 목록 개수로 */}
                <MenuBookIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => handleMenuClick("/register")}
            >
              <LibraryAddIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => handleMenuClick("/userinfo")}
              color="inherit"
            >
              <ManageAccountsIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
