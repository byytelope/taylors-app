import { useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import Butt from "@/components/Butt";
import Input from "@/components/Input";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const { signIn, setActive } = useSignIn();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const onSubmit = async ({
    email,
    password,
  }: { email: string; password: string }) => {
    setLoading(true);

    try {
      const completeSignIn = await signIn!.create({
        identifier: email,
        password,
      });

      await setActive!({ session: completeSignIn.createdSessionId });
      while (router.canGoBack()) {
        router.back();
      }
      router.replace("/");
    } catch (err: any) {
      console.log(err.errors);
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white dark:bg-black flex-1 gap-4 p-5">
      <Controller
        control={control}
        name="email"
        rules={{}}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            autoCapitalize="none"
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{}}
        render={({ field: { onBlur, onChange, value } }) => (
          <Input
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Butt title="Login" onPress={handleSubmit(onSubmit)} loading={loading} />
    </View>
  );
}
