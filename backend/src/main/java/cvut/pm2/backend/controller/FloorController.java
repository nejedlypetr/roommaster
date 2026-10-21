package cvut.pm2.backend.controller;

import cvut.pm2.backend.dto.request.CreateFloorRequestDto;
import cvut.pm2.backend.dto.response.FloorResponseDto;
import cvut.pm2.backend.service.FloorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("/v1/floors")
@Tag(name = "floors", description = "Operations about floors")
@Validated
public class FloorController {

    private final FloorService floorService;

    public FloorController(FloorService floorService) {
        this.floorService = floorService;
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @PostMapping
    @Operation(summary = "Create a new floor", description = "Creates a new floor with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = FloorResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Building not found", content = @Content)
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Floor details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateFloorRequestDto.class)))
    public ResponseEntity<FloorResponseDto> createFloor(
            @Valid @RequestBody CreateFloorRequestDto createFloorRequestDto) {
        final FloorResponseDto floorResponseDto =
        floorService.create(createFloorRequestDto);
        return ResponseEntity.ok(floorResponseDto);
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @DeleteMapping("/{floorId}")
    @Operation(summary = "Delete a floor", description = "Deletes a floor with the provided ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successful operation", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Floor not found", content = @Content)
    })
    public ResponseEntity<Void> deleteFloor(@PathVariable Long floorId) {
        floorService.delete(floorId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @GetMapping
    @Operation(summary = "Get all floors", description = "Returns all floors")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = FloorResponseDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<List<FloorResponseDto>> getFloors() {
        return ResponseEntity.ok(floorService.findAll());
    }

}
