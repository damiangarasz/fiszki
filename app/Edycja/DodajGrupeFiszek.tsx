import { Pressable, Text, TextInput, View } from "react-native";

export default function DodajGrupeFiszek() {
  return (
    <View className="w-[75%] h-[75%] m-auto  shadow-xl">
      <Text className="m-auto">Nazwa lolas</Text>
      <TextInput className="shadow-xl h-10 w-[75%] m-auto" placeholder="Twoja nazwa" />
      <View className="flex-row space-around">
        <Pressable>
          <Text>Dodaj</Text>
        </Pressable>
        <Pressable>
          <Text>Anuluj</Text>
        </Pressable>
      </View>
    </View>
  );
}
