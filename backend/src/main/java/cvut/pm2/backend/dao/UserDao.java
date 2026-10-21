package cvut.pm2.backend.dao;

import cvut.pm2.backend.model.User;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserDao extends BaseDao<User> {
    public UserDao() {
        super(User.class);
    }

    /**
     * Finds a user by their email.
     *
     * @param email The email of the user.
     * @return An Optional containing the User if found, or empty otherwise.
     */
    public Optional<User> findByEmail(String email) {
        String jpql = "SELECT u FROM User u WHERE u.email = :email";
        return em.createQuery(jpql, User.class) // Corrected to use 'em'
                .setParameter("email", email)
                .getResultStream()
                .findFirst();
    }

    /**
     * Finds a user by their ID.
     *
     * @param id The ID of the user.
     * @return An Optional containing the User if found, or empty otherwise.
     */
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(em.find(User.class, id)); // Corrected to use 'em'
    }
}
