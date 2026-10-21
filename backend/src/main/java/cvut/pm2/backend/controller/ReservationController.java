package cvut.pm2.backend.controller;

import cvut.pm2.backend.security.SecurityUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.Valid;
import cvut.pm2.backend.dto.request.CreateReservationRequestDto;
import cvut.pm2.backend.dto.response.ReservationResponseDto;
import cvut.pm2.backend.service.ReservationService;

@RestController
@RequestMapping("/v1/reservations")
@Tag(name = "reservations", description = "Operations about reservations")
@Validated
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    @Operation(summary = "Create a new reservation", description = "Create a new reservation for a room")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content()),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content()),
            @ApiResponse(responseCode = "409", description = "Room not available for the selected date and time slots", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    })
    @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Reservation details", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = CreateReservationRequestDto.class)))
    public ResponseEntity<ReservationResponseDto> createReservation(
            @Valid @RequestBody CreateReservationRequestDto reservationRequest) {
        ReservationResponseDto response = reservationService.createReservation(reservationRequest, SecurityUtils.getCurrentUser());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{reservationId}/cancel")
    @Operation(summary = "Cancel a reservation", description = "Cancels an existing reservation by setting its status to CANCELLED")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reservation successfully cancelled", content = @Content()),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content()),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Forbidden - User doesn't have permission to cancel this reservation", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Reservation not found", content = @Content()),
            @ApiResponse(responseCode = "409", description = "Conflict - Reservation is already cancelled or past the cancellation deadline", content = @Content())
    })
    public ResponseEntity<Void> cancelReservation(@PathVariable Long reservationId) {
        reservationService.cancelReservation(reservationId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}")
    @Operation(summary = "Get all reservations for a specific user", description = "Returns a list of all reservations made by the specified user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ReservationResponseDto.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content()),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content())
    })
    public ResponseEntity<List<ReservationResponseDto>> getUserReservations(@PathVariable Long userId) {
        List<ReservationResponseDto> reservations = reservationService.findAllByUser(userId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/rooms/{roomId}")
    @Operation(summary = "Get all reservations for a specific room and date", description = "Returns a list of all reservations in specific room at given date")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ReservationResponseDto.class)))),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content()),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content()),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content()),
            @ApiResponse(responseCode = "404", description = "Room not found", content = @Content())
    })
    public ResponseEntity<List<ReservationResponseDto>> getReservationsByRoomAndDate(@PathVariable Long roomId, @RequestParam(required = true) LocalDate date) {
        List<ReservationResponseDto> reservations = reservationService.findAllByDateAndRoom(date,roomId);
        return ResponseEntity.ok(reservations);
    }
}