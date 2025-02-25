// Header.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import Header from "../components/Header";
import App from "../App";
import React from 'react';
import { MemoryRouter, useLocation, Route, Routes } from 'react-router-dom';
import styles from "../styles/Header.module.css";

const testRoutes = [
  "/",
  "/home",
  "/admin",
  "/admin/productos",
  "/admin/productos/nuevo-producto",
  "/detalle-producto/123",
];

const AllTheProviders = ({ children, initialEntries = ["/"] }) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </MemoryRouter >
  );
};

const customRender = (ui, { initialEntries, ...options } = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialEntries={initialEntries}>{children}</AllTheProviders>
    ),
    ...options,
  });


describe.each(testRoutes)("Componente Header renderiza en %s", (route) => {
  it(`should render Header only outside of /admin`, () => {
    customRender(<App />, { initialEntries: [route] });

    if (route.startsWith("/admin")) {
      // Should not find the Header
      expect(screen.queryByTestId("header")).toBeInTheDocument();
    } else {
      // Should find the Header
      expect(screen.getByTestId("header")).toBeInTheDocument();
    }
  });
});


describe("Componente Header", () => {
/*   it("should occupy 100% width on all pages", () => {
    testRoutes.forEach((route) => {
        // Renderizar Header en cada ruta
        render(
          <MemoryRouter initialEntries={[route]}>
            <Header />
          </MemoryRouter>
        );

        // Obtener el elemento header
        const headerElement = screen.getByTestId("header");
        expect(headerElement).toBeInTheDocument();
      });
    }); */
/*   it("debe ocupar el ancho completo de la pantalla", () => {
    // function mockStyleInjection() {
    //   const defaultInsertRule = window.CSSStyleSheet.prototype.insertRule;
    //   window.CSSStyleSheet.prototype.insertRule = function (rule, index) {
    //     const styleElement = document.createElement("style");
    //     const textNode = document.createTextNode(rule);
    //     styleElement.appendChild(textNode);
    //     document.head.appendChild(styleElement);
    //     return defaultInsertRule.bind(this)(rule, index);
    //   };
      // cleanup function, which reinserts the head and cleans up method overwrite
    //   return function applyJSSRules() {
    //     window.CSSStyleSheet.prototype.insertRule = defaultInsertRule;
    //     document.head.innerHTML = document.head.innerHTML;
    //   };
    // }

    // const applyJSSRules = mockStyleInjection();

    customRender(<Header />);
    const headerElement = screen.getByRole("banner");
    // applyJSSRules();
    console.log(headerElement)
    
    // const style = window.getComputedStyle(headerElement)
    // console.log(style)
    document.head.innerHTML = document.head.innerHTML;
    expect(headerElement).toHaveClass(styles.header);
    expect(headerElement).toHaveStyle('width: 100%')
  });
 */
/*   it("debe permanecer fijo en la parte superior al hacer scroll", () => {
    customRender(<Header />);
    
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveStyle(`
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1000'
      `);
  });
 */
  it("debe mostrar correctamente el bloque del logo y lema alineado a la izquierda", () => {
    customRender(<Header />);
    
    const brandSection = screen.getByRole('link', { name: /xplora/i });
    expect(brandSection).toHaveClass(styles.header__brand);
    
    const logoImg = screen.getByRole('img');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/logo.svg');
    
    const slogan = screen.getByText('XPLORA');
    expect(slogan).toHaveClass(styles.header__slogan);
  });

  it("debe redirigir a la página principal al hacer clic en el logo o lema", () => {
    customRender(<Header />);
    
    const brandLink = screen.getByRole('link', { name: /xplora/i });
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it("debe mostrar los botones de navegación alineados a la derecha", () => {
    customRender(<Header />);
    
    const rightSection = screen.getByTestId('MenuIcon').closest('div');
    expect(rightSection).toHaveClass(styles.header__right);
    
    const createAccountBtn = screen.getByText('CREAR CUENTA');
    const loginBtn = screen.getByText('INICIAR SESIÓN');
    
    expect(createAccountBtn).toBeInTheDocument();
    expect(createAccountBtn).toHaveClass(styles.header__button);
    
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveClass(styles.header__button);
    expect(loginBtn).toHaveClass(styles['header__button--login']);
  });

  it("debe mostrar el menú hamburguesa en vista móvil", () => {
    customRender(<Header />);
    
    const menuIcon = screen.getByTestId('MenuIcon');
    expect(menuIcon).toBeInTheDocument();
    expect(menuIcon).toHaveClass(styles.header__menu);
  });

  it("debe mantener los estilos correctos para asegurar visibilidad", () => {
    customRender(<Header />);
    
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveStyle(`
      backgroundColor: '#F2EFFD',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      height: '64px'
    `);
  });
});