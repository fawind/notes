import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.webapp.WebAppContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JettyRunner {

    private static final Logger logger = LoggerFactory.getLogger(JettyRunner.class);

    private final static String WEB_XML = "src/main/webapp/WEB-INF/web.xml";
    private final static String RESOURCE_BASE = "src/main/webapp";
    private final static Integer DEFAULT_PORT = 8080;

    public static void main(String[] args) throws Exception {
        int port = Integer.valueOf(System.getProperty("port", DEFAULT_PORT.toString()));
        Server server = new Server(port);
        WebAppContext context = new WebAppContext();

        context.setDescriptor(WEB_XML);
        context.setResourceBase(RESOURCE_BASE);
        context.setContextPath("/");
        context.setParentLoaderPriority(true);
        context.setLogUrlOnStart(true);

        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setResourceBase(RESOURCE_BASE);
        resourceHandler.setWelcomeFiles(new String[]{ "index.html" });
        resourceHandler.setDirectoriesListed(true);

        HandlerList handlers = new HandlerList();
        handlers.setHandlers(new Handler[] { resourceHandler, context });
        server.setHandler(handlers);

        server.start();
        logger.info("Server started on: http://localhost:{}", port);
        server.join();
    }
}
