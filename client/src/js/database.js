import { openDB } from "idb";

const initdb = async () =>
  openDB("JEDI", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("JEDI")) {
        console.log("JEDI database already exists");
        return;
      }
      db.createObjectStore("JEDI", { keyPath: "id", autoIncrement: true });
      console.log("JEDI database created");
    },
  });

// Saves content to the database
export const putDb = async (content) => {
  const jediDb = await openDB("JEDI", 1);
  const tx = jediDb.transaction("JEDI", "readwrite");
  const store = tx.objectStore("JEDI");
  const request = store.add({ jedi: content });

  return request;
};

// Gets all content from the database
export const getDb = async () => {
  const jediDb = await openDB("JEDI", 1);
  const tx = jediDb.transaction("JEDI", "readonly");
  const store = tx.objectStore("JEDI");
  const contents = await store.getAll();

  return contents;
};

initdb();
