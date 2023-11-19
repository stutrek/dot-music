'use client';

import { converter } from '@/converter';
import { wheelsOnBus } from '@/converter/samples/wheels';

import { aveMaria } from '@/converter/samples/aveMaria';
import { mario } from '@/converter/samples/mario';
import { Music } from '@/components/music/music';
import { useMemo, useState } from 'react';

import styles from './song.module.css';

export default function Parser() {
    const [shift, setShift] = useState(0);
    const composition = useMemo(() => converter(wheelsOnBus), []);
    return (
        <>
            <div className={styles.header}>
                <h3>{composition.title}</h3>
                <button onClick={() => setShift(shift - 1)}>-</button>
                {shift}
                <button onClick={() => setShift(shift + 1)}>+</button>
            </div>
            <Music parts={composition.parts} shift={shift} />
        </>
    );
}
