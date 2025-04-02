import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();
// Reducer para manejar el estado de favoritos
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.payload];
    case "REMOVE_FAVORITE":
      return state.filter((id) => id !== action.payload);
    case "SET_FAVORITES":
      return action.payload; // Set the favorites directly
    case "CLEAR_FAVORITES": 
      return [];  
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const { user: usuario, setUser } = useAuth();
  const [favorites, dispatch] = useReducer(favoritesReducer, usuario?.favorites || []);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState();
  const [productosDisponibles, setProductosDisponibles] = useState(productos || []);
  const loadFavorites = async () => {
    if (usuario && !usuario.favorites) {
      try {
        const favoritesResponse = await axios.get(
          `/api/auth/${usuario.id}/favoritos`
        );
        const favoriteIds = favoritesResponse.data.map((fav) => fav.id_paquete_experiencia);
        usuario.favorites = favoriteIds;
        localStorage.setItem("user", JSON.stringify(usuario));
        setUser(usuario);
        return favoriteIds;
      } catch (error) {
        console.error("Error loading favorites:", error);
        return [];
      }
    }   
    return usuario?.favorites || [];
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritesData = await loadFavorites();
      dispatch({ type: "SET_FAVORITES", payload: favoritesData });
    };

    if (usuario) {
      fetchFavorites();
    }
  }, [usuario]);
  useEffect(() => {

    const obtenerDatos = async () => {
      try {
        const [productosResponse, categoriasResponse] = await Promise.all([
          axios.get("/api/paquete-experiencia"),
          axios.get("/api/categoria"),
        ]);

        setProductos(productosResponse.data);
        setCategorias(categoriasResponse.data);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
        if (error.response) {
          console.error(
            "Detalle del error:",
            error.response.status,
            error.response.data
          );
        }
      }
    };

    obtenerDatos();
  }, []);

  useEffect(() => {
    if (productos.length > 0) {
      setProductosDisponibles(productos);
    } else {
      // console.warn(
      //   "⚠️ `productos` está vacío o no definido en FavoritesContext."
      // );
    }
  }, [productos]);

  // Guardar en localStorage cuando cambian los favoritos
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(usuario));
  }, [favorites]);

  // Función para obtener productos favoritos
  const getFavoriteProducts = () => {
    return productosDisponibles.filter((producto) =>
      favorites.includes(Number(producto.id_paquete_experiencia))
    );
  };

  const addFavorite = async (productId) => {
    try {
      const response = await axios.post(
        `/api/auth/${usuario.id}/favoritos/${productId}` 
      );
      if (response.status === 201) {
        usuario.favorites.push(productId); // Add to user object
        setUser({ ...usuario, favorites: usuario.favorites }); // Update user state
        dispatch({ type: "ADD_FAVORITE", payload: productId });
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (productId) => {
    try {
      const response = await axios.delete(`/api/auth/${usuario.id}/favoritos/${productId}`);
      if (response.status === 200) {
        usuario.favorites = usuario.favorites.filter(id => id !== productId); // Remove from user object
        setUser({ ...usuario, favorites: usuario.favorites }); // Update user state
        dispatch({ type: "REMOVE_FAVORITE", payload: productId });
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  useEffect(() => {
    if (!usuario) {
      dispatch({ type: "CLEAR_FAVORITES" }); // Limpia los favoritos cuando el usuario es null
    }
  }, [usuario]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        productos,
        categorias,
        removeFavorite,
        toggleFavorite,
        getFavoriteProducts,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
