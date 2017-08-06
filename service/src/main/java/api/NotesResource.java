package api;

import auth.Secured;
import models.Note;
import models.UpdatedNote;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

@Secured
@Path("/notes")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface NotesResource {

    @GET
    List<Note> getNotes(@Context SecurityContext securityContext);

    @POST
    String createNote(@Context SecurityContext securityContext);

    @Path("{noteId}")
    @PUT
    void updateNote(
            @Context SecurityContext securityContext,
            @PathParam("noteId") String noteId,
            UpdatedNote note);

    @Path("{noteId}")
    @DELETE
    void deleteNote(
            @Context SecurityContext securityContext,
            @PathParam("noteId") String noteId);
}
