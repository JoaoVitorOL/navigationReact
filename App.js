import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import MoviesScreen from "./screens/MoviesScreen";
import MovieDetailScreen from "./screens/MovieDetailScreen";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1a6fa8",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#1a6fa8" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Soluções Mobile 🎬" }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Detalhes" }} />
          <Stack.Screen name="Movies" component={MoviesScreen} options={{ title: "Lista de Filmes" }} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: "Detalhes do Filme" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}