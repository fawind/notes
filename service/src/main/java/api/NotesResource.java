package api;

import models.UpdatedNote;
import models.Note;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/notes")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface NotesResource {

    @GET
    List<Note> getNotes();

    @POST
    String createNote();

    @Path("/{noteId}")
    @PUT
    Response updateNote(@PathParam("noteId") String noteId, UpdatedNote note);

    @Path("/{noteId}")
    @DELETE
    Response deleteNote(@PathParam("noteId") String noteId);
}
