import { useState, useEffect } from "react";

const usePaginacionDinamica = (filaHeight = 5, minFilas = 1) => {
    const [columnPorPag, setColumnPorPag] = useState(minFilas);

    useEffect(() => {
        const calcularFilasVisibles = () => {
            const contenido = document.querySelector(".tableContainer");
            const viewportHeight = window.innerHeight; // Altura de la pantalla
            const contenidoHeight = contenido?.clientHeight || viewportHeight * 0.7; // Altura del contenedor o 70% de la pantalla
            
            const filasCalculadas = Math.floor(contenidoHeight / filaHeight);

            setColumnPorPag(filasCalculadas > minFilas ? filasCalculadas : minFilas);
        };

        calcularFilasVisibles();
        window.addEventListener("resize", calcularFilasVisibles);

        return () => window.removeEventListener("resize", calcularFilasVisibles);
    }, [filaHeight, minFilas]);

    return { columnPorPag, setColumnPorPag };
};

export default usePaginacionDinamica;
