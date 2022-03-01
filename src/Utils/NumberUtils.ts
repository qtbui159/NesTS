import BitUtils from "./BitUtils";

class NumberUtils {
    toUInt8(value: number): number {
        return value & 0xff;
    }

    toUInt16(value: number): number {
        return value & 0xffff;
    }

    toInt8(value: number): number {
        if (value == 0) {
            return 0;
        }

        const isNegative: boolean = BitUtils.get(value, 7) == 1;
        const n: number = value & 0x7f;
        return isNegative ? -n : n;
    }

    toInt16(value: number): number {
        if (value == 0) {
            return 0;
        }

        const isNegative: boolean = BitUtils.get(value, 15) == 1;
        const n: number = value & 0x7fff;
        return isNegative ? -n : n;
    }
}

export default new NumberUtils();
