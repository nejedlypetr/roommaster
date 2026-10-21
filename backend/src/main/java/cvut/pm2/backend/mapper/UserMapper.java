package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.request.CreateUserRequestDto;
import cvut.pm2.backend.dto.response.UserResponseDto;
import cvut.pm2.backend.model.User;

public class UserMapper {
    public static UserResponseDto toDto(User user) {
        if (user == null) {
            return null;
        }

        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setDepartment(user.getDepartment());
        dto.setIsHeadOfDepartment(user.getIsHeadOfDepartment());
        return dto;
    }

    public static User toEntity(CreateUserRequestDto dto) {
        if (dto == null) {
            return null;
        }

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setDepartment(dto.getDepartment());
        user.setRole(dto.getRole());
        user.setIsHeadOfDepartment(dto.getIsHeadOfDepartment());
        return user;
    }
}
