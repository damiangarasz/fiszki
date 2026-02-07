import React, { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native";
import { signInWithEmail, signUpWithEmail } from "../../utilities/helpers/authFunctions.tsx";

export default function EmailAuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuthAction = async () => {
    if (!email || !password) {
      Alert.alert("Błąd", "Wypełnij wszystkie pola.");
      return;
    }

    setLoading(true);

    const result = isLoginMode
      ? await signInWithEmail(email, password)
      : await signUpWithEmail(email, password);

    setLoading(false);

    if (result.error) {
      Alert.alert("Uwaga", result.error);
    } else {
      console.log("Sukces! Zalogowano:", result.user?.email);
    }
  };

  return (
    <View className="w-full p-4 border-b border-bg-primary border-dotted">
      <Text className="text-2xl font-bold text-center mb-6 text-gray-800">
        {isLoginMode ? "Zaloguj się" : "Utwórz konto"}
      </Text>

      <TextInput
        className="w-full bg-white border border-gray-300 rounded-lg p-3 mb-4 text-lg"
        placeholder="Adres e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        className="w-full bg-white border border-gray-300 rounded-lg p-3 mb-6 text-lg"
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        className={`w-full p-4 rounded-lg items-center ${loading ? "bg-gray-400" : "bg-bg-primary"}`}
        onPress={handleAuthAction}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-bold">
            {isLoginMode ? "Zaloguj się" : "Zarejestruj się"}
          </Text>
        )}
      </Pressable>

      <Pressable className="mt-6 p-2" onPress={() => setIsLoginMode(!isLoginMode)}>
        <Text className="text-center text-text-primary">
          {isLoginMode ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
        </Text>
      </Pressable>
    </View>
  );
}
