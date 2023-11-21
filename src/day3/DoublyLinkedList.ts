type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    private getNodeAt(idx: number) {
        let crr = this.head;
        for (let i = 0; crr && 0 < idx; ++i) {
            if (i === idx) {
                break;
            }

            crr = crr.next;
        }

        return crr as Node<T>;
    }

    private removeNode(node: Node<T>): T | undefined {
        this.length--;

        if (this.length === 0) {
            const out = this.head?.value;
            this.head = undefined;
            return out;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;

        return node.value;
    }

    prepend(item: T): void {
        this.length++;

        const node: Node<T> = { value: item };

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("index out of bounds");
        }

        if (idx === this.length) {
            this.append(item);
            return;
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;

        const crr = this.getNodeAt(idx);
        const node: Node<T> = { value: item };

        node.next = crr;
        node.prev = crr.prev;
        crr.prev = node;

        if (node.prev) {
            node.prev.next = node;
        }
    }

    append(item: T): void {
        this.length++;

        const node: Node<T> = { value: item };

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let crr = this.head;
        for (let i = 0; crr && 0 < this.length; ++i) {
            if (crr?.value === item) {
                break;
            }
            crr = crr.next;
        }

        if (!crr) {
            return undefined;
        }

        return this.removeNode(crr);
    }

    get(idx: number): T | undefined {
        return this.getNodeAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNodeAt(idx);

        if (!node) {
            return undefined;
        }

        return this.removeNode(node);
    }
}
