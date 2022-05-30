import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Terapeuta from "./pages/Terapeuta";
import SignUp from './pages/Signup';
import Perfil from './pages/Perfil';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/perfil" element={<Perfil/>}></Route>
          <Route path="/terapeuta/:terapeutaId" element={<Terapeuta/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
