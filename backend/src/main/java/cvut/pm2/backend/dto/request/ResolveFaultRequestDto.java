package cvut.pm2.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "ResolveFaultRequestDto", description = "Request object for resolving a fault")
public class ResolveFaultRequestDto {

    @Schema(description = "Whether the fault has been resolved", example = "true")
    private boolean resolved;
}
