import { Text } from "react-native";

export default function Words(props: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      className={`text-black dark:text-white ${props.className}`}
    />
  );
}
