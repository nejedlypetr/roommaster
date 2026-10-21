package cvut.pm2.backend.service;

import cvut.pm2.backend.dao.UserDao;
import cvut.pm2.backend.dto.request.CreateUserRequestDto;
import cvut.pm2.backend.dto.response.UserResponseDto;
import cvut.pm2.backend.exception.ConflictException;
import cvut.pm2.backend.exception.NotFoundException;
import cvut.pm2.backend.mapper.UserMapper;
import cvut.pm2.backend.model.User;
import cvut.pm2.backend.model.UserRole;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> findAll() {
        return userDao.findAll().stream()
                .map(UserMapper::toDto)
                .toList();
    }

    @Transactional
    public UserResponseDto createUser(CreateUserRequestDto userRequest) {
        if (userDao.findByEmail(userRequest.getEmail()).isPresent()) {
            throw new ConflictException("User already exists");
        }

        User user = UserMapper.toEntity(userRequest);
        if (!isCurrentUserMaintainer()) {
            user.setRole(UserRole.USER);
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userDao.persist(user);
        return UserMapper.toDto(user);
    }

    @Transactional
    public void deleteUser(Long userId) throws NotFoundException {
        User user = userDao.find(userId).orElseThrow(() -> new NotFoundException("User not found"));
        userDao.remove(user);
    }
    @Transactional
    public Optional<User> findByEmail(String email) {
        return userDao.findByEmail(email);
    }
    @Transactional
    public Optional<User> findById(Long id) {
        return userDao.findById(id);
    }

    private boolean isCurrentUserMaintainer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return false;
        }
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_MAINTAINER".equals(authority.getAuthority()));
    }
}
