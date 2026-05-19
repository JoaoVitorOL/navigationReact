import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, Card, Title, Paragraph, Surface } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Surface style={styles.surface} elevation={4}>
        <Title style={styles.title}>Bem-vindo! 👋</Title>
        <Paragraph style={styles.subtitle}>
          App de filmes com React Navigation e REST API
        </Paragraph>
      </Surface>

      <Card style={styles.card}>
        <Card.Cover
          source={{ uri: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800" }}
          style={styles.cardCover}
        />
        <Card.Content style={styles.cardContent}>
          <Title>React Navigation</Title>
          <Paragraph>
            Navegação entre telas usando createNativeStackNavigator com
            transições nativas de alta performance.
          </Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Details")}
            icon="arrow-right"
          >
            Ver Detalhes
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Movies")}
            icon="movie-open"
          >
            Ver Filmes
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    gap: 16,
  },
  surface: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#1a6fa8",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#dce8f5",
    textAlign: "center",
    marginTop: 4,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  cardCover: {
    height: 180,
  },
  cardContent: {
    paddingTop: 12,
  },
  cardActions: {
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
});
