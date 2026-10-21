package cvut.pm2.backend.exception;

public class RoomNotAvailableException extends AbstractException {
    public RoomNotAvailableException(String message) {
        super(message);
    }

    public RoomNotAvailableException(String message, Throwable cause) {
        super(message, cause);
    }

    public RoomNotAvailableException(Throwable cause) {
        super(cause);
    }
}
