import ICPUBus from "./ICPUBus";

class CPUBus implements ICPUBus {
    writeByte(addr: number, data: number): void {}
    readByte(addr: number): number {
        return 1;
    }
}

export default CPUBus;
