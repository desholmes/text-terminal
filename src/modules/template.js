export default (prompt, separator) => `
  <div class="container">
    <output></output>
    <div class="command">
      <div class="prompt">${prompt}${separator}</div>
      <input class="input" spellcheck="false" autofocus />
    </div>
  </div>
`;
