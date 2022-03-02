export default interface INes {
    /**
     * 插入卡带
     * @param data 卡带数据
     */
    insertCartridge(data: Uint8Array): void;

    /**
     * 开机,需要先插卡带
     */
    powerUp(): void;
}
