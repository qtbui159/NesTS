import RegisterBase from "../Register/RegisterBase";
import BitUtils from "../Utils/BitUtils";

class StatusRegister extends RegisterBase {
    /**
     * 进位标志
     */
    public get C(): number {
        return BitUtils.get(this.m_Value, 0);
    }

    public set C(value: number) {
        this.updateBit(0, value);
    }

    /**
     * 零标志
     */
    public get Z(): number {
        return BitUtils.get(this.m_Value, 1);
    }

    public set Z(value: number) {
        this.updateBit(1, value);
    }

    /**
     * 中断停用标志
     */
    public get I(): number {
        return BitUtils.get(this.m_Value, 2);
    }

    public set I(value: number) {
        this.updateBit(2, value);
    }

    /**
     * decimal模式
     */
    public get D(): number {
        return BitUtils.get(this.m_Value, 3);
    }

    public set D(value: number) {
        this.updateBit(3, value);
    }

    /**
     * 中断标志
     */
    public get B(): number {
        return BitUtils.get(this.m_Value, 4);
    }

    public set B(value: number) {
        this.updateBit(4, value);
    }

    /**
     * 溢出标志
     */
    public get O(): number {
        return BitUtils.get(this.m_Value, 6);
    }

    public set O(value: number) {
        this.updateBit(6, value);
    }

    /**
     * 负标志
     */
    public get N(): number {
        return BitUtils.get(this.m_Value, 7);
    }

    public set N(value: number) {
        this.updateBit(7, value);
    }

    public constructor() {
        super();
        this.m_Value = 0x24;
    }
}

export default StatusRegister;
