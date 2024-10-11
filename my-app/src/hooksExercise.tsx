import React, { useState, useEffect, useContext } from "react";
import { ThemeContext, themes } from "./themeContext";

export function ToggleTheme({ toggleTheme, theme }: { toggleTheme: () => void; theme: string }) {
  const handleClick = () => {
    toggleTheme();
    console.log(`Theme changed to: ${theme === "light" ? "dark" : "light"}`);
  };
  return (
    <button className="toggleThemeButton" onClick={handleClick}>
      Toggle Theme
    </button>
  );
}

export function ToggleFavorite({
  title,
  onToggleFavorite,
}: {
  title: string;
  onToggleFavorite: (title: string, isFavorited: boolean) => void;
}) {
  const [isFavorited, setFavorited] = useState(false);

  const handleClick = () => {
    const newFavoritedState = !isFavorited;
    setFavorited(newFavoritedState);
    onToggleFavorite(title, newFavoritedState);
    console.log(`${isFavorited ? "Removed from" : "Added to"} favorites: ${title}`);
  };
  return <button onClick={handleClick}>{isFavorited ? <span>❤️</span> : <span>🤍</span>}</button>;
}
