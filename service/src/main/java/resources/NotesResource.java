package resources;

import accessors.NotesDao;
import api.NotesService;
import com.google.common.collect.ImmutableList;
import models.Note;
import models.NoteId;
import models.UpdatedNote;

import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.SecurityContext;

public class NotesResource implements NotesService {

    private final NotesDao notesDao;

    @Inject
    public NotesResource(NotesDao notesDao) {
        this.notesDao = notesDao;
    }

    @Override
    public ImmutableList<Note> getNotes(SecurityContext securityContext) {
        return notesDao.getNotes(getUserId(securityContext));
    }

    @Override
    public NoteId createNote(SecurityContext securityContext) {
        return new NoteId(notesDao.createNote(getUserId(securityContext)));
    }

    @Override
    public void updateNote(SecurityContext securityContext, String noteId, UpdatedNote note) {
        try {
            notesDao.updateNote(getUserId(securityContext), noteId, note);
        } catch (IllegalArgumentException e) {
            throw new NotFoundException(e.getMessage());
        }
    }

    @Override
    public void deleteNote(SecurityContext securityContext, String noteId) {
        try {
            notesDao.deleteNote(getUserId(securityContext), noteId);
        } catch (IllegalArgumentException e) {
            throw new NotFoundException(e.getMessage());
        }
    }

    private String getUserId(SecurityContext securityContext) {
        return securityContext.getUserPrincipal().getName();
    }
}
