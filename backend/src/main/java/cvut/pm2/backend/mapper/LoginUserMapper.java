package cvut.pm2.backend.mapper;

import cvut.pm2.backend.dto.response.LoginUserResponseDto;
import cvut.pm2.backend.model.User;

public class LoginUserMapper {
    public static LoginUserResponseDto toDto(User user, String token) {
        if (user == null) {
            return null;
        }

        LoginUserResponseDto dto = new LoginUserResponseDto();
        dto.setToken(token);
        dto.setUser(UserMapper.toDto(user));
        return dto;
    }
}
