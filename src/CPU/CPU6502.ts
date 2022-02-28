import ICPU6502 from "./ICPU6502";
import StatusRegister from "./StatusRegister";
import ICPUBus from "../Bus/ICPUBus";
import NumberUtils from "../Utils/NumberUtils";

class CPU6502 implements ICPU6502 {
  private m_OpCodeMapFunction: Map<number, VoidFunction>;
  private m_CPUBus: ICPUBus;

  public X: number;
  public Y: number;
  public A: number;

  public get PC(): number {
    return this.m_PC;
  }
  public set PC(newPC: number) {
    this.m_PC = NumberUtils.toUInt16(newPC);
  }
  private m_PC: number;

  public get SP(): number {
    return this.m_SP;
  }
  public set SP(newSP: number) {
    this.m_SP = NumberUtils.toUInt8(newSP);
  }
  private m_SP: number;

  public S: StatusRegister;

  constructor(cpuBus: ICPUBus) {
    this.m_CPUBus = cpuBus;

    this.X = 0;
    this.Y = 0;
    this.A = 0;
    this.PC = 0;
    this.SP = 0;
    this.S = new StatusRegister();

    this.init();
  }

  init(): void {
    if (this.m_OpCodeMapFunction == null) {
      this.m_OpCodeMapFunction = new Map<number, VoidFunction>();
    }

    this.batchAdd(this.asl, [0x0a, 0x06, 0x16, 0x0e, 0x1e]);
  }

  batchAdd(func: VoidFunction, opCodes: number[]) {
    if (!func) {
      throw new Error("argument func invalid");
    }
    if (!opCodes || opCodes.length == 0) {
      throw new Error("argument opCodes invalid");
    }

    for (const opCode of opCodes) {
      if (this.m_OpCodeMapFunction.has(opCode)) {
        throw new Error("key already exists");
      }
      this.m_OpCodeMapFunction.set(opCode, func);
    }
  }

  ticktock(): void {
    throw new Error("Method not implemented.");
  }
  reset(): void {
    throw new Error("Method not implemented.");
  }
  nmi(): void {
    throw new Error("Method not implemented.");
  }
  irq(): void {
    throw new Error("Method not implemented.");
  }
  
  adc(): void {}

  and(): void {}

  asl(): void {}

  bcc(): void {}

  /**
   * immediate寻址
   * @returns
   */
  immediateAddressing(): number {
    return this.PC++;
  }

  /**
   * 零页寻址
   * @returns
   */
  zeroPageAddressing(): number {
    const addr: number = this.m_CPUBus.readByte(this.PC++);
    return addr & 0xff;
  }

  /**
   * 零页X寻址
   * @returns
   */
  zeroPageXAddressing(): number {
    const addr: number = this.m_CPUBus.readByte(this.PC++);
    return (addr + this.X) & 0xff;
  }

  /**
   * 零页Y寻址
   * @returns
   */
  zeroPageYAddressing(): number {
    const addr: number = this.m_CPUBus.readByte(this.PC++);
    return (addr + this.Y) & 0xff;
  }

  /**
   * 绝对地址寻址
   * @returns
   */
  absoluteAddressing(): number {
    const addr: number = this.readUInt16(this.PC);
    this.PC += 2;
    return addr;
  }

  /**
   * 绝对地址X寻址
   * @returns
   */
  absoluteXAddressing(): { addr: number; isCrossPage: boolean } {
    const addr: number = this.readUInt16(this.PC);
    this.PC += 2;
    const newAddr: number = NumberUtils.toUInt16(addr + this.X);
    return {
      addr: addr,
      isCrossPage: this.isCrossPage(addr, newAddr),
    };
  }

  /**
   * 绝对地址Y寻址
   * @returns
   */
  absoluteYAddressing(): { addr: number; isCrossPage: boolean } {
    const addr: number = this.readUInt16(this.PC);
    this.PC += 2;
    const newAddr: number = NumberUtils.toUInt16(addr + this.Y);
    return {
      addr: addr,
      isCrossPage: this.isCrossPage(addr, newAddr),
    };
  }

  /**
   * 相对寻址
   * @returns
   */
  relativeAddressing(): number {
    return this.m_CPUBus.readByte(this.PC++);
  }

  /**
   * 间接寻址
   * @returns
   */
  indirectAddressing(): number {
    const addr: number = this.readUInt16(this.PC);
    this.PC += 2;

    if ((addr & 0xff) == 0xff) {
      //触发硬件bug
      const low: number = this.m_CPUBus.readByte(addr);
      const high: number = this.m_CPUBus.readByte(addr & 0xff00);
      const newAddr: number = (high << 8) | low;
      return newAddr;
    } else {
      return this.readUInt16(addr);
    }
  }

  /**
   * 间接X寻址
   * @returns
   */
  indexedIndirectAddressing(): number {
    const offset: number = this.m_CPUBus.readByte(this.PC++);
    const addr: number = NumberUtils.toUInt8(offset + this.X);
    if ((addr & 0xff) == 0xff) {
      //触发硬件bug
      const low: number = this.m_CPUBus.readByte(addr);
      const high: number = this.m_CPUBus.readByte(addr & 0xff00);
      const newAddr: number = (high << 8) | low;
      return newAddr;
    } else {
      return this.readUInt16(addr);
    }
  }

  /**
   * 间接Y寻址
   */
  indirectIndexedAddressing(): { addr: number; isCrossPage: boolean } {
    const oldAddr = this.PC;
    let addr: number = this.m_CPUBus.readByte(this.PC++);
    if ((addr & 0xff) == 0xff) {
      //触发硬件bug
      const low: number = this.m_CPUBus.readByte(addr);
      const high: number = this.m_CPUBus.readByte(addr & 0xff00);
      addr = (high << 8) | low;
    } else {
      addr = this.readUInt16(addr);
    }

    addr = NumberUtils.toUInt16(addr + this.Y);
    return {
      addr: addr,
      isCrossPage: this.isCrossPage(oldAddr, addr),
    };
  }

  readUInt16(addr: number): number {
    const low: number = this.m_CPUBus.readByte(addr);
    const high: number = this.m_CPUBus.readByte(NumberUtils.toUInt16(addr + 1));
    return NumberUtils.toUInt16((high << 8) | low);
  }

  isCrossPage(oldAddr: number, newAddr: number): boolean {
    return (oldAddr & 0xff00) != (newAddr & 0xff00);
  }

  /**
   * 推入一个字节到堆栈顶
   * @param data
   */
  push(data: number): void {
    const addr = NumberUtils.toUInt16(0x100 + this.SP);
    this.m_CPUBus.writeByte(addr, NumberUtils.toUInt8(data));
    this.SP--;
  }

  /**
   * 从堆栈顶取出数据并出栈
   */
  pop(): number {
    this.SP++;
    const addr = NumberUtils.toUInt16(0x100 + this.SP);
    return this.m_CPUBus.readByte(addr);
  }
}

export default CPU6502;
