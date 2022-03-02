import INes from "./INes";
import ICartridge from "./Cartridge/ICartridge";
import IFileLoader from "./NesFile/IFileLoader";
import Nes10FileLoader from "./NesFile/Nes10FileLoader";

class Nes implements INes {
    private m_Cartridge: ICartridge;

    insertCartridge(data: Uint8Array): void {
        const fileLoader: IFileLoader = new Nes10FileLoader();
        this.m_Cartridge = fileLoader.load(data);
    }
    powerUp(): void {}
}

export default Nes;
