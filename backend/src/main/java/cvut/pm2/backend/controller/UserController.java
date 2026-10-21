package cvut.pm2.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import cvut.pm2.backend.dto.request.CreateUserRequestDto;
import cvut.pm2.backend.dto.response.UserResponseDto;
import cvut.pm2.backend.service.UserService;
import io.swagger.v3.oas.annotations.media.ArraySchema;

@RestController
@RequestMapping("/v1/users")
@Tag(name = "users", description = "Operations about users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @GetMapping
    @Operation(summary = "Get all users", description = "Returns a list of all users (requires admin privileges)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = UserResponseDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient privileges", content = @Content())
    })
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping
    @Operation(summary = "Create a new user", description = "Adds a new user. Anonymous requests are always created with the USER role. Only a maintainer can assign another role.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient privileges", content = @Content()),
            @ApiResponse(responseCode = "409", description = "User already exists", content = @Content())
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "User's details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateUserRequestDto.class)))
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody CreateUserRequestDto userRequest) {
        UserResponseDto createdUser = userService.createUser(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @DeleteMapping("/{userId}")
    @Operation(summary = "Delete a user", description = "Deletes an existing user by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User deleted successfully", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Forbidden - Insufficient privileges", content = @Content()),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content())
    })
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
}
