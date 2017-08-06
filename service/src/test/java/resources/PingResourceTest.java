package resources;

import com.google.inject.Inject;
import org.jukito.JukitoRunner;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.ws.rs.core.Response;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(JukitoRunner.class)
public class PingResourceTest {

    @Inject private PingResource resource;

    @Test
    public void whenInvoked_thenReturnSuccessfulResponse() {
        // WHEN
        Response response = resource.ping();

        // THEN
        assertThat(response.getStatus()).isEqualTo(200);
    }
}
