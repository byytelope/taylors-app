import { ActivityIndicator, Pressable } from "react-native";

import Words from "./Words";

interface ButtProps
  extends Omit<React.ComponentPropsWithRef<typeof Pressable>, "children"> {
  title: string;
  loading?: boolean;
}

export default function Butt({ title, loading = false, ...props }: ButtProps) {
  return (
    <Pressable
      {...props}
      className={`px-5 items-center justify-center h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 active:bg-zinc-200 dark:active:bg-zinc-800 ${props.className}`}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Words className="font-semibold text-lg">{title}</Words>
      )}
    </Pressable>
  );
}
