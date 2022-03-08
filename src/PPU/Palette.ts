import IPalette from "./IPalette";

export default class Palette implements IPalette {
    writeByte(addr: number, data: number): void {
        throw new Error("Method not implemented.");
    }
    readByte(addr: number): number {
        throw new Error("Method not implemented.");
    }
}
