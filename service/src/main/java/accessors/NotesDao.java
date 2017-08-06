package accessors;

import com.google.common.collect.ImmutableList;
import models.UpdatedNote;
import models.Note;

public interface NotesDao {

    ImmutableList<Note> getNodes(String userId);

    String createNote(String userId);

    void updateNote(String userId, String noteId, UpdatedNote note);

    void deleteNote(String userId, String noteId);
}
