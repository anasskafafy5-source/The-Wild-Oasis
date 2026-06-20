import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
`;

const MainStyled = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;
const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <MainStyled>
        <Container>
          <Outlet />
        </Container>
      </MainStyled>
    </StyledAppLayout>
  );
}

export default AppLayout;
