package cvut.pm2.backend.dto.request;

import cvut.pm2.backend.model.Department;
import cvut.pm2.backend.model.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@Schema(name = "CreateUserRequestDto", description = "Request object for creating a new user")
public class CreateUserRequestDto {

    @NotBlank(message = "First name cannot be empty")
    @Schema(description = "User's first name", example = "John")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    @Schema(description = "User's last name", example = "Doe")
    private String lastName;

    @NotBlank(message = "Email cannot be empty")
    @Schema(description = "User's email address", example = "john.doe@example.com")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Schema(description = "User's password", example = "password123")
    private String password;

    @NotNull(message = "Department cannot be null")
    @Schema(description = "User's department")
    private Department department;

    @NotNull(message = "Role cannot be null")
    @Schema(description = "User's role")
    private UserRole role;

    @NotNull(message = "Head of department status cannot be null")
    @Schema(description = "Whether the user is a head of department", example = "false")
    private Boolean isHeadOfDepartment;
}
