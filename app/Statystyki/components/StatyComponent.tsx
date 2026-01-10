import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { StatyProps } from "./ComponentTypes";

export default function StatyComponent({ navigation, route }: StatyProps) {
  const barData = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];
  return (
    <View className="w-[100vw] h-[100vh] bg-[#faf4e8]">
      <View className="bg-[#faf4e8] w-[90vw] h-[80vh] mx-auto mt-8 shadow-xl rounded-xl">
        <View className="kolumna-ogólne">
          <BarChart data={barData} />
        </View>
        <View className="poszczególne-fiszki"></View>
      </View>
    </View>
  );
}
