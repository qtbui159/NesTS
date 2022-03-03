import IReadWrite from "../Common/IReadWrite";
import IRAM from "../Memory/IRAM";
import ICartridge from "../Cartridge/ICartridge";

interface ICPUBus extends IReadWrite {
    connectRAM(ram: IRAM): void;
    connectCartridge(cartridge: ICartridge): void;
}

export default ICPUBus;
