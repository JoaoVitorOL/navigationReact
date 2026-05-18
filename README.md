# 🎬 MovieApp — Soluções Mobile UNISATC

App de lista de filmes desenvolvido com **React Native + Expo**, demonstrando:

- ✅ Navegação entre telas com **React Navigation** (Native Stack)
- ✅ Consumo de **API REST** (OMDB API)
- ✅ Componentes **React Native Paper** (Material Design)
- ✅ Gerenciamento de estado com **useState** e **useEffect**

---

## 🏗️ Estrutura do Projeto

```
MovieApp/
├── App.js                        # Raiz: NavigationContainer + Stack.Navigator
├── app.json                      # Configuração Expo
├── babel.config.js
├── package.json
└── screens/
    ├── HomeScreen.js             # Tela inicial
    ├── DetailsScreen.js          # Tela de detalhes da aula
    ├── MoviesScreen.js           # Lista de filmes via API REST
    └── MovieDetailScreen.js      # Detalhes completos do filme
```

---

## 🚀 Instalação e Execução

### 1. Criar e abrir o projeto (do zero)

```bash
npx create-expo-app MovieApp --template blank
cd MovieApp
```

### 2. Instalar o React Navigation

```bash
npm install @react-navigation/native
```

### 3. Instalar dependências nativas (Expo)

```bash
npx expo install react-native-screens react-native-safe-area-context
```

### 4. Instalar o Native Stack Navigator

```bash
npm install @react-navigation/native-stack
```

### 5. Instalar React Native Paper

```bash
npm install react-native-paper
```

### 6. Iniciar o projeto

```bash
npx expo start
```

---

## 📱 Telas do App

| Tela | Descrição |
|------|-----------|
| **HomeScreen** | Tela inicial com card de boas-vindas e botões de navegação |
| **DetailsScreen** | Lista as tecnologias utilizadas e navega para filmes |
| **MoviesScreen** | Busca filmes via API OMDB (fetch + useState + useEffect + FlatList) |
| **MovieDetailScreen** | Detalhes completos: sinopse, elenco, rating, gêneros |

---

## 🔑 Conceitos Demonstrados

### React Navigation — Stack

```js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Navegação entre telas

```js
// Navegar para outra tela
navigation.navigate("Movies");

// Passar parâmetros
navigation.navigate("MovieDetail", { imdbID: "tt0372784", title: "Batman Begins" });

// Voltar
navigation.goBack();
```

### Consumo de API REST

```js
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);

const getMovies = async () => {
  try {
    const response = await fetch(
      "https://www.omdbapi.com/?s=batman&apikey=1cd66749"
    );
    const json = await response.json();
    setData(json.Search);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getMovies();
}, []);
```

### React Native Paper

```js
import { PaperProvider } from "react-native-paper";

// Envolver o app inteiro:
<PaperProvider>
  <NavigationContainer>...</NavigationContainer>
</PaperProvider>
```

Componentes utilizados: `Card`, `Button`, `ActivityIndicator`, `Searchbar`,
`Chip`, `Surface`, `Snackbar`, `List.Item`, `Divider`, `Title`, `Paragraph`.

---

## 🌐 API Utilizada

**OMDB API** — Open Movie Database  
🔗 https://www.omdbapi.com/

- Busca por título: `?s=batman&apikey=1cd66749`
- Detalhes por ID: `?i=tt0372784&plot=full&apikey=1cd66749`

---

## 📦 Dependências

```json
"@react-navigation/native": "^6.x",
"@react-navigation/native-stack": "^6.x",
"react-native-screens": "~3.x",
"react-native-safe-area-context": "^4.x",
"react-native-paper": "^5.x"
```

---

> Desenvolvido para a disciplina de **Soluções Mobile — UNISATC**  
> Professor: Thyerri Mezzari
