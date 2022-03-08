import ICartridge from "../Cartridge/ICartridge";
import IRam from "../Memory/IRam";
import ICPUBus from "./ICPUBus";

class CPUBus implements ICPUBus {
    private m_RAM: IRam = {} as any;
    private m_Cartridge: ICartridge = {} as any;

    public connectRAM(ram: IRam): void {
        this.m_RAM = ram;
    }

    public connectCartridge(cartridge: ICartridge): void {
        this.m_Cartridge = cartridge;
    }

    public writeByte(addr: number, data: number): void {
        if (addr < 0x2000) {
            this.m_RAM.writeByte(addr, data);
        } else if (addr >= 0x2000 && addr < 0x4020) {
            //ppu,apu,joystick registers
        } else if (addr >= 0x6000) {
            this.m_Cartridge.mapper.writeByte(addr, data);
        } else {
            throw new Error("Not support address");
        }
    }

    public readByte(addr: number): number {
        if (addr < 0x2000) {
            return this.m_RAM.readByte(addr);
        } else if (addr >= 0x2000 && addr < 0x4020) {
            //ppu,apu,joystick registers
            return 0;
        } else if (addr >= 0x6000) {
            return this.m_Cartridge.mapper.readByte(addr);
        } else {
            throw new Error("Not support address");
        }
    }
}

export default CPUBus;
