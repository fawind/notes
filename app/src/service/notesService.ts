import { RestApplicationClient, HttpClient } from '../../../service/build/typescript/service';
import { INote, NoteId } from '@src/model';

type RequestConfig = { method: string; url: string; queryParams?: any; data?: any; };

class HttpClientImpl implements HttpClient {

  constructor(private headers: Headers) {}

  request(requestConfig: RequestConfig): Promise<any> {
    const config = {
      method: requestConfig.method,
      headers: this.headers,
      body: requestConfig.data,
    };
    return fetch(requestConfig.url, config);
  }
}

export class NotesService {

  private notesServiceClient: RestApplicationClient;

  constructor(private apiToken: string) {
    this.updateApiToken(apiToken);
  }

  updateApiToken(apiToken: string) {
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

  getNotes(noteId: NoteId): Promise<INote[]> {
    return this.notesServiceClient.getNotes()
      .then(notes => notes as INote[]);
  }

  updateNote(noteId: NoteId, content: string): Promise<void> {
    return this.notesServiceClient.updateNote(noteId, { content });
  }

  private getHeaders(): Headers {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.apiToken}`);
    return headers;
  }
}
