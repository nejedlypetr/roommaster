package cvut.pm2.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "BuildingResponseDto", description = "Building response DTO")
public class BuildingResponseDto {
    @Schema(description = "ID of the building")
    private Long id;

    @Schema(description = "Name of the building")
    private String name;

    @Schema(description = "Street address of the building")
    private String street;

    @Schema(description = "City where the building is located")
    private String city;

    @Schema(description = "Postal code of the building's location")
    private String postalCode;
}
