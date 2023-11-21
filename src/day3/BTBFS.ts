export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: (BinaryNode<number> | null)[] = [head];

    while (q.length) {
        // dequeue
        const crr = q.shift() as BinaryNode<number> | undefined | null;

        if (!crr) {
            continue;
        }

        // search
        if (crr.value === needle) {
            return true;
        }

        // enqueue
        q.push(crr.left);
        q.push(crr.right);
    }

    return false;
}
