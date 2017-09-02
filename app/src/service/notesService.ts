import { RestApplicationClient, HttpClient } from '@src/_generated/service';
import { INote, NoteId } from '@src/model';

type RequestConfig = { method: string; url: string; queryParams?: any; data?: any; };

class HttpClientImpl implements HttpClient {

  constructor(private headers: Headers) {}

  request(requestConfig: RequestConfig): Promise<any> {
    const config = {
      method: requestConfig.method,
      headers: this.headers,
      body: JSON.stringify(requestConfig.data),
    };
    return fetch(`api/${requestConfig.url}`, config)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (response.status === 204) {
          return null;
        }
        return response.json();
      });
  }
}

class NotesService {

  private notesServiceClient: RestApplicationClient;

  constructor(private apiToken: string) {
    const httpClient = new HttpClientImpl(this.getHeaders());
    this.notesServiceClient = new RestApplicationClient(httpClient);
  }

  createNote(): Promise<NoteId> {
    return this.notesServiceClient.createNote()
      .then(noteId => noteId.noteId as NoteId);
  }

  deleteNote(noteId: NoteId): Promise<void> {
    return this.notesServiceClient.deleteNote(noteId);
  }

  getNotes(): Promise<INote[]> {
    return this.notesServiceClient.getNotes()
      .then((notes) => notes as INote[]);
  }

  updateNote(noteId: NoteId, content: string): Promise<void> {
    return this.notesServiceClient.updateNote(noteId, { content });
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.apiToken}`);
    headers.append('Content-Type', 'Application/json');
    return headers;
  }
}

export class NotesServiceProvider {

  private static notesService: NotesService | null = null;
  private static authToken: string | null = null;

  static get(): NotesService {
    if (!NotesServiceProvider.notesService) {
      if (!NotesServiceProvider.authToken) {
        throw new Error('Auth token not set');
      }
      NotesServiceProvider.notesService = new NotesService(NotesServiceProvider.authToken);
    }
    return NotesServiceProvider.notesService;
  }

  static setAuthToken(authToken: string) {
    NotesServiceProvider.authToken = authToken;
    NotesServiceProvider.notesService = new NotesService(authToken);
  }

  static clearAuthToken() {
    NotesServiceProvider.authToken = null;
    NotesServiceProvider.notesService = null;
  }
}
