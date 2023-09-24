import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice.js";
import Upload from "./Upload.jsx";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  position: relative;
`;

const SignOut = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 46px;
  left: 15px;
`;

const Avatar = styled.img`
  width: 32px;
  height 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;

const Navbar = () => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const handleClick = () => {
    setDropDownMenu(!dropDownMenu);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  return (
    <>
      {open && <Upload setOpen={setOpen} />}
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={() => navigate(`/search?q=${input}`)}
            />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
              />
              <Avatar src={currentUser.img} onClick={handleClick} />
              {currentUser.name}
              {dropDownMenu && (
                <SignOut>
                  <Button onClick={handleLogout}>Signout</Button>
                </SignOut>
              )}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Navbar;
