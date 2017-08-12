package accessors;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Streams;
import models.Note;
import models.UpdatedNote;

import javax.inject.Inject;
import java.util.Date;
import java.util.logging.Logger;

import static accessors.DatastoreNoteEntity.KIND;
import static accessors.DatastoreNoteEntity.PROP_CONTENT;
import static accessors.DatastoreNoteEntity.PROP_CREATED;
import static accessors.DatastoreNoteEntity.PROP_MODIFIER;
import static accessors.DatastoreNoteEntity.PROP_USER_ID;
import static com.google.appengine.api.datastore.Query.FilterOperator.EQUAL;
import static com.google.common.collect.ImmutableList.toImmutableList;
import static java.lang.String.format;

public class DatastoreNotesDao implements NotesDao {

    private static Logger log = Logger.getLogger(DatastoreNotesDao.class.getName());

    private final DatastoreService datastoreService;

    @Inject
    public DatastoreNotesDao(DatastoreService datastoreService) {
        this.datastoreService = datastoreService;
    }

    @Override
    public ImmutableList<Note> getNodes(String userId) {
        Query query = new Query(KIND)
                .setFilter(new Query.FilterPredicate(PROP_USER_ID, EQUAL, userId))
                .addSort(PROP_MODIFIER, Query.SortDirection.DESCENDING);
        PreparedQuery preparedQuery = datastoreService.prepare(query);
        return Streams.stream(preparedQuery.asIterator())
                .map(this::getNoteFromEntity)
                .collect(toImmutableList());
    }

    @Override
    public String createNote(String userId) {
        Entity newEntity = new Entity(KIND);
        newEntity.setProperty(PROP_USER_ID, userId);
        newEntity.setProperty(PROP_CONTENT, "");
        newEntity.setProperty(PROP_CREATED, new Date());
        newEntity.setProperty(PROP_MODIFIER, new Date());
        Key key = datastoreService.put(newEntity);
        return String.valueOf(key.getId());
    }

    @Override
    public void updateNote(String userId, String noteId, UpdatedNote note) {
        Key key = KeyFactory.createKey(KIND, Long.valueOf(noteId));
        try {
            Entity entity = datastoreService.get(key);
            String ownerId = (String) entity.getProperty(PROP_USER_ID);
            if (!ownerId.equals(userId)) {
                log.severe(format(
                        "User %s tried to update note %s of user %s", userId, noteId, ownerId));
                throw new EntityNotFoundException(key);
            }
            entity.setProperty(PROP_CONTENT, note.getContent());
            entity.setProperty(PROP_MODIFIER, new Date());
            datastoreService.put(entity);
        } catch (EntityNotFoundException e) {
            throw new IllegalArgumentException(
                    format("No note found for userId %s and noteId %s", userId, noteId));
        }

    }

    @Override
    public void deleteNote(String userId, String noteId) {
        Key key = KeyFactory.createKey(KIND, Long.valueOf(noteId));
        try {
            Entity entity = datastoreService.get(key);
            String ownerId = (String) entity.getProperty(PROP_USER_ID);
            if (!ownerId.equals(userId)) {
                log.severe(format(
                        "User %s tried to delete note %s of user %s", userId, noteId, ownerId));
                throw new EntityNotFoundException(key);
            }
            datastoreService.delete(key);
        } catch (EntityNotFoundException e) {
            throw new IllegalArgumentException(
                    format("No note found for userId %s and noteId %s", userId, noteId));
        }
    }

    private Note getNoteFromEntity(Entity entity) {
        return new Note(
                String.valueOf(entity.getKey().getId()),
                (String) entity.getProperty(PROP_CONTENT),
                (Date) entity.getProperty(PROP_CREATED),
                (Date) entity.getProperty(PROP_MODIFIER));
    }
}
