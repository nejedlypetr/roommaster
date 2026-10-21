package cvut.pm2.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(name = "CreateFloorRequestDto", description = "Request DTO for creating a new floor")
public class CreateFloorRequestDto {

    @NotNull(message = "Floor number is required")
    @Schema(description = "Floor number", example = "1", required = true)
    private Integer floorNumber;

    @NotNull(message = "Building ID is required")
    @Schema(description = "ID of the building this floor belongs to", example = "1", required = true)
    private Long buildingId;
}
