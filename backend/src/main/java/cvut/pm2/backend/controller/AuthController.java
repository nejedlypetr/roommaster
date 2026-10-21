package cvut.pm2.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import cvut.pm2.backend.dto.request.LoginRequestDto;
import cvut.pm2.backend.dto.response.LoginUserResponseDto;
import cvut.pm2.backend.mapper.LoginUserMapper;
import cvut.pm2.backend.model.User;
import cvut.pm2.backend.security.JwtUtil;
import cvut.pm2.backend.security.TokenBlacklistService;
import cvut.pm2.backend.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Date;
import java.util.Optional;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;


/**
 * Controller handling authentication operations.
 */
@RestController
@RequestMapping("/v1")
@Tag(name = "auth", description = "Authentication operations")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final TokenBlacklistService tokenBlacklistService;

    /**
     * Constructor injecting necessary dependencies.
     *
     * @param userService            Service to manage users.
     * @param passwordEncoder        Encoder for passwords.
     * @param jwtUtil                Utility for JWT operations.
     * @param tokenBlacklistService  Service to manage blacklisted tokens.
     */
    public AuthController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, TokenBlacklistService tokenBlacklistService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Authenticate a user and return a JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful login", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginUserResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content()),
            @ApiResponse(responseCode = "401", description = "Invalid credentials", content = @Content())
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Login details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginRequestDto.class)))
    public ResponseEntity<LoginUserResponseDto> loginUser(@RequestBody LoginRequestDto loginRequest) {
        // Validate input
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        }

        // Retrieve user by email
        Optional<User> optionalUser = userService.findByEmail(loginRequest.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = optionalUser.get();

        // Check password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user);

        // Map to response DTO
        LoginUserResponseDto responseDto = LoginUserMapper.toDto(user, token);

        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout user", description = "Invalidates the user's token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully logged out", content = @Content()),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing token", content = @Content())
    })
    public ResponseEntity<Void> logoutUser(@RequestHeader(name = HttpHeaders.AUTHORIZATION, required = false) String authorizationHeader) {
        // Validate the Authorization header
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Extract the token from the header
        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix

        try {
            // Parse the token to retrieve claims
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(jwtUtil.getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Get the token's expiration date
            Date expiration = claims.getExpiration();

            // Add the token to the blacklist
            tokenBlacklistService.blacklistToken(token, expiration);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Log the exception if needed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
