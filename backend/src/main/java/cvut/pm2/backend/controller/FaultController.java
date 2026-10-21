package cvut.pm2.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import cvut.pm2.backend.dto.request.CreateFaultRequestDto;
import cvut.pm2.backend.dto.request.ResolveFaultRequestDto;
import cvut.pm2.backend.dto.response.FaultResponseDto;
import cvut.pm2.backend.service.FaultService;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.media.ArraySchema;

@RestController
@RequestMapping("/v1")
@Tag(name = "faults", description = "Operations about faults")
@Validated
public class FaultController {

    private final FaultService faultService;

    public FaultController(FaultService faultService) {
        this.faultService = faultService;
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @GetMapping("/faults")
    @Operation(summary = "Get all faults", description = "Returns a list of all faults")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = FaultResponseDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content)
    })
    public ResponseEntity<List<FaultResponseDto>> getFaults() {
         List<FaultResponseDto> faults = faultService.findAll();
         return ResponseEntity.ok(faults);
    }

    @PostMapping("/rooms/{roomId}/faults")
    @Operation(summary = "Add a new fault to a room's fault log", description = "Creates a new fault entry for the specified room")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Fault successfully added", content = @Content(mediaType = "application/json", schema = @Schema(implementation = FaultResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content()),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Room not found", content = @Content())
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Fault details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateFaultRequestDto.class)))
    public ResponseEntity<FaultResponseDto> addFaultToRoom(@PathVariable Long roomId,
            @Valid @RequestBody CreateFaultRequestDto faultRequest) {
        FaultResponseDto response = faultService.addFault(roomId, faultRequest);
        return ResponseEntity.status(201).body(response);
    }

    @PreAuthorize("hasRole('MAINTAINER')")
    @PatchMapping("/rooms/{roomId}/faults/{faultId}/resolve")
    @Operation(summary = "Update the resolved status of a fault", description = "Updates the resolved status of the specified fault")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Fault status successfully updated", content = @Content(mediaType = "application/json", schema = @Schema(implementation = FaultResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content()),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Fault not found", content = @Content())
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Fault details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResolveFaultRequestDto.class)))
    public ResponseEntity<FaultResponseDto> updateFaultResolvedStatus(@PathVariable Long roomId,
            @PathVariable Long faultId,
            @Valid @RequestBody ResolveFaultRequestDto faultResolveRequest) {
        FaultResponseDto response = faultService.resolve(faultId, faultResolveRequest);
        return ResponseEntity.ok(response);
    }
}
