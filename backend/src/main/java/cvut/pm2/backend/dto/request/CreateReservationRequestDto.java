package cvut.pm2.backend.dto.request;

import cvut.pm2.backend.model.ReservationPurpose;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
@Schema(name = "CreateReservationRequestDto", description = "DTO for creating a new reservation")
public class CreateReservationRequestDto {
    @NotNull(message = "Room ID cannot be null")
    @Positive(message = "Room ID must be a positive number")
    @Schema(description = "Room ID", example = "1")
    private Long roomId;

    @NotNull(message = "Reservation date cannot be null")
    @FutureOrPresent(message = "Reservation date must be today or in the future")
    @Schema(description = "Date of the reservation", example = "2023-05-15")
    private LocalDate reservationDate;

    @NotNull(message = "Start time slot cannot be null")
    @Min(value = 0, message = "Start time slot must be between 0 and 95")
    @Max(value = 95, message = "Start time slot must be between 0 and 95")
    @Schema(description = "Start time slot of the reservation", example = "32")
    private Integer startTimeSlot;

    @NotNull(message = "End time slot cannot be null")
    @Min(value = 1, message = "End time slot must be between 1 and 96")
    @Max(value = 96, message = "End time slot must be between 1 and 96")
    @Schema(description = "End time slot of the reservation", example = "48")
    private Integer endTimeSlot;

    @NotNull(message = "Purpose cannot be null")
    @Schema(description = "Purpose of the reservation")
    private ReservationPurpose purpose;

    @Size(max = 255, message = "Description cannot be longer than 255 characters")
    @Schema(description = "Additional description or notes for the reservation")
    private String description;

    @AssertTrue(message = "End time slot must be after start time slot")
    private boolean isTimeSlotValid() {
        if (startTimeSlot == null || endTimeSlot == null) {
            return true;
        }
        return endTimeSlot > startTimeSlot;
    }
}
