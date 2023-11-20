import { converter } from '@/converter';
import { wheelsOnBus } from '@/converter/samples/wheels';

import { aveMaria } from '@/converter/samples/aveMaria';
import { mario } from '@/converter/samples/mario';
import { useMemo } from 'react';

import { CompositionView } from '@/components/music/composition';

export default function Parser() {
    const composition = useMemo(() => converter(wheelsOnBus), []);
    return <CompositionView composition={composition} />;
}
