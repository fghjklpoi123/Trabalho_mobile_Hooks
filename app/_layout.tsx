import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";

export default function Layout() {
  return (
    <CartProvider>
      <Stack screenOptions={{
        headerStyle: { backgroundColor: "red" },
        headerTintColor: 'blue',
      }}>
        <Stack.Screen
          name="produto/[id]"
          options={{ title: "Produto" }}
        />
      </Stack>
    </CartProvider>
  );
}