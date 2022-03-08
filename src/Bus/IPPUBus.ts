import ICartridge from "../Cartridge/ICartridge";
import IReadWrite from "../Common/IReadWrite";
import IRam from "../Memory/IRam";

export default interface IPPUBus extends IReadWrite {
    /**
     * 连接卡带
     * @param cartridge 卡带
     */
    connectCartriduge(cartridge: ICartridge): void;

    /**
     * 连接显存
     * @param vram 显存 
     */
    connectVRam(vram: IRam): void;
}
