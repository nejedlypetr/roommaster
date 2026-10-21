package cvut.pm2.backend.config;

import cvut.pm2.backend.security.AuthenticationFailure;
import cvut.pm2.backend.security.AuthenticationSuccess;
import cvut.pm2.backend.security.JwtAuthenticationFilter;
import cvut.pm2.backend.security.JwtUtil;
import cvut.pm2.backend.security.TokenBlacklistService;
import cvut.pm2.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuration class for Spring Security.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

        private final ObjectMapper objectMapper;
        private final UserService userService;
        private final JwtUtil jwtUtil;
        private final TokenBlacklistService tokenBlacklistService;

        /**
         * Constructor injecting necessary dependencies.
         *
         * @param objectMapper          ObjectMapper for JSON processing.
         * @param userService           Service to manage users.
         * @param jwtUtil               Utility for JWT operations.
         * @param tokenBlacklistService Service to manage blacklisted tokens.
         */
        public WebSecurityConfig(ObjectMapper objectMapper, UserService userService, JwtUtil jwtUtil,
                        TokenBlacklistService tokenBlacklistService) {
                this.objectMapper = objectMapper;
                this.userService = userService;
                this.jwtUtil = jwtUtil;
                this.tokenBlacklistService = tokenBlacklistService;
        }

        /**
         * Define the JwtAuthenticationFilter bean here.
         */
        @Bean
        public JwtAuthenticationFilter jwtAuthenticationFilter() {
                return new JwtAuthenticationFilter(jwtUtil, userService, tokenBlacklistService);
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                final AuthenticationSuccess authSuccess = authenticationSuccess();
                final AuthenticationFailure authFailure = authenticationFailureHandler();

                http
                                // Define authorization rules
                                .authorizeHttpRequests((authz) -> authz
                                                // Allow unauthenticated access to /v1/login, /v1/logout, /v1/users, and
                                                // Swagger
                                                // UI
                                                // TODO : delete /v1/users from permitAll
                                                .requestMatchers("/v1/login", "/v1/logout", "/swagger-ui/**",
                                                                "/v3/api-docs/**",
                                                                "/swagger-ui.html")
                                                .permitAll()

                                                // Allow unauthenticated access to POST /v1/users
                                                .requestMatchers(HttpMethod.POST, "/v1/users").permitAll()

                                                // Restrict PATCH /v1/rooms/{roomId}/faults/{faultId}/resolve to
                                                // MAINTAINER role
                                                .requestMatchers(HttpMethod.PATCH, "/v1/rooms/*/faults/*/resolve")
                                                .hasRole("MAINTAINER")

                                                // Restrict GET /v1/users for everyone
                                                .requestMatchers(HttpMethod.GET, "/v1/users").hasRole("MAINTAINER")

                                                // Restrict POST /v1/rooms to MAINTAINER role
                                                .requestMatchers(HttpMethod.POST, "/v1/rooms").hasRole("MAINTAINER")

                                                // Restrict GET /v1/faults to MAINTAINER role
                                                .requestMatchers(HttpMethod.GET, "/v1/faults").hasRole("MAINTAINER")

                                                // Restrict DELETE /v1/rooms/{roomId} to MAINTAINER role
                                                .requestMatchers(HttpMethod.DELETE, "/v1/rooms/*").hasRole("MAINTAINER")

                                                // Restrict DELETE /v1/floors/{floorId} to MAINTAINER role
                                                .requestMatchers(HttpMethod.DELETE, "/v1/floors/*")
                                                .hasRole("MAINTAINER")

                                                // Restrict GET /v1/floors to MAINTAINER role
                                                .requestMatchers(HttpMethod.GET, "/v1/floors").hasRole("MAINTAINER")

                                                // Restrict POST /v1/floors to MAINTAINER role
                                                .requestMatchers(HttpMethod.POST, "/v1/floors").hasRole("MAINTAINER")

                                                // Restrict DELETE /v1/buildings/{buildingId} to MAINTAINER role
                                                .requestMatchers(HttpMethod.DELETE, "/v1/buildings/*")
                                                .hasRole("MAINTAINER")

                                                // Restrict POST /v1/buildings to MAINTAINER role
                                                .requestMatchers(HttpMethod.POST, "/v1/buildings")
                                                .hasRole("MAINTAINER")

                                                // Restrict GET /v1/buildings to MAINTAINER role
                                                .requestMatchers(HttpMethod.GET, "/v1/buildings").hasRole("MAINTAINER")

                                                // Restrict POST /v1/rooms/{roomId}/equipment to MAINTAINER role
                                                .requestMatchers(HttpMethod.POST, "/v1/rooms/*/equipment")
                                                .hasRole("MAINTAINER")

                                                // Restrict DELETE /v1/equipment/{equipmentId} to MAINTAINER role
                                                .requestMatchers(HttpMethod.DELETE, "/v1/equipment/*")
                                                .hasRole("MAINTAINER")

                                                // Restrict GET /v1/equipment to MAINTAINER role
                                                .requestMatchers(HttpMethod.GET, "/v1/equipment")
                                                .hasRole("MAINTAINER")

                                                // Any other request requires authentication
                                                // Any other request requires authentication
                                                .anyRequest().authenticated())
                                // Handle unauthorized access
                                .exceptionHandling(ehc -> ehc
                                                .authenticationEntryPoint(
                                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                                // Disable CSRF (since we're using JWT)
                                .csrf(csrf -> csrf.disable())
                                // Configure CORS
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                // Set frame options to same origin
                                .headers(headers -> headers
                                                .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
                                // Disable form login as we're using JWT
                                .formLogin(form -> form
                                                .disable())
                                // Disable default logout handling
                                .logout(logout -> logout
                                                .disable())
                                // Add JWT filter before UsernamePasswordAuthenticationFilter
                                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public AuthenticationFailure authenticationFailureHandler() {
                return new AuthenticationFailure(objectMapper);
        }

        @Bean
        public AuthenticationSuccess authenticationSuccess() {
                return new AuthenticationSuccess(objectMapper);
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                // **Allowed Origin Patterns:** Allow any localhost with any port
                configuration.setAllowedOriginPatterns(List.of("http://localhost:*", "https://localhost:*"));

                // **Allowed Methods:** Specify only the necessary HTTP methods
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));

                // **Allowed Headers:** Specify necessary headers
                configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));

                // **Exposed Headers:** Headers exposed to the client
                configuration.setExposedHeaders(List.of(HttpHeaders.LOCATION));

                // **Allow Credentials:** Set to true if your application requires credentials
                // (e.g., cookies)
                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}
