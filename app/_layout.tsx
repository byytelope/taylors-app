import { ClerkProvider } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen, Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { LogBox, Platform, Pressable, useColorScheme } from "react-native";

import "@/global.css";
import { darkTheme, lightTheme } from "@/utils/myTheme";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(["Reanimated"]);

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
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
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <ThemeProvider value={colorScheme === "dark" ? darkTheme : lightTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="login"
            options={{
              title: "Login",
              presentation: "modal",
              animation: "fade_from_bottom",
              headerLeft: () => (
                <Pressable
                  className="active:bg-zinc-200 dark:active:bg-zinc-800 size-10 justify-center items-center rounded-full mr-5"
                  onPress={() => router.back()}
                >
                  <Ionicons
                    name="close"
                    size={20}
                    color={colorScheme === "light" ? "black" : "grey"}
                  />
                </Pressable>
              ),
            }}
          />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ClerkProvider>
  );
}
