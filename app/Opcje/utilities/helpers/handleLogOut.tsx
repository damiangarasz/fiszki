import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
export async function handleLogOut() {
  try {
    await GoogleSignin.signOut();
    await signOut(getAuth());
  } catch (error) {
    console.error("Błąd podczas wylogowywania:", error);
  }
}
