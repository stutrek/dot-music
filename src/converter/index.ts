type Note = {
    pitch: string;
    alter: string;
    octave: string;
    duration: string;
    lyric?: string;
    type: string;
};

function text(node: Element, selector: string) {
    return node.querySelector(selector)?.textContent || '';
}

function partParser(part: Element) {
    // const key = part.querySelector('key fifths')?.textContent;
    const measureNodes = Array.from(part.querySelectorAll('measure'));
    const measures: Note[][] = [];
    for (const measure of measureNodes) {
        const notes: Note[] = [];
        for (let i = 0; i < measure.children.length; i++) {
            const child = measure.children[i];
            if (child.nodeName === 'backup') {
                const value = Number(child.textContent || '0');
                i += value;
                continue;
            }
            if (child.nodeName !== 'note') {
                continue;
            }
            const pitch = text(child, 'pitch step')?.toUpperCase();
            const octave = text(child, 'pitch octave');
            const alter = text(child, 'alter');
            const duration = text(child, 'duration');
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

export function converter(xmlString: string) {
    const doc = new DOMParser().parseFromString(xmlString, 'text/xml') as XMLDocument;
    console.log(doc);
    const parts = Array.from(doc.querySelectorAll('part')).map(partParser);
    return parts;
}
