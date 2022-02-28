class NumberUtils {
  toUInt8(value: number): number {
    return value & 0xff;
  }

  toUInt16(value: number): number {
    return value & 0xffff;
  }
}

export default new NumberUtils();
