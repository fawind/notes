package auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import org.jukito.JukitoModule;
import org.jukito.JukitoRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;

import javax.inject.Inject;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.HttpHeaders;

import static java.lang.String.format;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@RunWith(JukitoRunner.class)
public class AuthenticationFilterTest {

    public static class Module extends JukitoModule {
        @Override
        protected void configureTest() {
            bind(GoogleIdTokenVerifier.class).toInstance(Mockito.mock(GoogleIdTokenVerifier.class));
        }
    }

    @Inject private AuthenticationFilter authFilter;

    @Test
    public void givenInvalidAuthHeader_thenThrowNotAuthorizedException(GoogleIdTokenVerifier tokenVerifier) {
        // GIVEN
        ContainerRequestContext requestContext = Mockito.mock(ContainerRequestContext.class);
        when(requestContext.getHeaderString(HttpHeaders.AUTHORIZATION)).thenReturn("my token");

        // WHEN, THEN
        assertThatThrownBy(() -> authFilter.filter(requestContext))
                .isInstanceOf(NotAuthorizedException.class);
    }

    @Test
    public void givenInvalidToken_thenThrowNotAuthorizedException(GoogleIdTokenVerifier tokenVerifier) throws Exception{
        // GIVEN
        String token = "mysecrettoken";
        ContainerRequestContext requestContext = Mockito.mock(ContainerRequestContext.class);
        when(requestContext.getHeaderString(HttpHeaders.AUTHORIZATION))
                .thenReturn(format("Bearer %s", token));
        when(tokenVerifier.verify(token)).thenThrow(new RuntimeException("Invalid token"));

        // WHEN, THEN
        assertThatThrownBy(() -> authFilter.filter(requestContext))
                .isInstanceOf(NotAuthorizedException.class);
    }
}
