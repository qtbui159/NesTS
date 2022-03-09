import INes from "./INes";
import ICartridge from "./Cartridge/ICartridge";
import IRam from "./Memory/IRam";
import RAM from "./Memory/Ram";
import ICPUBus from "./Bus/ICPUBus";
import CPUBus from "./Bus/CPUBus";
import ICPU6502 from "./CPU/ICPU6502";
import CPU6502 from "./CPU/CPU6502";
import IFileLoader from "./NesFile/IFileLoader";
import Nes10FileLoader from "./NesFile/Nes10FileLoader";
import PPU2C02 from "./PPU/PPU2C02";
import IPPU2C02 from "./PPU/IPPU2C02";
import IPPUBus from "./Bus/IPPUBus";
import PPUBus from "./Bus/PPUBus";
import VRam from "./Memory/VRam";
import IPalette from "./PPU/IPalette";
import Palette from "./PPU/Palette";

class Nes implements INes {
    private m_Cartridge: ICartridge;

    private m_RAM: IRam;
    private m_CPUBus: ICPUBus;
    private m_CPU6502: ICPU6502;

    private m_PPU2C02: IPPU2C02;
    private m_PPUBus: IPPUBus;
    private m_VRam: IRam;
    private m_Palette: IPalette;

    public constructor() {
        //cpu部分
        this.m_RAM = new RAM();
        this.m_CPUBus = new CPUBus();
        this.m_CPU6502 = new CPU6502(this.m_CPUBus);

        //ppu部分
        this.m_PPUBus = new PPUBus();
        this.m_PPU2C02 = new PPU2C02(this.m_PPUBus);
        this.m_VRam = new VRam();
        this.m_Palette = new Palette();

        //卡带
        this.m_Cartridge = {} as any;

        //总线连接
        this.m_CPUBus.connectRAM(this.m_RAM);
        this.m_PPUBus.connectVRam(this.m_VRam);
        this.m_PPUBus.connectPalette(this.m_Palette);
    }

    public insertCartridge(data: Uint8Array): void {
        const fileLoader: IFileLoader = new Nes10FileLoader();
        this.m_Cartridge = fileLoader.load(data);

        this.m_CPUBus.connectCartridge(this.m_Cartridge);
        this.m_PPUBus.connectCartridge(this.m_Cartridge);
    }

    public powerUp(): void {
        this.m_CPU6502.reset();

        while (true) {
            this.m_CPU6502.ticktock();
            this.m_PPU2C02.ticktock();
            this.m_PPU2C02.ticktock();
            this.m_PPU2C02.ticktock();
        }
    }
}

export default Nes;
