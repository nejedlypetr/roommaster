package cvut.pm2.backend.security;

import cvut.pm2.backend.model.User;
import cvut.pm2.backend.security.model.CustomUserDetails;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    /**
     * Gets the currently authenticated user.
     *
     * @return Current user
     */
    public static User getCurrentUser() {
        final CustomUserDetails ud = getCurrentUserDetails();
        if (ud != null)
            return ud.getCustomer();
        return null;
    }

    /**
     * Gets details of the currently authenticated user.
     *
     * @return Currently authenticated user details or null, if no one is currently authenticated
     */
    public static CustomUserDetails getCurrentUserDetails() {
        final SecurityContext context = SecurityContextHolder.getContext();
        if (context.getAuthentication() != null && context.getAuthentication().getPrincipal() instanceof CustomUserDetails) {
            return (CustomUserDetails) context.getAuthentication().getPrincipal();
        } else {
            return null;
        }
    }

    /**
     * Checks whether the current authentication token represents an anonymous user.
     *
     * @return Whether current authentication is anonymous
     */
    public static boolean isAuthenticatedAnonymously() {
        return getCurrentUserDetails() == null;
    }
}