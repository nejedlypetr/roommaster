package cvut.pm2.backend.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "LoginRequestDto", description = "Request object for user login")
public class LoginRequestDto {

    @Schema(description = "The email of the user", example = "john.doe@example.com")
    private String email;

    @Schema(description = "The password of the user", example = "password123")
    private String password;
}
