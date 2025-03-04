package com.backend.security.config;

import com.backend.security.jwt.JwtAuthenticationEntryPoint;
import com.backend.security.jwt.JwtAuthenticationFilter;
import com.backend.security.service.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService,
                          JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                          JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->{
                            auth.requestMatchers("/", "/index.html", "/css/**", "/js/**", "/images/**", "/assets/**", "/logo.svg", "/imagen**").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/api/paquete-experiencia").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/api/paquete-experiencia/**").permitAll();
                            auth.requestMatchers(HttpMethod.POST, "/api/paquete-experiencia").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.DELETE, "/api/paquete-experiencia/**").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.PUT, "/api/paquete-experiencia/**").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.POST, "/api/categoria").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.GET, "/api/categoria").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/api/categoria/**").permitAll();
<<<<<<< HEAD
                            auth.requestMatchers(HttpMethod.PUT, "/api/categoria").hasRole("Administrador");
                            auth.requestMatchers(HttpMethod.DELETE, "/api/categoria").hasRole("Administrador");
                            auth.requestMatchers("/api/auth/**").permitAll()
                                    .requestMatchers("/api/test/**").permitAll()
=======
                            auth.requestMatchers(HttpMethod.PUT, "/api/categoria").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.DELETE, "/api/categoria").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.POST, "/api/auth").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/api/auth").authenticated();
                            auth.requestMatchers(HttpMethod.GET, "/api/auth/**").authenticated();
                            auth.requestMatchers(HttpMethod.PUT, "/api/auth").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.PATCH, "/api/auth").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.DELETE, "/api/auth").hasAnyRole( "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.POST, "/api/rol").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.GET, "/api/rol").permitAll();
                            auth.requestMatchers(HttpMethod.GET, "/api/rol/**").permitAll();
                            auth.requestMatchers(HttpMethod.PUT, "/api/rol").hasAnyRole("Administrador", "SuperAdministrador");
                            auth.requestMatchers(HttpMethod.DELETE, "/api/rol").hasAnyRole("Administrador", "SuperAdministrador");

                            auth.requestMatchers("/api/test/**").permitAll()
>>>>>>> 0e7cee20c41028027f03951084cabb2c9585cb32
                                    .anyRequest().authenticated();
                        }
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}