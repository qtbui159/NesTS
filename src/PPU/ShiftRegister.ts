import NumberUtils from "../Utils/NumberUtils";

class ShiftRegister {
    public get tileHighByte(): number {
        return this.m_TileHighByte;
    }
    private m_TileHighByte: number = 0;

    public get tileLowByte(): number {
        return this.m_tileLowByte;
    }
    private m_tileLowByte: number = 0;

    public get AttributeHighByte(): number {
        return this.m_AttributeHighByte;
    }
    private m_AttributeHighByte: number = 0;

    public get AttributeLowByte(): number {
        return this.m_AttributeLowByte;
    }
    private m_AttributeLowByte: number = 0;

    /**
     * 因为绘制过程是高7bit 6bit 5bit，所以是左移
     */
    public leftMove(): void {
        this.m_TileHighByte = NumberUtils.toUInt16(this.m_TileHighByte << 1);
        this.m_tileLowByte = NumberUtils.toUInt16(this.m_tileLowByte << 1);
        this.m_AttributeHighByte = NumberUtils.toUInt16(this.m_AttributeHighByte << 1);
        this.m_AttributeLowByte = NumberUtils.toUInt16(this.m_AttributeLowByte << 1);
    }
}

export default ShiftRegister;
