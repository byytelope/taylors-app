import { TextInput, View } from "react-native";
import Words from "./Words";

interface InputProps extends React.ComponentPropsWithRef<typeof TextInput> {
  label: string;
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <View className="gap-2">
      <Words className="text-zinc-500 dark:text-zinc-400 pl-1">{label}</Words>
      <TextInput
        {...props}
        className="px-5 h-14 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white rounded-lg"
      />
    </View>
  );
}
