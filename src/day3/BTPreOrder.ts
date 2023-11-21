function walk(crr: BinaryNode<number> | null, path: number[]): number[] {
    // base
    if (!crr) {
        return path;
    }

    // pre
    path.push(crr.value);
    // recurse
    walk(crr.left, path);
    walk(crr.right, path);
    // post
    return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
