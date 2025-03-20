import React, { useContext } from "react";
import {
  DirectionsBoat, // Kayak
  Landscape, // Montañas
  Waves, // Agua
  SafetyDivider, // Seguridad
  Timer, // Duración
  Groups, // Grupo
  LocalOffer, // Incluido
  Wc, // Sanitarios
  Restaurant, // Comida
  Hiking, // Trekking
  CameraAlt, // Fotografía
  NaturePeople, // Naturaleza
  WaterDrop, // Cascadas
  Terrain, // Terreno
  DarkMode, // Noche
  Brightness5, // Día
  Emergency, // Emergencia
  Flag, // Punto encuentro
  Map, // Mapa
  AcUnit, // Clima frío
  AccessTime, // Horarios
} from "@mui/icons-material";

const IconContext = React.createContext();

export const IconProvider = ({ children }) => {
  const icons = [
    { id: 1, component: DirectionsBoat },
    { id: 2, component: Landscape },
    { id: 3, component: Waves },
    { id: 4, component: SafetyDivider },
    { id: 5, component: Timer },
    { id: 6, component: Groups },
    { id: 7, component: LocalOffer },
    { id: 8, component: Wc },
    { id: 9, component: Restaurant },
    { id: 10, component: Hiking },
    { id: 11, component: CameraAlt },
    { id: 12, component: NaturePeople },
    { id: 13, component: WaterDrop },
    { id: 14, component: Terrain },
    { id: 15, component: DarkMode },
    { id: 16, component: Brightness5 },
    { id: 17, component: Emergency },
    { id: 18, component: Flag },
    { id: 19, component: Map },
    { id: 20, component: AcUnit },
    { id: 21, component: AccessTime },
  ];

  const getIconById = (id) => {
    const icon = icons.find((icon) => icon.id === id);
    return icon ? icon.component : null;
  };

  return (
    <IconContext.Provider value={{ icons, getIconById }}>
      {children}
    </IconContext.Provider>
  );
};

export const useIcons = () => useContext(IconContext);
