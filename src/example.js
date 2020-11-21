import TextTerminal from "./modules/textTerminal";
import "./scss/main.scss";

const config = {
  prompt: "textTerm@quest",
  theme: "dark",
};

const terminal = new TextTerminal(config);
