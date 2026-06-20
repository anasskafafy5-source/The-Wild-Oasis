import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  padding: 1.2rem 2rem;
  background-color: #1d8ed5;
  background-color: var(--color-grey-0);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.5rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
