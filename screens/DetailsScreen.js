import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  List,
  Surface,
} from "react-native-paper";

export default function DetailsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Surface style={styles.surface} elevation={2}>
        <Title style={styles.sectionTitle}>📚 Sobre este App</Title>
        <Paragraph style={styles.paragraph}>
          Este app demonstra o uso do <Text style={styles.bold}>React Navigation</Text>{" "}
          com o <Text style={styles.bold}>@react-navigation/native-stack</Text>{" "}
          e consumo de APIs REST usando o método nativo <Text style={styles.bold}>fetch</Text>.
        </Paragraph>
      </Surface>

      <Card style={styles.card}>
        <Card.Content>
          <Title>🛠️ Tecnologias Usadas</Title>
          <Divider style={styles.divider} />

          <List.Item
            title="React Navigation"
            description="Navegação entre telas (Stack Navigator)"
            left={(props) => (
              <List.Icon {...props} icon="navigation" color="#1a6fa8" />
            )}
          />
          <List.Item
            title="React Native Paper"
            description="Componentes Material Design"
            left={(props) => (
              <List.Icon {...props} icon="material-design" color="#1a6fa8" />
            )}
          />
          <List.Item
            title="Fetch API"
            description="Requisições HTTP / REST"
            left={(props) => (
              <List.Icon {...props} icon="cloud-download" color="#1a6fa8" />
            )}
          />
          <List.Item
            title="useState / useEffect"
            description="Gerenciamento de estado e ciclo de vida"
            left={(props) => (
              <List.Icon {...props} icon="code-tags" color="#1a6fa8" />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>🎬 API de Filmes</Title>
          <Paragraph>
            Utilizamos a API pública do OMDB (Open Movie Database) para listar
            filmes. A chave de API usada é de demonstração.
          </Paragraph>
          <Paragraph style={styles.apiUrl}>
            https://www.omdbapi.com/?s=batman&apikey=1cd66749
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Movies")}
            icon="movie-search"
          >
            Listar Filmes
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            icon="arrow-left"
          >
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  surface: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    color: "#1a6fa8",
    marginBottom: 8,
  },
  paragraph: {
    lineHeight: 22,
    color: "#444",
  },
  bold: {
    fontWeight: "bold",
    color: "#1a6fa8",
  },
  card: {
    borderRadius: 12,
  },
  divider: {
    marginVertical: 8,
  },
  apiUrl: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#666",
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
});
