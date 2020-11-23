declare module 'text-terminal' {
  export default class TextTerminal {
    constructor(options?: Partial<{
      containerId: string;
      commands: object;
      prompt: string;
      theme: string;
      welcome: string;
      separator: string;
    }>);

    addListeners(): void;
  
    clear(): void;
  
    createDom(containerEl: HTMLElement): void;
  
    onKeyDown: (event: Event) => void;
  
    onKeyUp: (event: Event) => void;
  
    output(command: string): void;
  
    resetCommand: () => void;
  }
}
