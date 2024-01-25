import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View, KeyboardAvoidingView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

import Butt from "@/components/Butt";
import Input from "@/components/Input";
import { useSession } from "@/utils/context";
import { fetchStudentData } from "@/utils/fetch";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { mutate } = useMutation({
    mutationFn: fetchStudentData,
    mutationKey: ["studentData"],
  });
  const { signIn, isLoading } = useSession();
  const { control, handleSubmit } = useForm({
    defaultValues: { studentId: "", password: "" },
  });

  const allowOnlyNumber = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const onSubmit = ({
    studentId,
    password,
  }: { studentId: string; password: string }) => {
    mutate(studentId, {
      onSuccess: (data) => {
        if (!data) {
          return alert("Student ID not found");
        }

        console.log(`LOGGING IN: ${data.name}`);
        if (password === "wasdokok") {
          signIn(studentId);

          while (router.canGoBack()) {
            router.back();
          }
          router.replace("/");
        } else {
          alert("Wrong password");
        }
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={useHeaderHeight() + 40}
    >
      <View
        style={{ marginBottom: insets.bottom }}
        className="flex-1 justify-between p-5"
      >
        <View className="flex-1 w-full gap-4">
          <Controller
            control={control}
            name="studentId"
            rules={{ required: true }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                label="Student ID"
                placeholder="0XXXXXX"
                maxLength={7}
                autoCapitalize="none"
                keyboardType="number-pad"
                value={value}
                onChangeText={(text) => onChange(allowOnlyNumber(text))}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onBlur, onChange, value } }) => (
              <Input
                label="Password"
                placeholder="Enter password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        <Butt
          title="Login"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
