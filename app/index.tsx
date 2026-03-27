import { useRouter } from "expo-router";
import { useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartContext } from "../context/CartContext";

export default function Home() {
  const router = useRouter();
  const { carrinho, total, produtos } = useContext(CartContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/produto/${item.id}`)}
          >
            <Text style={styles.textNome}>{item.nome}</Text>
            <Text style={styles.textPreco}>R$ {item.preco}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Footer Carrinho */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Carrinho:</Text>
        {carrinho.map((item) => (
          <Text key={item.id} style={styles.footerText}>
            {item.nome} x{item.quantidade} - R$ {item.preco * item.quantidade}
          </Text>
        ))}
        <Text style={styles.footerTotal}>Total: R$ {total}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  listContent: { padding: 20, paddingBottom: 150 }, // Espaço para não cobrir o footer
  card: {
    backgroundColor: "purple",
    padding: 30,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  textNome: { color: "orange", fontSize: 22, fontWeight: "bold" },
  textPreco: { color: "orange", fontSize: 18 },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "green",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  footerTitle: { color: "white", fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  footerText: { color: "white", fontSize: 14 },
  footerTotal: { color: "white", fontSize: 18, fontWeight: "bold", marginTop: 10 },
});