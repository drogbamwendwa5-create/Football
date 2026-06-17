import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || [],
  );

  const addFavorite = (team) => {
    const updated = [...favorites, team];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const removeFavorite = (teamId) => {
    const updated = favorites.filter((team) => team.id !== teamId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const isFavorite = (teamId) => {
    return favorites.some((team) => team.id === teamId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}