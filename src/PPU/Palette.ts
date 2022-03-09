import RGB from "../Common/RGB";
import IPalette from "./IPalette";

export default class Palette implements IPalette {
    private readonly m_RGB: RGB[] = [];
    /**
     * 存储的都是index，真正的颜色需要用indexToRGB方法取倒
     */
    private readonly m_Palette: Uint8Array = new Uint8Array(0x20);
    private static m_PaletteOriginalData: number[];

    static {
        Palette.m_PaletteOriginalData = [
            0x46, 0x46, 0x46, 0x00, 0x06, 0x5a, 0x00, 0x06, 0x78, 0x02, 0x06, 0x73, 0x35, 0x03, 0x4c, 0x57, 0x00, 0x0e, 0x5a, 0x00, 0x00, 0x41, 0x00, 0x00, 0x12, 0x02, 0x00, 0x00, 0x14, 0x00, 0x00, 0x1e, 0x00, 0x00, 0x1e, 0x00, 0x00, 0x15, 0x21, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0x9d, 0x9d, 0x9d, 0x00, 0x4a, 0xb9, 0x05, 0x30, 0xe1, 0x57, 0x18, 0xda, 0x9f, 0x07, 0xa7, 0xcc, 0x02, 0x55, 0xcf, 0x0b, 0x00, 0xa4, 0x23, 0x00, 0x5c, 0x3f, 0x00, 0x0b, 0x58, 0x00, 0x00, 0x66, 0x00, 0x00, 0x67, 0x13, 0x00, 0x5e, 0x6e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0xfe, 0xff, 0xff, 0x1f, 0x9e, 0xff, 0x53, 0x76, 0xff, 0x98, 0x65, 0xff, 0xfc, 0x67, 0xff, 0xff, 0x6c, 0xb3, 0xff, 0x74, 0x66, 0xff, 0x80, 0x14, 0xc4, 0x9a, 0x00, 0x71, 0xb3, 0x00, 0x28, 0xc4, 0x21, 0x00, 0xc8, 0x74, 0x00, 0xbf, 0xd0, 0x2b, 0x2b, 0x2b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            0xfe, 0xff, 0xff, 0x9e, 0xd5, 0xff, 0xaf, 0xc0, 0xff, 0xd0, 0xb8, 0xff, 0xfe, 0xbf, 0xff, 0xff, 0xc0, 0xe0, 0xff, 0xc3, 0xbd, 0xff, 0xca, 0x9c, 0xe7, 0xd5, 0x8b, 0xc5, 0xdf, 0x8e, 0xa6, 0xe6, 0xa3, 0x94, 0xe8, 0xc5, 0x92, 0xe4, 0xeb, 0xa7, 0xa7, 0xa7, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        ];
    }

    public constructor() {
        for (let i = 0; i < Palette.m_PaletteOriginalData.length; i += 3) {
            const r: number = Palette.m_PaletteOriginalData[i];
            const g: number = Palette.m_PaletteOriginalData[i + 1];
            const b: number = Palette.m_PaletteOriginalData[i + 2];

            this.m_RGB.push(new RGB(r, g, b));
        }
    }

    public writeByte(addr: number, data: number): void {
        const realAddr: number = this.getWriteRealAddr(addr);
        this.m_Palette[realAddr] = data;
    }

    public readByte(addr: number): number {
        const realAddr: number = this.getReadRealAddr(addr);
        return this.m_Palette[realAddr];
    }

    private getReadRealAddr(addr: number): number {
        let realAddr: number = addr & 0x3f1f;   
        if (realAddr == 0x3f10 || realAddr == 0x3f14 || realAddr == 0x3f18 || realAddr == 0x3f1c) {
            realAddr -= 0x10;
        }
        if (realAddr == 0x3f04 || realAddr == 0x3f08 || realAddr == 0x3f0c) {
            realAddr = 0x3f00;
        }
        return realAddr - 0x3f00;
    }

    private getWriteRealAddr(addr: number): number {
        let realAddr: number = addr & 0x3f1f;
        if (realAddr == 0x3f10 || realAddr == 0x3f14 || realAddr == 0x3f18 || realAddr == 0x3f1c) {
            realAddr -= 0x10;
        }
        return realAddr - 0x3f00;
    }

    public indexToRGB(index: number): RGB {
        return this.m_RGB[index];
    }
}
