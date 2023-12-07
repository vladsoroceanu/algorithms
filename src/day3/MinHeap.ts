export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);

        this.length++;
    }
    // also called pop
    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        this.length--;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return out;
    }

    private heapifyDown(idx: number) {
        if (idx >= this.length) {
            return;
        }

        const leftIdx = this.leftChild(idx);

        if (leftIdx >= this.length) {
            return;
        }

        const rightIdx = this.rightChild(idx);
        const leftValue = this.data[leftIdx];
        const rightValue = this.data[rightIdx];
        const value = this.data[idx];

        if (leftValue > rightValue && value > rightValue) {
            this.data[idx] = rightValue;
            this.data[rightIdx] = value;

            this.heapifyDown(rightIdx);
        } else if (rightValue > leftValue && value > leftValue) {
            this.data[idx] = leftValue;
            this.data[leftIdx] = value;

            this.heapifyDown(leftIdx);
        }
    }

    private heapifyUp(idx: number) {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const parentV = this.data[parentIdx];
        const v = this.data[idx];

        if (parentV > v) {
            this.data[idx] = parentV;
            this.data[parentIdx] = v;

            this.heapifyUp(parentIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return idx * 2 + 1;
    }

    private rightChild(idx: number): number {
        return idx * 2 + 2;
    }
}
