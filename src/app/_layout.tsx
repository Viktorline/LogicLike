import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Курсы" }} />
      <Stack.Screen name="topicSelector" options={{ title: "Выбор темы" }} />
    </Stack>
  );
}
