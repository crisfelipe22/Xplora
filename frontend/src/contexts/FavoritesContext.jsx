import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { useAuth } from '../contexts/AuthContext';

const FavoritesContext = createContext();

// Cargar favoritos desde localStorage
const loadFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
    return [];
  }
};

// Reducer para manejar el estado de favoritos
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.payload];
    case "REMOVE_FAVORITE":
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};

export const FavoritesProvider = ({ children, productos }) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, loadFavorites());
  const [productosDisponibles, setProductosDisponibles] = useState(productos || []);

  // 🔍 Verifica que `productos` está llegando al contexto
  console.log("📢 `productos` recibido en FavoritesProvider:", productos);

  useEffect(() => {
    if (productos && productos.length > 0) {
      console.log("✅ Productos actualizados en FavoritesContext:", productos);
      setProductosDisponibles(productos);
    } else {
      console.warn("⚠️ `productos` está vacío o no definido en FavoritesContext.");
    }
  }, [productos]);
  

  // Guardar en localStorage cuando cambian los favoritos
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Función para obtener productos favoritos
  const getFavoriteProducts = () => {
    console.log("🔎 Filtrando productos favoritos...", {
        productosDisponibles,
        favorites,
      });
    return productosDisponibles.filter((producto) =>
      favorites.includes(Number(producto.id_paquete_experiencia))
    );
  };

  const addFavorite = (productId) => {
    dispatch({ type: "ADD_FAVORITE", payload: productId });
  };

  const removeFavorite = (productId) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: productId });
  };

  const toggleFavorite = (productId) => {
    
    if (favorites.includes(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite, getFavoriteProducts }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizado
export const useFavorites = () => {
  return useContext(FavoritesContext);
};
