function walk(
    graph: WeightedAdjacencyList,
    crr: number,
    needle: number,
    seen: boolean[],
    path: number[],
): boolean {
    // base cases
    if (seen[crr]) {
        return false;
    }

    seen[crr] = true;

    //recurse steps
    //pre
    path.push(crr);
    if (crr === needle) {
        return true;
    }

    //recurse
    const list = graph[crr];
    for (let i = 0; i < list.length; i++) {
        const edge = list[i];

        if (walk(graph, edge.to, needle, seen, path)) {
            return true;
        }
    }

    //post
    path.pop();

    return false;
}

export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const seen: boolean[] = new Array(graph.length).fill(false);
    const path: number[] = [];

    walk(graph, source, needle, seen, path);

    if (path.length === 0) {
        return null;
    }

    return path;
}
