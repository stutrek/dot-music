function text(node: Element, selector: string) {
    return node.querySelector(selector)?.textContent;
}

function partParser(part: Element) {
    const key = part.querySelector('key fifths')?.textContent;
    const notes = Array.from(part.querySelectorAll('note'))
        .filter((note) => !!text(note, 'lyric'))
        .map((note) => {
            const pitch = text(note, 'pitch step')?.toLowerCase();
            const octave = text(note, 'pitch octave');
            const duration = text(note, 'duration');
            const lyric = text(note, 'lyric text');
            return {
                pitch,
                octave,
                duration,
                lyric,
            };
        });
    return notes;
}

export function converter(xmlString: string) {
    const doc = new DOMParser().parseFromString(xmlString, 'text/xml') as XMLDocument;
    console.log(doc);
    const notes = partParser(doc.querySelectorAll('part')[0]);
    return notes;
}
