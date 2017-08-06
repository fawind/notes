import com.google.inject.Binder;
import com.google.inject.Module;
import com.google.inject.Singleton;
import resources.PingResource;

public class Application extends javax.ws.rs.core.Application implements Module {

    @Override
    public void configure(Binder binder) {
        binder.bind(PingResource.class).in(Singleton.class);
    }
}
