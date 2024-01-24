import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Butt from "@/components/Butt";
import Input from "@/components/Input";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const { signIn, setActive } = useSignIn();
  const { control, handleSubmit } = useForm({
    defaultValues: { studentId: "", password: "" },
  });

  const allowOnlyNumber = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const onSubmit = async ({
    studentId,
    password,
  }: { studentId: string; password: string }) => {
    setLoading(true);

    try {
      const completeSignIn = await signIn!.create({
        identifier: `S${studentId}`,
        password,
      });

      await setActive!({ session: completeSignIn.createdSessionId });
      while (router.canGoBack()) {
        router.back();
      }
      router.replace("/");
    } catch (err: any) {
      if (err.clerkError) {
        console.log(err.errors);

        for (const e of err.errors) {
          alert(e.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{ marginBottom: insets.bottom }}
      className="bg-white dark:bg-black flex-1 p-5"
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
      <Butt title="Login" onPress={handleSubmit(onSubmit)} loading={loading} />
    </View>
  );
}
