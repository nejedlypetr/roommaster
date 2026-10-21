package cvut.pm2.backend.dto.request;

import cvut.pm2.backend.model.Department;
import cvut.pm2.backend.model.RoomType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(name = "CreateRoomRequestDto", description = "DTO for creating a new room", requiredProperties = { "floorId",
        "roomType", "roomNumber", "openingTime", "closingTime", "capacity", "department" })
public class CreateRoomRequestDto {
    @NotNull(message = "Floor ID cannot be null")
    @Positive(message = "Floor ID must be a positive number")
    @Schema(description = "ID of the floor where the room is located", example = "1")
    private Long floorId;

    @NotNull(message = "Room type cannot be null")
    @Schema(description = "Type of the room")
    private RoomType roomType;

    @NotNull(message = "Room number cannot be null")
    @Positive(message = "Room number must be a positive number")
    @Schema(description = "Room number", example = "101")
    private Integer roomNumber;

    @NotNull(message = "Opening time cannot be null")
    @Min(value = 0, message = "Opening time must be between 0 and 95")
    @Max(value = 95, message = "Opening time must be between 0 and 95")
    @Schema(description = "Opening time slot of the room", example = "32")
    private Integer openingTime;

    @NotNull(message = "Closing time cannot be null")
    @Min(value = 1, message = "Closing time must be between 1 and 96")
    @Max(value = 96, message = "Closing time must be between 1 and 96")
    @Schema(description = "Closing time slot of the room", example = "72")
    private Integer closingTime;

    @NotNull(message = "Capacity cannot be null")
    @Positive(message = "Capacity must be a positive number")
    @Schema(description = "Capacity of the room", example = "20")
    private Integer capacity;

    @Size(max = 255, message = "Description cannot be longer than 255 characters")
    @Schema(description = "Description of the room")
    private String description;

    @NotNull(message = "Department cannot be null")
    @Schema(description = "Department that owns the room")
    private Department department;
}
