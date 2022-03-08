import MirroringMode from "../Common/MirroringMode";
import IPPU2C02 from "./IPPU2C02";
import MaskRegister from "./MaskRegister";
import ShiftRegister from "./ShiftRegister";
import Sprite from "./Sprite";
import StatusRegister from "./StatusRegister";
import VRamRegister from "./VRamRegister";
import CtrlRegister from "./CtrlRegister";
import Latch from "./Latch";

class PPU2C02 implements IPPU2C02 {
    public Ctrl: CtrlRegister;
    public Mask: MaskRegister;
    public Status: StatusRegister;
    public T: VRamRegister;
    public V: VRamRegister;
    public fineXScroll: number;
    public readBuffer: number;
    public oam: Uint8Array;
    public oamAddr: number;
    public wirteX2Flag: boolean;

    private m_MirroringMode: MirroringMode;
    private m_SecondOAM: Sprite[];
    private m_ShiftRegister: ShiftRegister;
    private m_Latch: Latch;

    public constructor() {
        this.Ctrl = new CtrlRegister();
        this.Mask = new MaskRegister();
        this.Status = new StatusRegister();
        this.T = new VRamRegister();
        this.V = new VRamRegister();
        this.fineXScroll = 0;
        this.readBuffer = 0;
        this.oam = new Uint8Array(256);
        this.oamAddr = 0;
        this.wirteX2Flag = false;

        this.m_MirroringMode = MirroringMode.Horizontal;
        this.m_SecondOAM = [];
        this.m_ShiftRegister = new ShiftRegister();
        this.m_Latch = new Latch();
    }

    public ticktock(): void {
        throw new Error("Method not implemented.");
    }

    public switchNameTableMirroring(mode: MirroringMode): void {
        this.m_MirroringMode = mode;
    }

    public writeByte(addr: number, data: number): void {
        throw new Error("Method not implemented.");
    }

    public readByte(addr: number): number {
        throw new Error("Method not implemented.");
    }
}

export default PPU2C02;
