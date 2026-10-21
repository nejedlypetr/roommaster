package cvut.pm2.backend.dto.response;

import cvut.pm2.backend.model.ReservationPurpose;
import cvut.pm2.backend.model.ReservationStatus;
import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Schema(description = "DTO for reservation response")
public class ReservationResponseDto {
    @Schema(description = "Unique identifier of the reservation", example = "1")
    private Long id;

    @Schema(description = "ID of the room associated with the reservation", example = "2")
    private Long roomId;

    @Schema(description = "Number of the room associated with the reservation", example = "101")
    private Integer roomNumber;

    @Schema(description = "Number of the floor associated with the reservation", example = "2")
    private Integer floorNumber;

    @Schema(description = "Name of the building associated with the reservation", example = "Main Office")
    private String buildingName;

    @Schema(description = "ID of the user that created the reservation", example = "3")
    private Long userId;

    @Schema(description = "First name of the user that created the reservation")
    private String firstName;

    @Schema(description = "Last name of the user that created the reservation")
    private String lastName;

    @Schema(description = "Purpose of the reservation")
    private ReservationPurpose purpose;

    @Schema(description = "Start time slot of the reservation", example = "32")
    private Integer startTimeSlot;

    @Schema(description = "End time slot of the reservation", example = "48")
    private Integer endTimeSlot;

    @Schema(description = "Date and time when the reservation was created", example = "2023-04-15T10:30:00")
    private LocalDateTime created;

    @Schema(description = "Additional description or notes for the reservation")
    private String description;

    @Schema(description = "Current status of the reservation")
    private ReservationStatus status;

    @Schema(description = "Date of the reservation", example = "2023-04-20")
    private LocalDate reservationDate;
}
