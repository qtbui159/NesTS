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
    let n: number = value & 0x7F;
    return isNegative ? -n : n;
  }
}

export default new NumberUtils();
