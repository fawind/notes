package resources;

import accessors.DatastoreNotesDao;
import accessors.NotesDao;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Ordering;
import models.Note;
import models.UpdatedNote;
import org.jukito.JukitoModule;
import org.jukito.JukitoRunner;
import org.junit.Test;
import org.junit.runner.RunWith;
import testutils.DatastoreBaseTest;

import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import java.util.Comparator;
import java.util.Date;

import static accessors.DatastoreNoteEntity.PROP_CONTENT;
import static accessors.DatastoreNoteEntity.PROP_CREATED;
import static accessors.DatastoreNoteEntity.PROP_MODIFIER;
import static accessors.DatastoreNoteEntity.PROP_USER_ID;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@RunWith(JukitoRunner.class)
public class NotesResourceTest extends DatastoreBaseTest {

    public static class Module extends JukitoModule {
        @Override
        protected void configureTest() {
            bind(DatastoreService.class).toInstance(DatastoreServiceFactory.getDatastoreService());
            bind(NotesDao.class).to(DatastoreNotesDao.class);
        }
    }

    private final Ordering<Note> modifiedOrdering =
            Ordering.from(Comparator.comparing(Note::getModified)).reverse();

    @Inject private NotesResource notesResource;

    @Test
    public void whenGetNotes_thenReturnNotesForUserId() {
        // GIVEN
        String userIdA = "userIdA";
        String userIdB = "userIdB";
        String userIdC = "userIdC";
        Entity noteA = getNoteEntity(userIdA, "contentA", new Date(1502554271600L), new Date(1502554271600L));
        Entity noteB = getNoteEntity(userIdA, "contentB", new Date(1502554271601L), new Date(1502554271601L));
        Entity noteC = getNoteEntity(userIdA, "contentC", new Date(1502554271602L), new Date(1502554271602L));
        Entity noteD = getNoteEntity(userIdB, "contentD", new Date(1502554271603L), new Date(1502554271603L));
        Entity noteE = getNoteEntity(userIdB, "contentE", new Date(1502554271604L), new Date(1502554271604L));

        ImmutableList<Entity> userAEntities = ImmutableList.of(noteA, noteB, noteC);
        ImmutableList<Key> userAKeys = addEntities(userAEntities);
        ImmutableList<Note> userAExpectedNotes =
                modifiedOrdering.immutableSortedCopy(toNotes(userAKeys, userAEntities));

        ImmutableList<Entity> userBEntities = ImmutableList.of(noteD, noteE);
        ImmutableList<Key> userBKeys = addEntities(userBEntities);
        ImmutableList<Note> userBExpectedNotes =
                modifiedOrdering.immutableSortedCopy(toNotes(userBKeys, userBEntities));

        // WHEN
        ImmutableList<Note> notesA = notesResource.getNotes(getSecurityContext(userIdA));
        ImmutableList<Note> notesB = notesResource.getNotes(getSecurityContext(userIdB));
        ImmutableList<Note> notesC = notesResource.getNotes(getSecurityContext(userIdC));

        // THEN
        assertThat(notesA).isEqualTo(userAExpectedNotes);
        assertThat(notesB).isEqualTo(userBExpectedNotes);
        assertThat(notesC).isEmpty();
    }

    @Test
    public void whenCreateNote_thenInsertNewNoteInDatastore() throws EntityNotFoundException {
        // GIVEN
        String userId = "userIdA";

        // WHEN
        String noteId = notesResource.createNote(getSecurityContext(userId)).getNoteId();

        // THEN
        Entity newNote = getEntity(noteId);
        assertThat((String) newNote.getProperty(PROP_USER_ID)).isEqualTo(userId);
        assertThat((String) newNote.getProperty(PROP_CONTENT)).isEqualTo("");
        assertThat((Date) newNote.getProperty(PROP_CREATED)).isNotNull();
        assertThat((Date) newNote.getProperty(PROP_MODIFIER)).isNotNull();
    }

    @Test
    public void givenNewlyCreatedNote_whenGetNotes_thenAlsoReturnNewNote() {
        // GIVEN
        String userId = "userIdA";
        Entity noteA = getNoteEntity(userId, "contentA", new Date(1502554271600L), new Date(1502554271600L));
        Entity noteB = getNoteEntity(userId, "contentB", new Date(1502554271601L), new Date(1502554271601L));
        Entity noteC = getNoteEntity(userId, "contentC", new Date(1502554271602L), new Date(1502554271602L));

        ImmutableList<Entity> existingNotes = ImmutableList.of(noteA, noteB, noteC);
        ImmutableList<Key> existingKeys = addEntities(existingNotes);
        ImmutableList<Note> expectedExistingNotes =
                modifiedOrdering.immutableSortedCopy(toNotes(existingKeys, existingNotes));

        // WHEN
        String newNoteId = notesResource.createNote(getSecurityContext(userId)).getNoteId();
        ImmutableList<Note> notes = notesResource.getNotes(getSecurityContext(userId));

        // THEN
        assertThat(notes).hasSize(4);
        assertThat(notes.get(0).getId()).isEqualTo(newNoteId);
        assertThat(notes.get(0).getContent()).isEqualTo("");
        assertThat(notes.get(0).getCreated()).isNotNull();
        assertThat(notes.get(0).getModified()).isNotNull();
        assertThat(notes.subList(1, notes.size()))
                .isEqualTo(expectedExistingNotes);
    }

    @Test
    public void givenValidId_whenUpdateNote_thenUpdateNoteInDatastore() throws EntityNotFoundException {
        // GIVEN
        String userId = "userIdA";
        Entity oldEntity = getNoteEntity(userId, "contentB", new Date(1502554271601L), new Date(1502554271601L));
        String noteId = String.valueOf(addEntities(ImmutableList.of(oldEntity)).get(0).getId());

        // WHEN
        UpdatedNote updatedNote = new UpdatedNote("New content");
        notesResource.updateNote(getSecurityContext(userId), noteId, updatedNote);

        // THEN
        Entity updatedEntity = getEntity(noteId);
        assertThat((String) updatedEntity.getProperty(PROP_USER_ID)).isEqualTo(userId);
        assertThat((String) updatedEntity.getProperty(PROP_CONTENT)).isEqualTo(updatedNote.getContent());
        assertThat(updatedEntity.getProperty(PROP_CREATED)).isEqualTo(oldEntity.getProperty(PROP_CREATED));
        assertThat((Date) updatedEntity.getProperty(PROP_MODIFIER)).isAfter((Date) oldEntity.getProperty(PROP_MODIFIER));
    }

    @Test
    public void givenInvalidNoteId_whenUpdateNote_thenThrowNotFoundException() {
        // GIVEN
        String userId = "userA";
        String noteId = "123123";
        UpdatedNote updatedNote = new UpdatedNote("New content");

        // WHEN
        assertThatThrownBy(() -> notesResource.updateNote(getSecurityContext(userId), noteId, updatedNote))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    public void givenNoteIdOfDifferentUser_whenUpdateNote_thenThrowNotFoundException() {
        // GIVEN
        String userIdA = "userA";
        String userIdB = "userB";
        Entity oldEntity = getNoteEntity(userIdB, "contentB", new Date(1502554271601L), new Date(1502554271601L));
        String noteId = String.valueOf(addEntities(ImmutableList.of(oldEntity)).get(0).getId());
        UpdatedNote updatedNote = new UpdatedNote("New content");

        // WHEN
        assertThatThrownBy(() -> notesResource.updateNote(getSecurityContext(userIdA), noteId, updatedNote))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    public void givenUpdatedNote_whenGetNotes_thenReturnUpdatedNote() {
        // GIVEN
        String userId = "userIdA";
        Entity noteA = getNoteEntity(userId, "contentA", new Date(1502554271600L), new Date(1502554271600L));
        Entity noteB = getNoteEntity(userId, "contentB", new Date(1502554271601L), new Date(1502554271601L));
        Entity noteC = getNoteEntity(userId, "contentC", new Date(1502554271602L), new Date(1502554271602L));

        ImmutableList<Entity> existingEntities = ImmutableList.of(noteA, noteB, noteC);
        ImmutableList<Key> existingKeys = addEntities(existingEntities);
        ImmutableList<Note> oldNotes =
                modifiedOrdering.immutableSortedCopy(toNotes(existingKeys, existingEntities));

        String noteId = String.valueOf(existingKeys.get(1).getId());
        UpdatedNote updatedNote = new UpdatedNote("New content");

        // WHEN
        notesResource.updateNote(getSecurityContext(userId), noteId, updatedNote);
        ImmutableList<Note> notes = notesResource.getNotes(getSecurityContext(userId));

        // THEN
        assertThat(notes).hasSize(oldNotes.size());
        assertThat(notes.get(1)).isEqualTo(oldNotes.get(0));
        assertThat(notes.get(2)).isEqualTo(oldNotes.get(2));
        assertThat(notes.get(0).getId()).isEqualTo(noteId);
        assertThat(notes.get(0).getContent()).isEqualTo(updatedNote.getContent());
        assertThat(notes.get(0).getCreated()).isEqualTo(oldNotes.get(1).getCreated());
        assertThat(notes.get(0).getModified()).isAfter(oldNotes.get(1).getModified());
    }

    @Test
    public void givenValidId_whenDeletNote_thenDeleteNoteInDatastore() {
        // GIVEN
        String userId = "userIdA";
        Entity oldEntity = getNoteEntity(userId, "contentB", new Date(1502554271601L), new Date(1502554271601L));
        String noteId = String.valueOf(addEntities(ImmutableList.of(oldEntity)).get(0).getId());

        // WHEN
        notesResource.deleteNote(getSecurityContext(userId), noteId);

        // THEN
        assertThat(hasEntity(noteId)).isFalse();
    }

    @Test
    public void givenInvalidNoteId_whenDeleteNote_thenThrowNotFoundException() {
        // GIVEN
        String userId = "userA";
        String noteId = "123123";

        // WHEN
        assertThatThrownBy(() -> notesResource.deleteNote(getSecurityContext(userId), noteId))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    public void givenNoteIdOfDifferentUser_whenDeleteNote_thenThrowNotFoundException() {
        // GIVEN
        String userIdA = "userA";
        String userIdB = "userB";
        Entity oldEntity = getNoteEntity(userIdB, "contentB", new Date(1502554271601L), new Date(1502554271601L));
        String noteId = String.valueOf(addEntities(ImmutableList.of(oldEntity)).get(0).getId());

        // WHEN
        assertThatThrownBy(() -> notesResource.deleteNote(getSecurityContext(userIdA), noteId))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    public void givenDeleteNote_whenGetNotes_thenDeletedNoteIsNotReturned() {
        // GIVEN
        String userId = "userIdA";
        Entity noteA = getNoteEntity(userId, "contentA", new Date(1502554271600L), new Date(1502554271600L));
        Entity noteB = getNoteEntity(userId, "contentB", new Date(1502554271601L), new Date(1502554271601L));
        Entity noteC = getNoteEntity(userId, "contentC", new Date(1502554271602L), new Date(1502554271602L));

        ImmutableList<Entity> existingEntities = ImmutableList.of(noteA, noteB, noteC);
        ImmutableList<Key> existingKeys = addEntities(existingEntities);
        ImmutableList<Note> oldNotes =
                modifiedOrdering.immutableSortedCopy(toNotes(existingKeys, existingEntities));

        String noteId = String.valueOf(existingKeys.get(1).getId());

        // WHEN
        notesResource.deleteNote(getSecurityContext(userId), noteId);
        ImmutableList<Note> notes = notesResource.getNotes(getSecurityContext(userId));

        // THEN
        assertThat(notes).hasSize(2);
        assertThat(notes.get(0)).isEqualTo(oldNotes.get(0));
        assertThat(notes.get(1)).isEqualTo(oldNotes.get(2));
    }
}
