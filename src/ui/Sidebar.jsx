import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";

const StyledSidebar = styled.aside`
  background-color: red;
  padding: 3.2rem 3rem;
  border-right: 1px solid green;
  grid-row: 1/-1;
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  gap: 3.3rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
