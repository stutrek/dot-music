'use client';

import type { Composition } from '@/converter';
import { Measures } from '@/components/music/measures';
import { FC, useState } from 'react';

import styles from './composition.module.css';

export const CompositionView: FC<{ composition: Composition }> = ({ composition }) => {
    const [shift, setShift] = useState(0);
    return (
        <>
            <div className={styles.header}>
                <h3>{composition.title}</h3>
                <button onClick={() => setShift(shift - 1)}>-</button>
                {shift}
                <button onClick={() => setShift(shift + 1)}>+</button>
            </div>
            <Measures parts={composition.parts} shift={shift} />
        </>
    );
};
