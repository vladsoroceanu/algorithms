type Point = {
    x: number;
    y: number;
};

const DIRECTIONS = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function prefillSeen(maze: string[]) {
    const seen: boolean[][] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    return seen;
}

function isOutOfBounds(maze: string[], crr: Point) {
    const xOutOfBounds = crr.x < 0 || crr.x >= maze[0].length;
    const yOutOfBounds = crr.y < 0 || crr.y >= maze.length;
    return xOutOfBounds || yOutOfBounds;
}

function isWall(maze: string[], crr: Point, wall: string) {
    return maze[crr.y][crr.x] === wall;
}
function isEnd(crr: Point, end: Point) {
    return crr.x === end.x && crr.y === end.y;
}

function isSeen(seen: boolean[][], crr: Point) {
    return seen[crr.y][crr.x];
}

function walk(
    maze: string[],
    wall: string,
    crr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // 1. Base case
    if (isOutOfBounds(maze, crr)) {
        return false;
    }
    if (isWall(maze, crr, wall)) {
        return false;
    }
    if (isSeen(seen, crr)) {
        return false;
    }
    if (isEnd(crr, end)) {
        path.push(end);
        return true;
    }

    // 3 recurse operations
    // pre
    seen[crr.y][crr.x] = true;
    path.push(crr);

    // recurse
    for (let i = 0; i < DIRECTIONS.length; ++i) {
        const [x, y] = DIRECTIONS[i];
        const step = walk(
            maze,
            wall,
            { x: crr.x + x, y: crr.y + y },
            end,
            seen,
            path,
        );

        if (step) {
            return true;
        }
    }

    // post
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen = prefillSeen(maze);
    const path: Point[] = [];

    walk(maze, wall, start, end, seen, path);

    return path;
}
