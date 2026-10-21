package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.response.BuildingResponseDto;
import cvut.pm2.backend.model.Building;

public class BuildingMapper {
    public static BuildingResponseDto toDto(Building building) {
        if (building == null) {
            return null;
        }

        BuildingResponseDto dto = new BuildingResponseDto();
        dto.setId(building.getId());
        dto.setName(building.getName());
        dto.setStreet(building.getStreet());
        dto.setCity(building.getCity());
        dto.setPostalCode(building.getPostalCode());
        return dto;
    }
}
