'use client';

import { converter } from '@/converter';
import { wheelsOnBus } from '@/converter/samples/wheels';

import styles from './parser.module.css';
import { Fragment } from 'react';
import { aveMaria } from '@/converter/samples/aveMaria';

export function Parser() {
    const notes = converter(aveMaria);

    console.log(notes);

    return (
        <div className={styles.notes}>
            {notes.map((note, i) => (
                <Fragment key={i}>
                    <span
                        data-pitch={note.pitch}
                        data-octave={note.octave}
                        data-note={note.pitch! + note.octave!}
                        data-duration={note.duration}
                        className={`${styles[note.pitch!]} ${styles.note}`}
                        style={{
                            minWidth: 40,
                        }}
                    >
                        {note.lyric}
                    </span>
                </Fragment>
            ))}
        </div>
    );
}
