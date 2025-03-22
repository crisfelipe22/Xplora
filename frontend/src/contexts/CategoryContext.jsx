/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerCategorias = async () => {
            setLoading(true)
            try {
                const response = await axios.get("/api/categoria");
                setCategorias(response.data); 
                
            } catch (error) {
                console.error("Error al obtener las categorías:", error);
                setError(error)
            } finally {
                setLoading(false);
            }
        };

        obtenerCategorias();
        
    }, []);

    const addCategoria = (nuevaCategoria) => {
        setCategorias((prevCategorias) => [...prevCategorias, nuevaCategoria]);
    };


    return (
        <CategoryContext.Provider value={{ categorias, loading, error, addCategoria }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);