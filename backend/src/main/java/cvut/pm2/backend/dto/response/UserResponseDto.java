package cvut.pm2.backend.dto.response;

import cvut.pm2.backend.model.Department;
import cvut.pm2.backend.model.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(name = "UserResponseDto", description = "User Data Transfer Object")
public class UserResponseDto {

    @Schema(description = "User ID", example = "1")
    private Long id;

    @Schema(description = "User's first name", example = "John")
    private String firstName;

    @Schema(description = "User's last name", example = "Doe")
    private String lastName;

    @Schema(description = "User's email address", example = "john.doe@example.com")
    private String email;

    @Schema(description = "User's role")
    private UserRole role;

    @Schema(description = "User's department")
    private Department department;

    @Schema(description = "Whether the user is a head of department", example = "false")
    private Boolean isHeadOfDepartment;

}
