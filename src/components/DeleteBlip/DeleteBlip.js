import React from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRadar } from "../../context/RadarContext";
import { types } from "../../context/Types";

const DeleteBlip = ({ id, blips }) => {
  const {
    state: { selectedItem },
    dispatch,
  } = useRadar();

  const handleDeletewBlip = async () => {
    const newData = blips.filter((value) => value.name !== selectedItem);
    const taskDocRef = doc(db, "radar", id);
    try {
      await updateDoc(taskDocRef, {
        blips: newData,
      });
      dispatch({ type: types.SET_SELECTED_ITEM, payload: null });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      {selectedItem && (
        <button onClick={handleDeletewBlip}>{`Delete ${selectedItem}`}</button>
      )}
    </div>
  );
};

export default DeleteBlip;
