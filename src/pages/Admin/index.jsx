import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Menu } from "../../components/Menu";
import { auth } from "../../services/firebaseConfig";

export function Admin() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("Uid: ", uid);
      } else {
        console.log("User is logged out");
      }
    });
  }, []);

  return (
    <>
      <h1>Admin</h1>
      <Menu />
    </>
  );
}
