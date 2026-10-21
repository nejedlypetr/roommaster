package cvut.pm2.backend.security;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

/**
 * Service to manage blacklisted JWT tokens.
 */
@Service
public class TokenBlacklistService {
    // ConcurrentMap to store blacklisted tokens and their expiration dates
    private final ConcurrentMap<String, Date> blacklist = new ConcurrentHashMap<>();

    /**
     * Adds a token to the blacklist with its expiration date.
     *
     * @param token       The JWT token to blacklist.
     * @param expiryDate  The expiration date of the token.
     */
    public void blacklistToken(String token, Date expiryDate) {
        blacklist.put(token, expiryDate);
    }

    /**
     * Checks if a token is blacklisted.
     *
     * @param token The JWT token to check.
     * @return True if the token is blacklisted, false otherwise.
     */
    public boolean isTokenBlacklisted(String token) {
        Date expiryDate = blacklist.get(token);
        if (expiryDate == null) {
            return false;
        }
        // Remove the token from blacklist if it's expired
        if (expiryDate.before(new Date())) {
            blacklist.remove(token);
            return false;
        }
        return true;
    }

    /**
     * Optional: Removes all expired tokens from the blacklist.
     * Can be scheduled to run periodically to clean up the blacklist.
     */
    public void removeExpiredTokens() {
        Date now = new Date();
        Iterator<Map.Entry<String, Date>> it = blacklist.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, Date> entry = it.next();
            if (entry.getValue().before(now)) {
                it.remove();
            }
        }
    }
}
