function search(crr: BinaryNode<number> | null, needle: number): boolean {
    if (!crr) {
        return false;
    }

    if (crr.value === needle) {
        return true;
    }

    if (needle > crr.value) {
        return search(crr.right, needle);
    }

    return search(crr.left, needle);
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
