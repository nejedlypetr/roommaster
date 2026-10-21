package cvut.pm2.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(name = "CreateBuildingRequestDto", description = "Request DTO for creating a new building")
public class CreateBuildingRequestDto {
    @NotNull(message = "Name is required")
    @Schema(description = "Building name",example = "Main Office")
    private String name;

    @NotNull(message = "Street is required")
    @Schema(description = "Street where the building is located",example = "Main St 123")
    private String street;

    @NotNull(message = "City is required")
    @Schema(description = "City where the building is located",example = "London")
    private String city;

    @NotNull(message = "Postal code is required")
    @Schema(description = "Postal code of the building",example = "12000")
    private String postalCode;
}
