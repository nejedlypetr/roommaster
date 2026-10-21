package cvut.pm2.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "FloorResponseDto", description = "Floor response DTO")
public class FloorResponseDto {
    @Schema(description = "ID of the floor")
    private Long id;

    @Schema(description = "Floor number")
    private Integer floorNumber;

    @Schema(description = "ID of the building")
    private Long buildingId;
}
