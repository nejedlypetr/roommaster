package cvut.pm2.backend.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Utility class for creating loggers.
 */
public class LoggerUtil {

    public static <T> Logger getLogger(Class<T> clazz) {
        return LoggerFactory.getLogger(clazz);
    }
}
