import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { View, useColorScheme } from "react-native";

import Butt from "@/components/Butt";
import Words from "@/components/Words";
import LogoColor from "@/assets/taylors-logo-color.svg";
import LogoWhite from "@/assets/taylors-logo-white.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/(auth)");
    }
  }, [isLoaded]);

  return (
    <View
      style={{ marginTop: insets.top, marginBottom: insets.bottom }}
      className="flex-1 bg-white dark:bg-black items-center gap-4"
    >
      <View className="w-full items-center gap-4 flex-1 justify-center">
        {colorScheme === "dark" ? (
          <LogoWhite className="h-24 w-full" />
        ) : (
          <LogoColor className="h-24 w-full" />
        )}
      </View>
      <View className="w-full max-w-sm items-center gap-4 justify-center">
        <Words className="font-semibold text-2xl text-center">
          Welcome to Taylor&apos;s Mobile
        </Words>
        <Words className="text-zinc-500 dark:text-zinc-400 text-lg font-medium text-center">
          Login to view your timetables, module info, and more.
        </Words>
      </View>
      <View className="w-full p-5 gap-4">
        <Butt
          title="Login"
          onPress={() => router.push("/login")}
          loading={!isLoaded}
        />
        <Butt
          title="Go to website"
          onPress={async () =>
            WebBrowser.openBrowserAsync("https://taylors.edu.my", {
              presentationStyle: WebBrowser.WebBrowserPresentationStyle.POPOVER,
            })
          }
        />
      </View>
    </View>
  );
}