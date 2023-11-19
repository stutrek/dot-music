export type Note = {
    pitch: string;
    alter: number;
    octave: number;
    duration: number;
    lyric?: string;
    type: string;
};

export type Part = {
    id: string;
    name: string;
    measures: Note[][];
};

export type Composition = ReturnType<typeof converter>;

function text(node: Element | XMLDocument, selector: string) {
    return node.querySelector(selector)?.textContent || '';
}

function getMeasuresFromPart(part: Element) {
    // const key = part.querySelector('key fifths')?.textContent;
    const measureNodes = Array.from(part.querySelectorAll('measure'));
    const measures: Note[][] = [];
    let divisions = 1;
    for (const measure of measureNodes) {
        const measureDivisions = text(measure, 'attributes divisions');
        if (measureDivisions) {
            divisions = Number(measureDivisions);
        }
        const notes: Note[] = [];
        for (let i = 0; i < measure.children.length; i++) {
            const child = measure.children[i];
            if (child.nodeName === 'backup') {
                break;
            }
            if (child.nodeName !== 'note') {
                continue;
            }
            const pitch = text(child, 'pitch step')?.toUpperCase();
            const octave = Number(text(child, 'pitch octave'));
            const alter = Number(text(child, 'alter'));
            const duration = Number(text(child, 'duration')) / divisions;
            const type = text(child, 'type');
            const lyric = text(child, 'lyric text') || undefined;
            notes.push({
                pitch,
                alter,
                octave,
                duration,
                type,
                lyric,
                //@ts-ignore
                child,
            });
        }
        measures.push(notes);
    }
    return measures;
}

function getParts(doc: XMLDocument): Part[] {
    const partElements = Array.from(doc.querySelectorAll('part-list score-part'));
    console.log(partElements);
    const parts = partElements.map((partElement) => {
        const id = partElement.id;
        const measures = doc.querySelector(`part#${id}`);
        console.log({ measures });
        return {
            id,
            name: text(partElement, 'part-name'),
            measures: measures ? getMeasuresFromPart(measures) : [],
        };
    });
    return parts;
}

export function converter(xmlString: string) {
    const doc = new DOMParser().parseFromString(xmlString, 'text/xml') as XMLDocument;
    const title = text(doc, 'work-title') || 'Untitled';
    const composer = text(doc, 'creator[type="composer"]') || 'Unknown Composer';
    return {
        title,
        composer,
        parts: getParts(doc),
    };
}
