package cvut.pm2.backend.exception;

public class ReservationAlreadyCancelledException extends AbstractException {
    public ReservationAlreadyCancelledException(String message) {
        super(message);
    }

    public ReservationAlreadyCancelledException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReservationAlreadyCancelledException(Throwable cause) {
        super(cause);
    }
}
