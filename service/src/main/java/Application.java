import accessors.DatastoreNotesDao;
import accessors.NotesDao;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.inject.Binder;
import com.google.inject.Module;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import resources.NotesService;
import resources.PingService;

public class Application extends javax.ws.rs.core.Application implements Module {

    @Override
    public void configure(Binder binder) {
        binder.bind(NotesDao.class).to(DatastoreNotesDao.class).in(Singleton.class);

        binder.bind(PingService.class).in(Singleton.class);
        binder.bind(NotesService.class).in(Singleton.class);
    }

    @Provides
    @Singleton
    DatastoreService datastoreServiceProvider() {
        return DatastoreServiceFactory.getDatastoreService();
    }
}
