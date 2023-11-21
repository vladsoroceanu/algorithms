function walk(crr: BinaryNode<number> | null, path: number[]): number[] {
    // base
    if (!crr) {
        return path;
    }

    // pre
    walk(crr.left, path);
    // recurse
    path.push(crr.value);
    walk(crr.right, path);
    // post
    return path;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
