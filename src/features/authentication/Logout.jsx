import { CiLogout } from "react-icons/ci";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
function Logout() {
  const { logoutMutation, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={() => logoutMutation()}>
      {isLoading ? <SpinnerMini /> : <CiLogout />}
    </ButtonIcon>
  );
}

export default Logout;
