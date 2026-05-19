import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Text,
  Card,
  Title,
  Paragraph,
  Chip,
  Divider,
  Surface,
  Button,
  Badge,
} from "react-native-paper";

const API_KEY = "1cd66749";

export default function MovieDetailScreen({ route, navigation }) {
  const { imdbID, title } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const getMovieDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}`
      );
      const json = await response.json();

      if (json.Response === "True") {
        setMovie(json);
      } else {
        setError("Detalhes não encontrados.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar detalhes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#1a6fa8" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>😕 {error || "Erro desconhecido"}</Text>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{ marginTop: 16 }}
        >
          Voltar
        </Button>
      </View>
    );
  }

  const ratingValue = movie.imdbRating !== "N/A" ? parseFloat(movie.imdbRating) : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Poster + Título */}
      <Card style={styles.heroCard}>
        {movie.Poster !== "N/A" && (
          <Card.Cover source={{ uri: movie.Poster }} style={styles.poster} />
        )}
        <Card.Content style={styles.heroContent}>
          <Title style={styles.movieTitle}>{movie.Title}</Title>
          <View style={styles.metaRow}>
            <Chip icon="calendar" compact>{movie.Year}</Chip>
            <Chip icon="clock-outline" compact>{movie.Runtime}</Chip>
            <Chip icon="flag" compact>{movie.Rated}</Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Avaliação */}
      {ratingValue && (
        <Surface style={styles.ratingCard} elevation={2}>
          <View style={styles.ratingContent}>
            <Text style={styles.ratingLabel}>⭐ IMDb Rating</Text>
            <Text style={styles.ratingValue}>{movie.imdbRating} / 10</Text>
            <Text style={styles.ratingVotes}>{movie.imdbVotes} votos</Text>
          </View>
        </Surface>
      )}

      {/* Sinopse */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>📖 Sinopse</Title>
          <Divider style={styles.divider} />
          <Paragraph style={styles.plot}>{movie.Plot}</Paragraph>
        </Card.Content>
      </Card>

      {/* Gêneros */}
      {movie.Genre !== "N/A" && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>🎭 Gêneros</Title>
            <Divider style={styles.divider} />
            <View style={styles.chips}>
              {movie.Genre.split(", ").map((genre) => (
                <Chip
                  key={genre}
                  icon="tag"
                  style={styles.genreChip}
                  textStyle={styles.genreText}
                >
                  {genre}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Ficha Técnica */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>🎬 Ficha Técnica</Title>
          <Divider style={styles.divider} />
          <InfoRow label="Diretor" value={movie.Director} />
          <InfoRow label="Roteiro" value={movie.Writer} />
          <InfoRow label="Elenco" value={movie.Actors} />
          <InfoRow label="País" value={movie.Country} />
          <InfoRow label="Idioma" value={movie.Language} />
          <InfoRow label="Lançamento" value={movie.Released} />
          {movie.Awards !== "N/A" && (
            <InfoRow label="Prêmios" value={movie.Awards} />
          )}
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        icon="arrow-left"
      >
        Voltar para a lista
      </Button>
    </ScrollView>
  );
}

function InfoRow({ label, value }) {
  if (!value || value === "N/A") return null;
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}:</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 16,
    gap: 14,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    color: "#666",
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: "#c0392b",
  },
  heroCard: {
    borderRadius: 12,
    overflow: "hidden",
  },
  poster: {
    height: 300,
  },
  heroContent: {
    paddingTop: 12,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a2e",
    lineHeight: 26,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  ratingCard: {
    borderRadius: 12,
    backgroundColor: "#fff",
    padding: 16,
  },
  ratingContent: {
    alignItems: "center",
    gap: 4,
  },
  ratingLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
  },
  ratingValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e8b339",
  },
  ratingVotes: {
    fontSize: 12,
    color: "#aaa",
  },
  card: {
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#1a6fa8",
    marginBottom: 4,
  },
  divider: {
    marginBottom: 12,
  },
  plot: {
    lineHeight: 22,
    color: "#444",
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  genreChip: {
    backgroundColor: "#e3f0fa",
  },
  genreText: {
    color: "#1a6fa8",
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 8,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#555",
    width: 90,
    flexShrink: 0,
  },
  infoValue: {
    flex: 1,
    color: "#333",
    lineHeight: 20,
  },
  backButton: {
    marginTop: 8,
    borderRadius: 8,
  },
});
