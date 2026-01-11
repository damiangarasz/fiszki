import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import useStatystyki from "../hooks/useStatystyki.tsx";
import { StatyProps } from "./ComponentTypes";

export default function StatyComponent({ navigation, route }: StatyProps) {
  const { lastSevenDays, bestDayOfTheWeek, month } = useStatystyki();
  const { width } = useWindowDimensions();

  const szerokoscChartu = width * 0.5;
  const szerkokoscSlota = szerokoscChartu / 7;
  const szerokoscSlupka = szerkokoscSlota * 0.7;
  const szerokoscOdstepu = szerkokoscSlota * 0.3;
  return (
    //TODO tutaj jestem
    <View className="w-[100vw] h-[100vh] bg-[#faf4e8]">
      <View className="bg-[#faf4e8] w-[90vw] h-[80vh] mx-auto mt-8 shadow-xl rounded-xl">
        <View className="kolumna-ogólne w-[100vw] flex-row h-[30vh]">
          <View className="w-[60vw]">
            <BarChart
              width={szerokoscChartu}
              barWidth={szerokoscSlupka}
              spacing={szerokoscOdstepu}
              initialSpacing={0}
              data={lastSevenDays}
              barBorderRadius={4}
              hideRules
              frontColor={"#9b6b46"}
              yAxisColor={"#9b6b46"}
              xAxisColor={"#9b6b46"}
              yAxisTextStyle={{ color: "#9b6b46" }}
              xAxisLabelTextStyle={{ color: "#9b6b46" }}
            />
          </View>
          <View className="w-[40vw]">
            <Pressable className="h-[33vh]">
              <Text>Ostatni tydzień</Text>
            </Pressable>
            <Pressable>
              <Text>Najaktywniejsze dni</Text>
            </Pressable>
            <Pressable>
              <Text>Ostatni miesiąc</Text>
            </Pressable>
          </View>
        </View>
        <View className="poszczególne-fiszki"></View>
      </View>
    </View>
  );
}
