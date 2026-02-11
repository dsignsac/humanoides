import fs from "node:fs";
import path from "node:path";

/**
 * Utility to fetch data from folders containing info.json files.
 * Used for Projects, Team Members, and Brands.
 */
export const getDataFromFolders = (dirPath: string) => {
  const fullPath = path.resolve(dirPath);
  if (!fs.existsSync(fullPath)) return [];

  try {
    const folders = fs.readdirSync(fullPath);
    return folders
      .map((folder) => {
        const infoPath = path.join(fullPath, folder, "info.json");
        if (fs.existsSync(infoPath)) {
          try {
            const data = JSON.parse(fs.readFileSync(infoPath, "utf-8"));
            return { ...data, folder };
          } catch (e) {
            console.error(`Error parsing JSON in ${infoPath}`, e);
            return null;
          }
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  } catch (err) {
    console.error(`Error reading directory ${fullPath}`, err);
    return [];
  }
};
