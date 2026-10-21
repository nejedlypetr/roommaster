package cvut.pm2.backend.dto.response;

import cvut.pm2.backend.model.EquipmentType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "EquipmentResponseDto", description = "Response object for a piece of equipment")
public class EquipmentResponseDto {
    @Schema(description = "The unique identifier of the equipment", example = "1")
    private Long id;

    @Schema(description = "The ID of the room where the equipment belongs", example = "1")
    private Long roomId;

    @Schema(description = "The type of the equipment", example = "WHITEBOARD")
    private EquipmentType equipmentType;

    @Schema(description = "The quantity of the equipment", example = "1")
    private Integer quantity;
}
