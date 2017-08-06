package accessors;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.Entity;
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

import static com.google.common.collect.ImmutableList.toImmutableList;

public class DatastoreNotesDao implements NotesDao {

    private static final String NOTE_KIND = "NOTE_V01";
    private static final String PROP_USER_ID = "userId";
    private static final String PROP_CONTENT = "content";
    private static final String PROP_CREATED = "created";
    private static final String PROP_MODIFIER = "modified";

    private final DatastoreService datastoreService;

    @Inject
    public DatastoreNotesDao(DatastoreService datastoreService) {
        this.datastoreService = datastoreService;
    }

    @Override
    public ImmutableList<Note> getNodes(String userId) {
        Query query = new Query(NOTE_KIND)
                .addSort(PROP_MODIFIER, Query.SortDirection.DESCENDING);
        PreparedQuery preparedQuery = datastoreService.prepare(query);
        return Streams.stream(preparedQuery.asIterator())
                .map(this::getNoteFromEntity)
                .collect(toImmutableList());
    }

    @Override
    public String createNote(String userId) {
        Entity newEntity = new Entity(NOTE_KIND);
        newEntity.setProperty(PROP_USER_ID, userId);
        newEntity.setProperty(PROP_CONTENT, "");
        newEntity.setProperty(PROP_CREATED, new Date());
        newEntity.setProperty(PROP_MODIFIER, new Date());
        Key key = datastoreService.put(newEntity);
        return String.valueOf(key.getId());
    }

    @Override
    public void updateNote(String userId, String noteId, UpdatedNote note) {
        Key key = KeyFactory.createKey(NOTE_KIND, Long.valueOf(noteId));
        Entity updatedEntity = new Entity(key);
        updatedEntity.setProperty(PROP_CONTENT, note.getContent());
        updatedEntity.setProperty(PROP_MODIFIER, new Date());
        datastoreService.put(updatedEntity);
    }

    @Override
    public void deleteNote(String userId, String noteId) {
        Key key = KeyFactory.createKey(NOTE_KIND, Long.valueOf(noteId));
        datastoreService.delete(key);
    }

    private Note getNoteFromEntity(Entity entity) {
        return new Note(
                String.valueOf(entity.getKey().getId()),
                (String) entity.getProperty(PROP_CONTENT),
                (Date) entity.getProperty(PROP_CREATED),
                (Date) entity.getProperty(PROP_MODIFIER));
    }
}
