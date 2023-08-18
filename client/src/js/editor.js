import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    const localData = localStorage.getItem("content");
    let initialValue = header; // Set the initial value to the header

    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: initialValue,
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, append the value stored in indexeddb below the header.
    getDb().then((data) => {
      const storedContent = data && data.length ? data[0].jedi : null;

      if (storedContent) {
        this.editor.setValue(storedContent);
      } else if (localData) {
        this.editor.setValue(localData);
      }
    });

    // Save the entire content of the editor when it loses focus
    this.editor.on("blur", () => {
      const currentContent = this.editor.getValue();

      localStorage.setItem("content", currentContent);
      putDb(currentContent);
    });
  }
}
