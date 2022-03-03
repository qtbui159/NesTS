import INes from "./INes";
import ICartridge from "./Cartridge/ICartridge";
import IRAM from "./Memory/IRAM";
import RAM from "./Memory/RAM";
import ICPUBus from "./Bus/ICPUBus";
import CPUBus from "./Bus/CPUBus";
import ICPU6502 from "./CPU/ICPU6502";
import CPU6502 from "./CPU/CPU6502";
import IFileLoader from "./NesFile/IFileLoader";
import Nes10FileLoader from "./NesFile/Nes10FileLoader";

class Nes implements INes {
    private m_Cartridge: ICartridge;
    private m_RAM: IRAM;
    private m_CPUBus: ICPUBus;
    private m_CPU6502: ICPU6502;

    constructor() {
        this.m_RAM = new RAM();
        this.m_CPUBus = new CPUBus();
        this.m_CPU6502 = new CPU6502(this.m_CPUBus);

        this.m_CPUBus.connectRAM(this.m_RAM);
    }

    insertCartridge(data: Uint8Array): void {
        const fileLoader: IFileLoader = new Nes10FileLoader();
        this.m_Cartridge = fileLoader.load(data);

        this.m_CPUBus.connectCartridge(this.m_Cartridge);
    }
    powerUp(): void {
        this.m_CPU6502.reset();

        while (true) {
            this.m_CPU6502.ticktock();
        }
    }
}

export default Nes;
