package cvut.pm2.backend.exception;

import cvut.pm2.backend.util.LoggerUtil;
import jakarta.validation.ConstraintViolationException;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerUtil.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        // Check if the exception is related to authentication
        if (e.getMessage() != null && e.getMessage().contains("Unauthorized")) {
            logger.warn("Unauthorized access attempt: {}", e.getMessage());
            return new ResponseEntity<String>("Unauthorized: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        logger.error("An unexpected error occurred", e);
        return new ResponseEntity<String>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException e) {
        logger.warn("Resource not found");
        return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PersistenceException.class)
    public ResponseEntity<String> handlePersistenceException(PersistenceException e) {
        logger.error("A persistence error occurred", e);
        return new ResponseEntity<String>("A database error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RoomNotAvailableException.class)
    public ResponseEntity<String> handleRoomNotAvailableException(RoomNotAvailableException e) {
        logger.warn("Room not available");
        return new ResponseEntity<String>("Room not available", HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<List<String>> handleValidationExceptions(ConstraintViolationException ex) {
        logger.warn("Validation error");
        List<String> errors = ex.getConstraintViolations()
                .stream()
                .map(violation -> violation.getMessage())
                .toList();

        return new ResponseEntity<List<String>>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<List<String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        logger.warn("Validation error");
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .toList();

        return new ResponseEntity<List<String>>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ReservationAlreadyCancelledException.class)
    public ResponseEntity<String> handleReservationAlreadyCancelledException(ReservationAlreadyCancelledException e) {
        logger.warn("Reservation already cancelled");
        return new ResponseEntity<String>("Reservation already cancelled", HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<String> handleConflictException(ConflictException e) {
        logger.warn("Conflict");
        return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatchExceptions(MethodArgumentTypeMismatchException ex) {
        logger.warn("Type mismatch error");
        String error = String.format("Parameter '%s' with value '%s' could not be converted to type '%s'.",
                ex.getName(),
                ex.getValue(),
                ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "unknown");

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

}
