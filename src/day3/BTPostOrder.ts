function walk(crr: BinaryNode<number> | null, path: number[]): number[] {
    //base
    if (!crr) {
        return path;
    }

    // pre
    walk(crr.left, path);
    // recurse
    walk(crr.right, path);
    path.push(crr.value);
    // post
    return path;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
