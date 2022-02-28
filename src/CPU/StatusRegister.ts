import RegisterBase from "../Register/RegisterBase";
import BitUtils from "../Utils/BitUtils";

class StatusRegister extends RegisterBase {
  /**
   * 进位标志
   */
  get C(): number {
    return BitUtils.get(this.m_Value, 0);
  }

  set C(value: number) {
    this.updateBit(0, value);
  }

  /**
   * 零标志
   */
  get Z(): number {
    return BitUtils.get(this.m_Value, 1);
  }

  set Z(value: number) {
    this.updateBit(1, value);
  }

  /**
   * 中断停用标志
   */
  get I(): number {
    return BitUtils.get(this.m_Value, 2);
  }

  set I(value: number) {
    this.updateBit(2, value);
  }

  /**
   * decimal模式
   */
  get D(): number {
    return BitUtils.get(this.m_Value, 3);
  }

  set D(value: number) {
    this.updateBit(3, value);
  }

  /**
   * 中断标志
   */
  get B(): number {
    return BitUtils.get(this.m_Value, 4);
  }

  set B(value: number) {
    this.updateBit(4, value);
  }

  /**
   * 溢出标志
   */
  get O(): number {
    return BitUtils.get(this.m_Value, 6);
  }

  set O(value: number) {
    this.updateBit(6, value);
  }

  /**
   * 负标志
   */
  get N(): number {
    return BitUtils.get(this.m_Value, 7);
  }

  set N(value: number) {
    this.updateBit(7, value);
  }

  constructor() {
    super();
    this.m_Value = 0x24;
  }
}

export default StatusRegister;
