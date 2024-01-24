import { ActivityIndicator, Pressable, useColorScheme } from "react-native";

import Words from "./Words";
import { darkTheme, lightTheme } from "@/utils/myTheme";

interface ButtProps
  extends Omit<React.ComponentPropsWithRef<typeof Pressable>, "children"> {
  title: string;
  loading?: boolean;
}

export default function Butt({ title, loading = false, ...props }: ButtProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      disabled={loading}
      {...props}
      className={`px-5 items-center justify-center h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 active:bg-zinc-200 dark:active:bg-zinc-800 ${props.className}`}
    >
      {loading ? (
        <ActivityIndicator
          color={
            colorScheme === "light"
              ? lightTheme.colors.text
              : darkTheme.colors.text
          }
        />
      ) : (
        <Words className="font-semibold text-lg">{title}</Words>
      )}
    </Pressable>
  );
}
