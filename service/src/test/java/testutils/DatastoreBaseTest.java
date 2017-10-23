package testutils;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Text;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Streams;
import models.Note;
import org.junit.After;
import org.junit.Before;
import org.mockito.Mockito;

import javax.ws.rs.core.SecurityContext;

import java.util.Date;

import static accessors.DatastoreNoteEntity.KIND;
import static accessors.DatastoreNoteEntity.PROP_CONTENT;
import static accessors.DatastoreNoteEntity.PROP_CREATED;
import static accessors.DatastoreNoteEntity.PROP_MODIFIER;
import static accessors.DatastoreNoteEntity.PROP_USER_ID;
import static com.google.common.collect.ImmutableList.toImmutableList;
import static org.mockito.Mockito.when;

public abstract class DatastoreBaseTest {

    private final LocalServiceTestHelper testHelper =
        new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
    private final DatastoreService datastoreService = DatastoreServiceFactory.getDatastoreService();

    @Before
    public void setUp() {
        testHelper.setUp();
    }

    @After
    public void tearDown() {
        testHelper.tearDown();
    }

    public SecurityContext getSecurityContext(String userId) {
        SecurityContext mockSecurityContext = Mockito.mock(SecurityContext.class);
        when(mockSecurityContext.getUserPrincipal()).thenReturn(() -> userId);
        return mockSecurityContext;
    }

    public Entity getNoteEntity(String userId, String content, Date created, Date modified) {
        Entity entity = new Entity(KIND);
        entity.setProperty(PROP_USER_ID, userId);
        entity.setProperty(PROP_CONTENT, new Text(content));
        entity.setProperty(PROP_CREATED, created);
        entity.setProperty(PROP_MODIFIER, modified);
        return entity;
    }

    public ImmutableList<Key> addEntities(ImmutableList<Entity> entities) {
        return ImmutableList.copyOf(datastoreService.put(entities));
    }

    public ImmutableList<Note> toNotes(ImmutableList<Key> keys, ImmutableList<Entity> entities) {
        return Streams.zip(keys.stream(), entities.stream(), (key, entity) -> new Note(
                    String.valueOf(key.getId()),
                    ((Text) entity.getProperty(PROP_CONTENT)).getValue(),
                    (Date) entity.getProperty(PROP_CREATED),
                    (Date) entity.getProperty(PROP_MODIFIER)))
                .collect(toImmutableList());
    }

    public Entity getEntity(String stringKey) throws EntityNotFoundException {
        Key key = KeyFactory.createKey(KIND, Long.valueOf(stringKey));
        return datastoreService.get(key);
    }

    public boolean hasEntity(String stringKey) {
        try {
            getEntity(stringKey);
            return true;
        } catch (EntityNotFoundException e) {
            return false;
        }
    }
}
