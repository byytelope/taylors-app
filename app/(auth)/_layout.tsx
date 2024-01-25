import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

import Words from "@/components/Words";
import { useSession } from "@/utils/context";

export default function AuthLayout() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <Words>LOADING</Words>
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
}
