import ICartridge from "../Cartridge/ICartridge";
import IRAM from "../Memory/IRAM";
import ICPUBus from "./ICPUBus";

class CPUBus implements ICPUBus {
    private m_RAM: IRAM = {} as any;
    private m_Cartridge: ICartridge = {} as any;

    connectRAM(ram: IRAM): void {
        this.m_RAM = ram;
    }

    connectCartridge(cartridge: ICartridge): void {
        this.m_Cartridge = cartridge;
    }

    writeByte(addr: number, data: number): void {
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

    readByte(addr: number): number {
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
