package cvut.pm2.backend.controller;

import cvut.pm2.backend.dto.request.CreateRoomRequestDto;
import cvut.pm2.backend.dto.response.DetailRoomResponseDto;
import cvut.pm2.backend.service.RoomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import cvut.pm2.backend.dto.response.RoomResponseDto;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@RestController
@RequestMapping("/v1/rooms")
@Tag(name = "rooms", description = "Operations about rooms")
@Validated
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }
    @GetMapping
    @Operation(summary = "Get all rooms", description = "Returns a list of all rooms based on the logged-in user's role")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = RoomResponseDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<List<RoomResponseDto>> getRooms() {
        List<RoomResponseDto> rooms = roomService.findAll();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{roomId}")
    @Operation(summary = "Get a single room with equipment and fault information", description = "Returns detailed information about a single room, including its equipment and fault logs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = DetailRoomResponseDto.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Room not found", content = @Content)
    })
    public ResponseEntity<DetailRoomResponseDto> getRoomById(@PathVariable Long roomId) {
        return ResponseEntity.ok(roomService.find(roomId));
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @PostMapping
    @Operation(summary = "Create a new room", description = "Creates a new room with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = RoomResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Floor not found", content = @Content)
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Room details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateRoomRequestDto.class)))
    public ResponseEntity<RoomResponseDto> createRoom(@Valid @RequestBody CreateRoomRequestDto createRoomRequestDto) {
        return ResponseEntity.ok(roomService.create(createRoomRequestDto));
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @DeleteMapping("/{roomId}")
    @Operation(summary = "Delete a room", description = "Deletes a room with the provided ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successful operation", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Room not found", content = @Content),
            @ApiResponse(responseCode = "409", description = "Cannot delete room with active reservations", content = @Content)
    })
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) {
        roomService.delete(roomId);
        return ResponseEntity.noContent().build();
    }
}
