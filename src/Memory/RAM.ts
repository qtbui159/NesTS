import NumberUtils from "../Utils/NumberUtils";
import IRam from "./IRam";

export default class Ram implements IRam {
    private readonly m_Data: Uint8Array;
    private readonly m_RAMSize = 0x800;

    public constructor() {
        this.m_Data = new Uint8Array(this.m_RAMSize);
    }

    public writeByte(addr: number, data: number): void {
        const realAddr: number = this.getRealAddr(addr);
        this.m_Data[realAddr] = data;
    }

    public readByte(addr: number): number {
        const realAddr: number = this.getRealAddr(addr);
        return this.m_Data[realAddr];
    }

    private getRealAddr(addr: number): number {
        return NumberUtils.toUInt16(addr & 0x7ff);
    }
}
