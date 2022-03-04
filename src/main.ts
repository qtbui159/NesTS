import INes from "./INes";
import Nes from "./Nes";
import fs from "fs";

function main(): void {
    const nes: INes = new Nes();
    const buffer: Uint8Array = fs.readFileSync(`C:\\Users\\Spike\\Desktop\\nestest.nes`);
    nes.insertCartridge(buffer);
    nes.powerUp();
}

main();
