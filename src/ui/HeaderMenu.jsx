import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import { FaUser } from "react-icons/fa";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeader = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <li>
        <Logout />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <FaUser />{" "}
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
    </StyledHeader>
  );
}

export default HeaderMenu;
