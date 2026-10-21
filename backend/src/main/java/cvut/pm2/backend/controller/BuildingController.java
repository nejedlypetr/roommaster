package cvut.pm2.backend.controller;

import cvut.pm2.backend.dto.request.CreateBuildingRequestDto;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import cvut.pm2.backend.dto.response.BuildingResponseDto;
import cvut.pm2.backend.service.BuildingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/v1/buildings")
@Tag(name = "buildings", description = "Operations about buildings")
@Validated
public class BuildingController {

    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @PostMapping
    @Operation(summary = "Create a new building",description = "Creates a new building with the provided details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BuildingResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Building details",required = true,content = @Content(mediaType = "application/json",schema = @Schema(implementation = CreateBuildingRequestDto.class)))
    public ResponseEntity<BuildingResponseDto> createBuilding(@Valid @RequestBody CreateBuildingRequestDto createBuildingRequestDto) {
        final BuildingResponseDto buildingResponseDto = buildingService.create(createBuildingRequestDto);
        return ResponseEntity.ok(buildingResponseDto);
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @GetMapping
    @Operation(summary = "Get all buildings", description = "Returns all buildings")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = BuildingResponseDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<List<BuildingResponseDto>> getBuildings() {
        return ResponseEntity.ok(buildingService.findAll());
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @DeleteMapping("/{buildingId}")
    @Operation(summary = "Delete a building", description = "Deletes a building with the provided ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successful operation", content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content),
            @ApiResponse(responseCode = "404", description = "Building not found", content = @Content)
    })
    public ResponseEntity<Void> deleteBuilding(@PathVariable Long buildingId) {
        buildingService.delete(buildingId);
        return ResponseEntity.noContent().build();
    }

}
