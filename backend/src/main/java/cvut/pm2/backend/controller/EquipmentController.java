package cvut.pm2.backend.controller;

import cvut.pm2.backend.dto.request.CreateEquipmentRequestDto;
import cvut.pm2.backend.dto.response.EquipmentResponseDto;
import cvut.pm2.backend.dto.response.ReservationResponseDto;
import cvut.pm2.backend.service.EquipmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1")
@Tag(name = "equipment", description = "Operations about room equipment")
@Validated
public class EquipmentController {

    private final EquipmentService equipmentService;

    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @GetMapping("/equipment")
    @Operation(summary = "Get all equipment", description = "Retrieves all equipment items in the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved equipment list", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = EquipmentResponseDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<List<EquipmentResponseDto>> getAllEquipment() {
        List<EquipmentResponseDto> equipment = equipmentService.getAllEquipment();
        return ResponseEntity.ok(equipment);
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @PostMapping("/rooms/{roomId}/equipment")
    @Operation(summary = "Add new equipment to a room", description = "Creates a new equipment entry for the specified room")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Equipment successfully added", content = @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Room not found", content = @Content)
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Equipment details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateEquipmentRequestDto.class)))
    public ResponseEntity<EquipmentResponseDto> createEquipment(
            @PathVariable Long roomId,
            @Valid @RequestBody CreateEquipmentRequestDto request) {
        EquipmentResponseDto response = equipmentService.createEquipment(roomId, request);
        return ResponseEntity.status(201).body(response);
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @DeleteMapping("/equipment/{equipmentId}")
    @Operation(summary = "Delete equipment from a room", description = "Removes the specified equipment from the room")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Equipment successfully deleted", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Equipment not found", content = @Content)
    })
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long equipmentId) {
        equipmentService.deleteEquipment(equipmentId);
        return ResponseEntity.noContent().build();
    }
}
