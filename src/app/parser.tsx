'use client';

import { converter } from '@/converter';
import { wheelsOnBus } from '@/converter/samples/wheels';

import styles from './parser.module.css';
import { Fragment } from 'react';
import { aveMaria } from '@/converter/samples/aveMaria';
import { mario } from '@/converter/samples/mario';

function alterToString(alter?: string | null) {
    if (alter === '-1') {
        return 'b'; // return '♭'; this prints weird
    }
    if (alter === '1') {
        return '#'; // this prints weird return '♯';
    }
    return '';
}

export function Parser() {
    const parts = converter(wheelsOnBus);
    console.log(parts);
    return (
        <div className={styles.notes}>
            {parts.map((measures, i) => {
                <h3>Part {i + 1}</h3>;
                return (
                    <div key={i}>
                        {measures.map((notes, i) => {
                            return (
                                <div key={i} className={styles.measure}>
                                    {notes.map((note, i) => (
                                        <Fragment key={i}>
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
                                                    <span className={styles.pitch}>
                                                        {note.pitch}
                                                        {alterToString(note.alter)}
                                                        {note.octave}
                                                    </span>
                                                </span>
                                                {note.lyric}
                                            </span>
                                        </Fragment>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
