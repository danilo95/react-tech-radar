import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import Radar from "./components/Radar/Radar";
import Loading from "./components/Loading/Loading";
import CreateBlip from "./components/CreateBlip/CreateBlip";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const App = () => {
  const [setup, setSetup] = useState({ rings: [], quadrants: [], blips: [] });
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "radar"));
    onSnapshot(q, (querySnapshot) => {
      setSetup(querySnapshot.docs[0].data());
      setId(querySnapshot.docs[0].id);
      setLoading(false);
    });
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="App">
      <button onClick={toggleDrawer}>display</button>
      <div className="App">{loading ? <Loading /> : <Radar {...setup} />}</div>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="bottom">
        <CreateBlip
          quadrant={setup.quadrants}
          rings={setup.rings}
          id={id}
          blips={setup.blips}
        />
      </Drawer>
    </div>
  );
};

export default App;
