import { Package } from "../../package.json";

export default {
  clear: (terminal) => terminal.clear(),

  version: (terminal) => terminal.output(`Text Terminal v${Package.version}`),
};
