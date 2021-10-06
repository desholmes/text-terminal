import TextTerminal from "./modules/textTerminal";
import "./scss/text-terminal.scss";

const config = {
  prompt: "textTerm@quest",
  theme: "jinx",
};

const terminal = new TextTerminal(config);
