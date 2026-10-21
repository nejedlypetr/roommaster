package cvut.pm2.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
@Schema(name = "CreateFaultRequestDto", description = "Request object for creating a new fault")
public class CreateFaultRequestDto {
    @NotNull(message = "Cause cannot be null")
    @NotBlank(message = "Cause cannot be empty")
    @Schema(description = "The cause of the fault", example = "Broken window")
    private String cause;

    @NotNull(message = "Description cannot be null")
    @NotBlank(message = "Description cannot be empty")
    @Schema(description = "The description of the fault", example = "The window is broken and needs to be replaced")
    private String description;
}
