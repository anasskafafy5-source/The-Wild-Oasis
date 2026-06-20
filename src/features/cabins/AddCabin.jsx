import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

//[v2] compound component pattern
function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabins-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabins-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

//[v1] before the compound component pattern
// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         {isOpenModal ? "Close Cabin Adding" : "Add Cabin"}
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm  onCloseModal={() => setIsOpenModal(false)}/>
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
