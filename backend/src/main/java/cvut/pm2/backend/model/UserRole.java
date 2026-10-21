package cvut.pm2.backend.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * Defines user roles and their corresponding authorities.
 */
public enum UserRole {
    USER,
    MAINTAINER;

    /**
     * Converts the role to a GrantedAuthority.
     *
     * @return the granted authority corresponding to the role
     */
    public GrantedAuthority getGrantedAuthority() {
        return new SimpleGrantedAuthority("ROLE_" + this.name());
    }
}
