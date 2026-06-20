import Button from "../../ui/Button";
import useCheckOut from "../check-in-out/useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkoutMutation, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkoutMutation(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
