package models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class UpdatedNote {

    private final String content;

    public UpdatedNote(@JsonProperty("content") String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UpdatedNote newNote = (UpdatedNote) o;
        return Objects.equals(content, newNote.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(content);
    }

    @Override
    public String toString() {
        return "NewNote{" +
                "content='" + content + '\'' +
                '}';
    }
}
