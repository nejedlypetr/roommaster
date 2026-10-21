package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.response.FloorResponseDto;
import cvut.pm2.backend.model.Floor;

public class FloorMapper {
    public static FloorResponseDto toDto(Floor floor) {
        if (floor == null) {
            return null;
        }

        FloorResponseDto dto = new FloorResponseDto();
        dto.setId(floor.getId());
        dto.setFloorNumber(floor.getFloorNumber());
        dto.setBuildingId(floor.getBuilding().getId());
        return dto;
    }
}
