package cvut.pm2.backend.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "LoginUserResponseDto", description = "Response object for user login")
public class LoginUserResponseDto {

    @Schema(description = "JWT token")
    private String token;

    @Schema(description = "User details")
    private UserResponseDto user;
}
