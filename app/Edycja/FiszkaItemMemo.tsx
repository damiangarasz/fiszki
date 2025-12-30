import { memo } from "react";
import { Pressable, Text, View } from "react-native";

type props = {
  id: string;
  polski: string;
  angielski: string;
  kontekst: string;
  handleEdit: (polski: string, angielski: string, kontekst: string, id: string) => void;
};

const FiszkaItem = memo(function FiszkaItemComponent({
  id,
  polski,
  angielski,
  kontekst,
  handleEdit,
}: props) {
  console.log("render");

  return (
    <View className="border-b border-gray-400 border-dotted">
      <Pressable
        onPress={() => {
          handleEdit(polski, angielski, kontekst, id);
        }}
        className="flex flex-row justify-around h-8"
      >
        <Text className="w-[50%] text-center m-auto">{polski}</Text>
        <Text className="w-[50%] text-center m-auto">{angielski}</Text>
      </Pressable>

      <Pressable>
        <Text className="text-center">{kontekst}</Text>
      </Pressable>
    </View>
  );
});

export default FiszkaItem;
