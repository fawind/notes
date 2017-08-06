package exceptions;

import javax.inject.Singleton;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.logging.Logger;

import static com.google.common.base.Throwables.getStackTraceAsString;
import static java.lang.String.format;

@Provider
@Singleton
public class DefaultExceptionMapper implements ExceptionMapper<Throwable> {

    private static Logger log = Logger.getLogger(DefaultExceptionMapper.class.getName());

    @Override
    public Response toResponse(Throwable exception) {
        if (exception instanceof WebApplicationException) {
            return ((WebApplicationException) exception).getResponse();
        }
        log.severe(format("Unhandled exception: %s - Stacktrace: %s", exception.getMessage(),
                getStackTraceAsString(exception)));
        return Response.status(500).build();
    }
}

