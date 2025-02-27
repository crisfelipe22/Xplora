// Header.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';
import Header from "../components/Header";
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styles from "../styles/Header.module.css";

// Create a wrapper component that provides all necessary contexts
const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe("Header Component", () => {
  it("should render with correct base styles", () => {
    customRender(<Header />);
    
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass(styles.header);
    
    // Test base styles
    expect(headerElement).toHaveStyle(`
      width: '100%',
      height: '64px',
      backgroundColor: '#F2EFFD',
      position: 'fixed',
      top: '0',
      left: '0'`
    );
  });

  it("should render the brand section correctly", () => {
    customRender(<Header />);
    
    const brandLink = screen.getByRole('link');
    expect(brandLink).toHaveClass(styles.header__brand);
    
    const logoImg = screen.getByRole('img');
    expect(logoImg).toHaveAttribute('src', '/logo.svg');
  });

  it("should render the navigation buttons", () => {
    customRender(<Header />);
    
    const createAccountBtn = screen.getByText('CREAR CUENTA');
    expect(createAccountBtn).toBeInTheDocument();
    expect(createAccountBtn.getAttribute("class")).toContain("header__button");
    expect(createAccountBtn).toHaveClass(styles.header__button); 
    
    const loginBtn = screen.getByText('INICIAR SESIÓN');
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveClass(styles["header__button--login"]);
    expect(loginBtn.getAttribute("class")).toContain("header__button--login");
  });

  it("should handle responsive elements correctly", () => {
    customRender(<Header />);
    
    // Test menu icon visibility
    const menuIcon = screen.getByTestId('MenuIcon');
    expect(menuIcon).toBeInTheDocument();
    
    // Test slogan container
    const sloganText = screen.getByText('XPLORA');
    expect(sloganText).toHaveClass(styles.header__slogan);
  });
});