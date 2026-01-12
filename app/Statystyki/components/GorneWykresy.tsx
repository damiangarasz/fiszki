import { useState } from "react";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { BarChart, LineChart } from "react-native-gifted-charts";
import useStatystyki from "../hooks/useStatystyki.tsx";

export default function GorneWykresy() {
  const { lastSevenDays, bestDayOfTheWeek, month } = useStatystyki();
  const { width } = useWindowDimensions();
  const [chartTydzien, setChertTydzien] = useState(true);
  const [chartNajlepszyDzien, setChartNajlepszyDzien] = useState(false);
  const [chartMiesiac, setChartMiesiac] = useState(false);

  const szerokoscChartu = width * 0.5;
  const szerkokoscSlota = szerokoscChartu / 7;
  const szorkokoscDniaWmc = szerokoscChartu / 30;
  const szerokoscSlupka = szerkokoscSlota * 0.7;
  const szerokoscOdstepu = szerkokoscSlota * 0.3;
  return (
    <View className="kolumna-ogólne w-[100%] flex-row h-[30vh]">
      <View className="w-[60%]">
        {chartTydzien ? (
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
        ) : (
          <></>
        )}{" "}
        {chartNajlepszyDzien ? (
          <BarChart
            width={szerokoscChartu}
            barWidth={szerokoscSlupka}
            spacing={szerokoscOdstepu}
            initialSpacing={0}
            data={bestDayOfTheWeek}
            barBorderRadius={4}
            hideRules
            frontColor={"#9b6b46"}
            yAxisColor={"#9b6b46"}
            xAxisColor={"#9b6b46"}
            yAxisTextStyle={{ color: "#9b6b46" }}
            xAxisLabelTextStyle={{ color: "#9b6b46" }}
          />
        ) : (
          <></>
        )}
        {chartMiesiac ? (
          <LineChart
            data={month}
            spacing={szorkokoscDniaWmc}
            hideDataPoints
            hideRules
            hideYAxisText
            showVerticalLines
          />
        ) : (
          <></>
        )}
      </View>
      <View className="w-[40%] h-[100%]">
        <Pressable
          onPress={() => {
            setChertTydzien(true);
            setChartNajlepszyDzien(false);
            setChartMiesiac(false);
          }}
          className="bg-[#9b6b46] h-[33%] border-b border-[#faf4e8]"
        >
          <Text className="text-white m-auto">Ostatni tydzień</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setChertTydzien(false);
            setChartNajlepszyDzien(true);
            setChartMiesiac(false);
          }}
          className="bg-[#9b6b46] h-[33%] border-b border-[#faf4e8]"
        >
          <Text className="text-white m-auto">Najaktywniejsze dni</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setChertTydzien(false);
            setChartNajlepszyDzien(false);
            setChartMiesiac(true);
          }}
          className="bg-[#9b6b46] h-[33%]"
        >
          <Text className="text-white m-auto">Ostatni miesiąc</Text>
        </Pressable>
      </View>
    </View>
  );
}
