package models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class NoteId {

    private final String noteId;

    public NoteId(@JsonProperty("noteId") String noteId) {
        this.noteId = noteId;
    }

    public String getNoteId() {
        return noteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NoteId noteId1 = (NoteId) o;
        return Objects.equals(noteId, noteId1.noteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(noteId);
    }

    @Override
    public String toString() {
        return "NoteId{" +
                "noteId='" + noteId + '\'' +
                '}';
    }
}
