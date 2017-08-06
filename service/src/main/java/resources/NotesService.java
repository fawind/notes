package resources;

import accessors.NotesDao;
import api.NotesResource;
import com.google.common.collect.ImmutableList;
import models.UpdatedNote;
import models.Note;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

public class NotesService implements NotesResource {

    private final NotesDao notesDao;

    @Inject
    public NotesService(NotesDao notesDao) {
        this.notesDao = notesDao;
    }

    @Override
    public ImmutableList<Note> getNotes() {
        return null;
    }

    @Override
    public String createNote() {
        return null;
    }

    @Override
    public Response updateNote(String noteId, UpdatedNote note) {
        return null;
    }

    @Override
    public Response deleteNote(String noteId) {
        return null;
    }
}
