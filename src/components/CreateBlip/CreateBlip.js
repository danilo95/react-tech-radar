import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
const CreateBlip = ({ quadrant, rings, id, blips }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateNewBlip = async (data) => {
    const newData = { ...data, isNew: true };
    const taskDocRef = doc(db, "radar", id);
    try {
      await updateDoc(taskDocRef, {
        blips: [...blips, newData],
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Create Blip</h1>
      <form onSubmit={handleSubmit(handleCreateNewBlip)}>
        <input {...register("name", { required: true })} placeholder="name" />
        {errors.name && <span>This field is required</span>}
        <input {...register("description")} placeholder="description" />
        <select {...register("quadrant", { required: true })}>
          {quadrant.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.quadrant && <span>This field is required</span>}
        <select {...register("ring", { required: true })}>
          {rings.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.ring && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateBlip;
