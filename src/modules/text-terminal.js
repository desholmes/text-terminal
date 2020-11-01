import template from "./template";
import { defaultCommands } from "./default-commands";

class TextTerminal {
  #id = "TextTerminal";
  #dom = {};
  commands = {};
  history = [];
  historyCursor = 0;
  prompt;
  separator;
  welcome;

  constructor(configProps = {}) {
    console.log("constructor::TextTerminal");

    const {
      containerId = "text-terminal",
      commands = {},
      prompt = "",
      welcome = "Welcome!",
      separator = ":",
    } = configProps;

    const containerEl = document.getElementById(containerId);

    if (!containerEl) {
      throw Error(`Container #${containerId} does not exist!`);
    }

    this.commands = Object.assign({}, commands, defaultCommands);
    this.history = localStorage[this.#id]
      ? JSON.parse(localStorage[this.#id])
      : [];
    this.historyCursor = this.history.length;
    this.prompt = prompt;
    this.separator = separator;
    this.welcome = welcome;

    this.createDom(containerEl);
    this.addListeners();

    if (this.welcome) this.output(this.welcome);
  }

  addListeners() {}

  createDom(containerEl) {
    containerEl.classList.add(this.#id);
    containerEl.insertAdjacentHTML(
      "beforeEnd",
      template(this.prompt, this.separator)
    );

    this.#dom = {
      container: containerEl.querySelector(".container"),
      output: containerEl.querySelector("output"),
      command: containerEl.querySelector(".command"),
      input: containerEl.querySelector(".command .input"),
      prompt: containerEl.querySelector(".command .prompt"),
    };
  }

  output() {}

}

if (window) window.TextTerminal = TextTerminal;

export default TextTerminal;
