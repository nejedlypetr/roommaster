package cvut.pm2.backend.dto.response;

import java.time.LocalDateTime;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "FaultResponseDto", description = "Response object for a fault")
public class FaultResponseDto {
    @Schema(description = "The unique identifier of the fault", example = "1")
    private Long id;

    @Schema(description = "The ID of the room where the fault occurred", example = "1")
    private Long roomId;

    @Schema(description = "The cause of the fault", example = "Broken window")
    private String cause;

    @Schema(description = "The description of the fault", example = "The window is broken and needs to be replaced")
    private String description;

    @Schema(description = "The date and time when the fault was created", example = "2021-01-01T00:00:00")
    private LocalDateTime created;

    @Schema(description = "Whether the fault has been resolved", example = "false")
    private boolean resolved;
}
