import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  View,
  useColorScheme,
} from "react-native";

import Words from "@/components/Words";
import { useSession } from "@/utils/context";
import { fetchStudentData } from "@/utils/fetch";
import { darkTheme, lightTheme } from "@/utils/myTheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { session: studentId, signOut } = useSession();
  const { data: studentData, isLoading } = useQuery({
    queryKey: ["studentData", studentId],
    queryFn: async () => await fetchStudentData(studentId ?? ""),
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator
          color={
            colorScheme === "light"
              ? lightTheme.colors.text
              : darkTheme.colors.text
          }
        />
      </View>
    );
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="flex-1 bg-white dark:bg-black p-5 gap-4">
        <View>
          <Words className="text-lg font-semibold">Name</Words>
          <Words>{studentData!.name}</Words>
        </View>
        <View>
          <Words className="text-lg font-semibold">Student ID</Words>
          <Words>{studentData!.cmsStudentId}</Words>
        </View>
        <View>
          <Words className="text-lg font-semibold">Semester / Intake</Words>
          <Words>
            {studentData!.semester} {studentData!.intake}
          </Words>
        </View>
        <View>
          <Words className="text-lg font-semibold">Modules</Words>
          {studentData!.modules.length !== 0 &&
            studentData!.modules.map((module) => (
              <Words key={module.id}>{module.name}</Words>
            ))}
        </View>
        <Button title="Logout" onPress={signOut} />
      </View>
    </ScrollView>
  );
}
