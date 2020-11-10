# Text Terminal

A simple, extendable terminal interface for the web, used by [text-quest](https://github.com/desholmes/text-quest).

## Usage

### Option 1 Use the CSS and JavaScript in your HTML

Follow the example below to include the CSS and JavaScript directly into your HTML page:

```html
<html>
    <head>
        <!-- CSS for Text Terminal -->
        <link href="text-terminal-0.1.0.css" rel="stylesheet">
    </head>
    <body>
        <!-- Container for Text Terminal -->
        <div id="text-terminal"></div>
        <!-- JavaScript for Text Terminal -->
        <script src="text-terminal-0.1.0.js"></script>
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

Using a bundler (like [Parcel](https://parceljs.org/)) install Text Terminal using npm:

```sh
  npm install text-terminal --save-dev
```

or yarn:

```sh
  yarn add text-terminal
```

Then, import and initialise Text Terminal into your project:

```javascript
import TextTerminal from "text-terminal";

const commands = {};

const config = {
  containerId = "text-terminal",
  prompt: "textTerm@quest",
  theme: "dark",
  commands: commands,
};

const terminal = new TextTerminal(config);
```

## Themes

Text Terminal has the following themes bundled with it:

### Dark

```javascript
const config = {
    theme: "dark",
};
```

![dark](https://camo.githubusercontent.com/5b9ae64751384c654f9a63e4fffbfd5b6b7135df88b5435d0c8c44946025e4ad/68747470733a2f2f692e696d6775722e636f6d2f7952746237334a2e676966)

## Default Commands

The following commands can be overwritten with your own custom commands.

## Methods

These methods are exposed by Text Terminal for you to use:

---

## Development Commands

If you're interested in contributing use the commands below:

1. `npm`: Install deps
1. `npm start`: Start local dev server
1. `npm run build`: Builds the versioned js and css files to [./dist](./dist)

Tested using [Node.js v12.16.1](https://nodejs.org/en/).
