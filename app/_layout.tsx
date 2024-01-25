import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import { LogBox, Platform, Pressable, useColorScheme } from "react-native";

import "@/global.css";
import { SessionProvider } from "@/utils/context";
import { darkTheme, lightTheme } from "@/utils/myTheme";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(["Reanimated"]);

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    ...Ionicons.font,
  });

  if (Platform.OS === "android") {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff00");
  }

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider value={colorScheme === "dark" ? darkTheme : lightTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="login"
              options={{
                title: "Login",
                presentation: "modal",
                animation: "fade_from_bottom",
                headerShadowVisible: false,
                headerBackVisible: Platform.OS === "ios" ? false : true,
                headerRight:
                  Platform.OS === "ios"
                    ? () => (
                        <Pressable
                          className="bg-zinc-100 active:bg-zinc-200 dark:bg-zinc-900 dark:active:bg-zinc-800 size-8 justify-center items-center rounded-full"
                          onPress={() => router.back()}
                        >
                          <Ionicons
                            name="close"
                            size={16}
                            color={colorScheme === "light" ? "black" : "grey"}
                          />
                        </Pressable>
                      )
                    : undefined,
              }}
            />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
