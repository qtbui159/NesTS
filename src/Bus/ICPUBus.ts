import IReadWrite from "../Common/IReadWrite";
import IRam from "../Memory/IRam";
import ICartridge from "../Cartridge/ICartridge";

interface ICPUBus extends IReadWrite {
    connectRAM(ram: IRam): void;
    connectCartridge(cartridge: ICartridge): void;
}

export default ICPUBus;
