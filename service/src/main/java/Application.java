import accessors.DatastoreNotesDao;
import accessors.NotesDao;
import auth.AuthenticationFilter;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.common.collect.ImmutableList;
import com.google.inject.Binder;
import com.google.inject.Module;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import exceptions.DefaultExceptionMapper;
import resources.NotesResource;
import resources.PingResource;

import java.util.ResourceBundle;

public class Application extends javax.ws.rs.core.Application implements Module {

    private final static String AUTH_PROPERTIES = "auth";
    private final static String CLIENT_ID_KEY = "clientId";

    public Application() {}

    @Override
    public void configure(Binder binder) {
        binder.bind(DefaultExceptionMapper.class);
        binder.bind(AuthenticationFilter.class);
        binder.bind(NotesDao.class).to(DatastoreNotesDao.class);
        binder.bind(PingResource.class);
        binder.bind(NotesResource.class);
    }

    @Provides
    @Singleton
    public DatastoreService datastoreServiceProvider() {
        return DatastoreServiceFactory.getDatastoreService();
    }

    @Provides
    @Singleton
    public GoogleIdTokenVerifier googleIdTokenVerifierProvider() {
        return new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(ImmutableList.of(getClientId()))
                .build();
    }

    private String getClientId() {
        return ResourceBundle.getBundle(AUTH_PROPERTIES).getString(CLIENT_ID_KEY);
    }
}
