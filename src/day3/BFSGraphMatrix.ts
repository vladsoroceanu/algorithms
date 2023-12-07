export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    seen[source] = true;
    const q: number[] = [source];

    do {
        const crr = q.shift() as number;

        if (crr === needle) {
            break;
        }

        const adjs = graph[crr];
        for (let i = 0; i < adjs.length; i++) {
            // if there is no edge
            if (adjs[i] === 0) {
                continue;
            }

            if (seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = crr;
            q.push(i);
        }

        seen[crr] = true;
    } while (q.length);

    if (prev[needle] === -1) {
        return null;
    }

    // now build it backwards
    let crr = needle;
    const out: number[] = [];

    console.log("prev", prev);

    while (prev[crr] !== -1) {
        out.push(crr);
        crr = prev[crr];
    }

    return [source].concat(out.reverse());
}
