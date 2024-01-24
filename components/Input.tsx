import { TextInput } from "react-native";

export default function Input(
  props: React.ComponentPropsWithRef<typeof TextInput>,
) {
  return (
    <TextInput
      {...props}
      className="px-5 h-14 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white rounded-lg"
    />
  );
}
