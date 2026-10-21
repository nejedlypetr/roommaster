package cvut.pm2.backend.dto.response;

import cvut.pm2.backend.model.Equipment;
import cvut.pm2.backend.model.FaultLog;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(name = "DetailRoomResponseDto", description = "Detailed room response DTO with equipment and fault")
public class DetailRoomResponseDto {
    @Schema(description = "Information about a room")
    private RoomResponseDto roomData;

    @Schema(description = "All equipment in the room")
    private List<EquipmentResponseDto> equipment;

    @Schema(description = "All faults of the room")
    private List<FaultResponseDto> faultLogs;
}
