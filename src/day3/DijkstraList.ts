function hasUnvisited(seen: boolean[], dists: number[]): boolean {
    return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) {
            continue;
        }

        if (lowestDistance > dists[i]) {
            lowestDistance = dists[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(
    source: number, // where we start from
    sink: number, // where we want to go to
    edges: WeightedAdjacencyList,
): number[] {
    const seen = new Array(edges.length).fill(false);
    const prev = new Array(edges.length).fill(-1);
    const dists = new Array(edges.length).fill(Infinity);
    dists[source] = 0;

    while (hasUnvisited(seen, dists)) {
        const crr = getLowestUnvisited(seen, dists);
        seen[crr] = true;

        const adjs = edges[crr];
        for (let i = 0; i < adjs.length; ++i) {
            const edge = adjs[i];

            if (seen[edge.to]) {
                continue;
            }

            const dist = dists[crr] + edge.weight;
            if (dist < dists[edge.to]) {
                dists[edge.to] = dist;
                prev[edge.to] = crr;
            }
        }
    }

    // walk the distance backwards
    const out: number[] = [];
    let crr = sink;

    while (prev[crr] !== -1) {
        out.push(crr);
        crr = prev[crr];
    }

    out.push(source);
    return out.reverse();
}
