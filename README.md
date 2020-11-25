# Text Terminal

A simple, extendable terminal interface for the web, used by [text-quest](https://github.com/desholmes/text-quest).

## Usage

### Option 1 Use the CSS and JavaScript in your HTML

Follow the example below to include the CSS and JavaScript directly into your HTML page:

```html
<html>
  <head>
    <!-- CSS for Text Terminal -->
    <link href="text-terminal.css" rel="stylesheet" />
  </head>
  <body>
    <!-- Container for Text Terminal -->
    <div id="text-terminal"></div>
    <!-- JavaScript for Text Terminal -->
    <script src="index.js"></script>
    <script>
      // Custom commands
      const commands = {};

      // Config for Text Terminal
      const textTerminalConfig = {
          containerId = "text-terminal",
          prompt: "textTerm@quest",
          theme: "dark",
          commands: commands, // Custom commands
      };

      // Initialise Text Terminal
      const terminal = new TextTerminal(config);
    </script>
  </body>
</html>
```

### Option 2 Use a bundler

Using a bundler (like [Parcel](https://parceljs.org/)).

Install Text Terminal using npm:

```sh
  npm install text-terminal -D
```

or yarn:

```sh
  yarn add text-terminal -D
```

Then, import and initialise Text Terminal into your project:

```javascript
import TextTerminal from "text-terminal/dist";
import "text-terminal/dist/text-terminal.css";

const commands = {};

const config = {
  containerId: "text-terminal",
  prompt: "textTerm@quest",
  theme: "dark",
  commands: commands,
};

const terminal = new TextTerminal(config);
```

Text Terminal also comes with TypeScript compatibility out of the box, so you can use it in your TypeScript projects. To adapt from the above excerpt:

```typescript
// Create a new TextTerminal with a config object where all properties are optional
const terminal = new TextTerminal({
  containerId: "text-terminal",
  prompt: "textTerm@quest",
  theme: "dark",
  commands: {},
});

// All methods of the TextTerminal class are recognised by your IDE with correct typing
terminal.createDom(document.getElementById("my-element")); // HTMLElement argument type
terminal.output("Hey Text Terminal!") // string argument type
```

## Themes

Text Terminal has the following themes bundled with it:

### Dark (default)

```javascript
const config = {
  theme: "dark",
};
```

![dark](https://user-images.githubusercontent.com/1830123/98743681-599ef680-23a8-11eb-9193-82920513f5d2.png)

### Midnight

```javascript
const config = {
  theme: "midnight",
};
```

![midnight](https://user-images.githubusercontent.com/1830123/98743936-c0241480-23a8-11eb-95c0-62dbabc15ad1.png)

### Sunset

```javascript
const config = {
  theme: "sunset",
};
```

![sunset](https://user-images.githubusercontent.com/1830123/98744070-ff526580-23a8-11eb-8140-04727285d6f6.png)

---

## Default Commands

The following commands can be overwritten with your own custom commands.

### clear

Clears the contents of the terminal output.

```js
terminal.clear();
```

### Version

Outputs the version of Text Terminal.

```js
terminal.version();

Text Terminal v0.1.0
```

## Methods

These methods are exposed by Text Terminal for you to use:

### clear()

```js
terminal.clear();
```

### output()

```js
terminal.output("Hey Text Terminal!");

Hey Text Terminal!
```

---

## Development Commands

If you're interested in contributing use the commands below:

1. `npm`: Install deps
1. `npm start`: Start local dev server
1. `npm run build`: Builds the versioned js and css files to [./dist](./dist)

Tested using [Node.js v12.16.1](https://nodejs.org/en/).
