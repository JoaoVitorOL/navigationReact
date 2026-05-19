import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import {
  ActivityIndicator,
  Text,
  Card,
  Title,
  Paragraph,
  Chip,
  Searchbar,
  Snackbar,
  Surface,
  Button,
} from "react-native-paper";

const API_KEY = "1cd66749";

export default function MoviesScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("batman");
  const [inputQuery, setInputQuery] = useState("batman");
  const [error, setError] = useState(null);
  const [snackVisible, setSnackVisible] = useState(false);

  const getMovies = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`
      );
      const json = await response.json();

      if (json.Response === "True") {
        setData(json.Search);
      } else {
        setData([]);
        setError(json.Error || "Nenhum filme encontrado.");
        setSnackVisible(true);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar filmes. Verifique sua conexão.");
      setSnackVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    if (inputQuery.trim()) {
      setSearchQuery(inputQuery.trim());
    }
  };

  const renderMovie = ({ item }) => (
    <Card
      style={styles.movieCard}
      onPress={() => navigation.navigate("MovieDetail", { imdbID: item.imdbID, title: item.Title })}
    >
      <View style={styles.movieRow}>
        {item.Poster !== "N/A" ? (
          <Card.Cover
            source={{ uri: item.Poster }}
            style={styles.poster}
          />
        ) : (
          <View style={styles.noPoster}>
            <Text style={styles.noPosterText}>🎬</Text>
          </View>
        )}
        <View style={styles.movieInfo}>
          <Title numberOfLines={2} style={styles.movieTitle}>
            {item.Title}
          </Title>
          <View style={styles.chips}>
            <Chip icon="calendar" compact style={styles.chip}>
              {item.Year}
            </Chip>
            <Chip icon="movie" compact style={styles.chip}>
              {item.Type}
            </Chip>
          </View>
          <Paragraph style={styles.imdbId}>ID: {item.imdbID}</Paragraph>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <Surface style={styles.searchSurface} elevation={2}>
        <Searchbar
          placeholder="Buscar filmes..."
          onChangeText={setInputQuery}
          value={inputQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
        />
        <Button
          mode="contained"
          onPress={handleSearch}
          style={styles.searchButton}
          icon="magnify"
        >
          Buscar
        </Button>
      </Surface>

      {/* Contador de resultados */}
      {!isLoading && data.length > 0 && (
        <Text style={styles.resultCount}>
          {data.length} resultado(s) para "{searchQuery}"
        </Text>
      )}

      {/* Loading */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" color="#1a6fa8" />
          <Text style={styles.loadingText}>Buscando filmes...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderMovie}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>😕 Nenhum filme encontrado</Text>
            </View>
          }
        />
      )}

      {/* Snackbar de erro */}
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchSurface: {
    backgroundColor: "#fff",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchBar: {
    flex: 1,
    elevation: 0,
    backgroundColor: "#f0f0f0",
  },
  searchButton: {
    borderRadius: 8,
  },
  resultCount: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#666",
    fontSize: 13,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#666",
    fontSize: 16,
  },
  list: {
    padding: 12,
    gap: 10,
    paddingBottom: 24,
  },
  movieCard: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
  },
  movieRow: {
    flexDirection: "row",
    padding: 10,
    gap: 12,
  },
  poster: {
    width: 80,
    height: 110,
    borderRadius: 8,
  },
  noPoster: {
    width: 80,
    height: 110,
    backgroundColor: "#ddd",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  noPosterText: {
    fontSize: 32,
  },
  movieInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  movieTitle: {
    fontSize: 15,
    lineHeight: 20,
    color: "#222",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  chip: {
    height: 26,
  },
  imdbId: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  snackbar: {
    backgroundColor: "#c0392b",
  },
});
