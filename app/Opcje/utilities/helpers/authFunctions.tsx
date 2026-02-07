import auth from "@react-native-firebase/auth";

// Funkcja rejestracji
export const signUpWithEmail = async (email: string, pass: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, pass);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    let friendlyError = "Wystąpił błąd rejestracji.";

    // Tłumaczenie błędów Firebase na ludzki język
    if (error.code === "auth/email-already-in-use") friendlyError = "Ten e-mail jest już zajęty!";
    if (error.code === "auth/invalid-email") friendlyError = "Niepoprawny format e-maila.";
    if (error.code === "auth/weak-password") friendlyError = "Hasło jest za słabe (min. 6 znaków).";

    return { user: null, error: friendlyError };
  }
};

// Funkcja logowania
export const signInWithEmail = async (email: string, pass: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, pass);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    let friendlyError = "Błąd logowania.";

    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      friendlyError = "Błędny e-mail lub hasło.";
    }
    if (error.code === "auth/invalid-email") friendlyError = "Niepoprawny format e-maila.";
    if (error.code === "auth/too-many-requests") friendlyError = "Za dużo prób. Spróbuj później.";

    return { user: null, error: friendlyError };
  }
};

// Funkcja wylogowania
export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error(error);
  }
};
