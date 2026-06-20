import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  //[A] for adding a new cabin by useMutation (by custom hook)
  const { createCabinMutation, isLoading } = useCreateCabin();

  // [B] For Editing (by Custom hook)
  const { editCabinMutation, isEditing } = useEditCabin();

  // function handle the submit and from handleSubmit passes to it the data
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // for adding
    if (!isEditSession)
      createCabinMutation(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    // editing
    else
      editCabinMutation(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
  }
  // if theres error the handle submit will return that function
  // function onError(errors) {
  //   // console.log(errors);
  // }
  const isWorking = isLoading || isEditing;
  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Cabin Name" error={errors?.cabinName?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this field is required" })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "The Discount must be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          {...register("description", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "edit the cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
