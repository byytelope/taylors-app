import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";

export const lightTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ed1c24",
    background: "#fff",
    card: "#fff",
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#ed1c24",
    background: "#000",
    card: "#000",
    border: "#3f3f46",
  },
};
