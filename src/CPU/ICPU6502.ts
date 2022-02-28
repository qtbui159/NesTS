interface ICPU6502 {
  /**
   * 执行一条指令
   */
  ticktock(): void;
  /**
   *RESET中断
   */
  reset(): void;
  /**
   * NMI中断
   */
  nmi(): void;
  /**
   * IRQ中断
   */
  irq(): void;
}

export default ICPU6502;
