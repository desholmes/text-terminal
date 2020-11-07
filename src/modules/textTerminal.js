import template from "./template";
import { defaultCommands } from "./defaultCommands";
import cloneCommand from "./cloneCommandEl";

class TextTerminal {
  #id = "TextTerminal";
  #dom = {};
  commands = {};
  history = [];
  historyCursor = 0;
  prompt;
  separator;
  theme;
  welcome;

  constructor(configProps = {}) {
    const {
      containerId = "text-terminal",
      commands = {},
      prompt = "",
      theme = "dark",
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
    this.theme = theme;
    this.welcome = welcome;

    this.createDom(containerEl);
    this.addListeners();

    if (this.welcome) this.output(this.welcome);
  }

  addListeners() {
    this.#dom.output.addEventListener(
      "DOMSubtreeModified",
      () => {
        setTimeout(() => this.#dom.input.scrollIntoView(), 10);
      },
      false
    );

    if (window) {
      window.addEventListener("click", () => this.#dom.input.focus(), false);
    }

    this.#dom.output.addEventListener(
      "click",
      (event) => event.stopPropagation(),
      false
    );

    this.#dom.command.addEventListener(
      "click",
      () => this.#dom.input.focus(),
      false
    );

    this.#dom.input.addEventListener("keyup", this.onKeyUp, false);
    this.#dom.input.addEventListener("keydown", this.onKeyDown, false);
  }

  createDom(containerEl) {
    containerEl.classList.add(this.#id);
    containerEl.insertAdjacentHTML(
      "beforeEnd",
      template(this.prompt, this.separator)
    );
    document.querySelector("body").classList.add(this.theme);

    this.#dom = {
      container: containerEl.querySelector(".container"),
      output: containerEl.querySelector("output"),
      command: containerEl.querySelector(".command"),
      input: containerEl.querySelector(".command .input"),
      prompt: containerEl.querySelector(".command .prompt"),
    };
  }

  onKeyDown = (event) => {
    const commandInput = this.#dom.input.value.trim();

    if (event.keyCode !== 13 || !commandInput) {
      return;
    }

    const [command, ...parameters] = commandInput.split(" ");

    // if (state.prompt) {
    //   state.prompt = false;
    //   this.onAskCallback(command);
    //   this.setPrompt();
    //   this.resetCommand();
    //   return;
    // }

    // Add commands to history
    this.history.push(commandInput);
    localStorage[this.#id] = JSON.stringify(this.history);
    this.historyCursor = this.history.length;

    // Clone command as a new output line
    this.#dom.output.appendChild(cloneCommand(this.#dom.command));

    this.#dom.input.value = "";

    // Dispatch command
    if (Object.keys(this.commands).includes(command)) {
      const callback = this.commands[command];
      if (callback) {
        callback(this, parameters);
      }
      // if (onInputCallback) {
      //   onInputCallback(command, parameters);
      // }
    } else {
      this.output(`<u>${command}</u>: command not found.`);
    }
  };

  onKeyUp = (event) => {
    this.#dom.input.focus();
    event.stopPropagation();
    event.preventDefault();

    // ESC
    if (event.keyCode === 27) {
      this.#dom.input.value = "";
      event.stopPropagation();
      event.preventDefault();
    }

    if (event.keyCode === 38 || event.keyCode === 40) {
      // UP key
      if (event.keyCode === 38 && this.historyCursor > 0) {
        this.historyCursor -= 1;
      }

      // DOWN key
      if (
        event.keyCode === 40 &&
        this.historyCursor < this.history.length - 1
      ) {
        this.historyCursor -= 1;
      }

      if (this.history[this.historyCursor]) {
        this.#dom.input.value = this.history[this.historyCursor];
      }
    }
  };

  output(command = "&nbsp;") {
    this.#dom.output.insertAdjacentHTML("beforeEnd", `<span>${command}</span>`);
    this.resetCommand();
  }

  resetCommand = () => {
    this.#dom.input.value = "";
    this.#dom.command.classList.remove("input");
    // DOM.command.classList.remove('hidden');
    if (this.#dom.input.scrollIntoView) {
      this.#dom.input.scrollIntoView();
    }
  };
}

if (window) {
  window.TextTerminal = TextTerminal;
}

export default TextTerminal;
