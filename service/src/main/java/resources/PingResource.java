package resources;

import javax.ws.rs.core.Response;

public class PingResource implements api.PingResource {

    @Override
    public Response ping() {
        return Response.ok("ok").build();
    }
}
