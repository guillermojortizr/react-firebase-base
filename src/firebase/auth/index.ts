import { getAuth } from "firebase/auth";
import { firebaseApp } from "../app";

const auth = getAuth(firebaseApp);
auth?.useDeviceLanguage();
export { auth };
