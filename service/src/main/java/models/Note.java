package models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.Objects;

public class Note {

    private final String id;
    private final String content;
    private final Date created;
    private final Date modified;

    public Note(
            @JsonProperty("id") String id,
            @JsonProperty("content") String content,
            @JsonProperty("created") Date created,
            @JsonProperty("modified") Date modified) {
        this.id = id;
        this.content = content;
        this.created = created;
        this.modified = modified;
    }

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Date getCreated() {
        return created;
    }

    public Date getModified() {
        return modified;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Note note = (Note) o;
        return Objects.equals(id, note.id) &&
                Objects.equals(content, note.content) &&
                Objects.equals(created, note.created) &&
                Objects.equals(modified, note.modified);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, content, created, modified);
    }

    @Override
    public String toString() {
        return "Note{" +
                "id='" + id + '\'' +
                ", content='" + content + '\'' +
                ", created=" + created +
                ", modified=" + modified +
                '}';
    }
}
