import Package from "../../package.json";

export default {
  clear: (terminal) => terminal.clear(),

  version: (terminal) => { 
    console.log(Package);
    terminal.output(`Text Terminal v${Package.version}`)
  },
};
