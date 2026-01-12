import { View } from "react-native";
import { StatyProps } from "./ComponentTypes";
import GorneWykresy from "./GorneWykresy";

export default function StatyComponent({ navigation, route }: StatyProps) {
  return (
    <View className="w-[100vw] h-[100vh] bg-[#faf4e8]">
      <View className="bg-[#faf4e8] w-[90vw] h-[80vh] mx-auto mt-8 shadow-xl rounded-xl">
        <GorneWykresy />
        <View className="poszczególne-fiszki"></View>
      </View>
    </View>
  );
}
