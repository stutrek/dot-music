import { Composition, Note, Part } from '@/converter';
import styles from './music.module.css';
import { FC, Fragment } from 'react';
import { Midi } from 'tonal';

function alterToString(alter?: number | null) {
    if (alter === -1) {
        return 'b'; // return '♭'; this prints weird
    }
    if (alter === 1) {
        return '#'; // this prints weird return '♯';
    }
    return '';
}

const Note: FC<{ note: Note; shift: number }> = ({ note, shift }) => {
    console.log(note);
    let noteString = note.pitch + alterToString(note.alter) + (note.octave || '');
    if (note.pitch && shift) {
        const midi = Midi.toMidi(noteString);
        if (midi) {
            noteString = Midi.midiToNoteName(midi + shift);
        }
    }

    return (
        <span
            className={styles.note}
            style={{
                minWidth: 60 * note.duration,
            }}
        >
            <span
                className={styles.dot}
                data-pitch={note.pitch.toLowerCase()}
                style={{
                    width: 50 * note.duration,
                }}
            >
                <span className={styles.pitch}>{noteString}</span>
            </span>
            {note.lyric}
        </span>
    );
};

export const Music: FC<{ parts: Part[]; shift: number }> = ({ parts, shift }) => {
    return (
        <div className={styles.notes}>
            {parts.map((part, i) => {
                <h3>Part {i + 1}</h3>;
                return (
                    <div key={i}>
                        {part.measures.map((notes, i) => {
                            return (
                                <div key={i} className={styles.measure}>
                                    {notes.map((note, i) => (
                                        <Note key={i} note={note} shift={shift} />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
