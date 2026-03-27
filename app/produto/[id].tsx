import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartContext } from "../../context/CartContext";

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams();
  const { produtos, addToCart } = useContext(CartContext);

  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'orange' }}>Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>R$ {produto.preco}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => addToCart(produto)}
        >
          <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "purple",
    padding: 40,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  nome: { color: "orange", fontSize: 28, fontWeight: "bold" },
  preco: { color: "orange", fontSize: 22, marginVertical: 15 },
  button: {
    backgroundColor: "lightgreen",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
});