import { useAuth, useUser } from "@clerk/clerk-expo";
import { Button, ScrollView, View } from "react-native";

import Words from "@/components/Words";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="flex-1 bg-white dark:bg-black p-5">
        <Words>{user?.firstName ?? "NOT SIGNED IN!"}</Words>
        <Button title="Logout" onPress={async () => await signOut()} />
      </View>
    </ScrollView>
  );
}
