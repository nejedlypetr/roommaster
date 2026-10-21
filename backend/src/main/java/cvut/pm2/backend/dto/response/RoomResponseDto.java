package cvut.pm2.backend.dto.response;

import cvut.pm2.backend.model.Department;
import cvut.pm2.backend.model.RoomType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "RoomResponseDto", description = "Room response DTO")
public class RoomResponseDto {
    @Schema(description = "ID of the building")
    private Long buildingId;

    @Schema(description = "Name of the building")
    private String buildingName;

    @Schema(description = "Street address of the building")
    private String buildingStreet;

    @Schema(description = "City of the building")
    private String buildingCity;

    @Schema(description = "Postal code of the building")
    private String buildingPostalCode;

    @Schema(description = "ID of the floor")
    private Long floorId;

    @Schema(description = "Floor number")
    private Integer floorNumber;

    @Schema(description = "ID of the room")
    private Long roomId;

    @Schema(description = "Type of the room")
    private RoomType roomType;

    @Schema(description = "Room number")
    private Integer roomNumber;

    @Schema(description = "Opening time of the room")
    private Integer openingTime;

    @Schema(description = "Closing time of the room")
    private Integer closingTime;

    @Schema(description = "Capacity of the room")
    private Integer capacity;

    @Schema(description = "Description of the room")
    private String roomDescription;

    @Schema(description = "Room's department")
    private Department department;
}
