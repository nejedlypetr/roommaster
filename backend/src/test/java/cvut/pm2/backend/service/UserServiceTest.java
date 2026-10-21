package cvut.pm2.backend.service;

import cvut.pm2.backend.dto.request.CreateUserRequestDto;
import cvut.pm2.backend.dto.response.UserResponseDto;
import cvut.pm2.backend.model.Department;
import cvut.pm2.backend.model.User;
import cvut.pm2.backend.model.UserRole;
import cvut.pm2.backend.dao.UserDao;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserServiceTest {
    @Mock
    private UserDao userDao;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void testFindAll() {
        User user1 = new User();
        User user2 = new User();

        when(userDao.findAll()).thenReturn(List.of(user1,user2));

        List<UserResponseDto> result = userService.findAll();

        assertEquals(2, result.size());
        verify(userDao, times(1)).findAll();
    }

    @Test
    void anonymousRegistrationIsForcedToUserRole() {
        SecurityContextHolder.getContext().setAuthentication(new AnonymousAuthenticationToken(
                "key", "anonymousUser", AuthorityUtils.createAuthorityList("ROLE_ANONYMOUS")));

        createUser(UserRole.MAINTAINER);

        assertEquals(UserRole.USER, capturedUser().getRole());
    }

    @Test
    void maintainerCanAssignMaintainerRole() {
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                "john.doe@example.com",
                null,
                List.of(new SimpleGrantedAuthority("ROLE_MAINTAINER"))));

        createUser(UserRole.MAINTAINER);

        assertEquals(UserRole.MAINTAINER, capturedUser().getRole());
    }

    private void createUser(UserRole requestedRole) {
        CreateUserRequestDto request = new CreateUserRequestDto();
        request.setFirstName("Ann");
        request.setLastName("Lee");
        request.setEmail("ann@example.com");
        request.setPassword("password123");
        request.setDepartment(Department.FINANCE);
        request.setRole(requestedRole);
        request.setIsHeadOfDepartment(false);

        when(userDao.findByEmail("ann@example.com")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("hash");

        userService.createUser(request);
    }

    private User capturedUser() {
        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userDao).persist(captor.capture());
        return captor.getValue();
    }
}
