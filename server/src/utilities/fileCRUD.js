import { promises as fs } from "fs";
import path from "path";

/* ===============================
   Helper: Check File Exists
=================================*/
export async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

/* ===============================
   Create Folder If Not Exists
=================================*/
export async function createFolder(dirPath) {
    await fs.mkdir(dirPath, { recursive: true });
    return "Folder ready";
}

/* ===============================
   Read File
=================================*/
export async function readFile(filePath) {
    try {
        return await fs.readFile(filePath, "utf8");
    } catch (error) {
        throw new Error(`Read Error: ${error.message}`);
    }
}

/* ===============================
   Write File
=================================*/
export async function writeFile(filePath, content) {
    try {
        await createFolder(path.dirname(filePath));
        await fs.writeFile(filePath, content);
        return "File written successfully";
    } catch (error) {
        throw new Error(`Write Error: ${error.message}`);
    }
}

/* ===============================
   Append File
=================================*/
export async function appendFile(filePath, content) {
    try {
        await createFolder(path.dirname(filePath));
        await fs.appendFile(filePath, content);
        return "Content appended";
    } catch (error) {
        throw new Error(`Append Error: ${error.message}`);
    }
}

/* ===============================
   Delete File
=================================*/
export async function deleteFile(filePath) {
    try {
        if (await fileExists(filePath)) {
            await fs.unlink(filePath);
            return "File deleted";
        }
        return "File does not exist";
    } catch (error) {
        throw new Error(`Delete Error: ${error.message}`);
    }
}

/* ===============================
   Save JSON
=================================*/
export async function saveJSON(filePath, data) {
    try {
        await createFolder(path.dirname(filePath));
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return "JSON saved";
    } catch (error) {
        throw new Error(`JSON Save Error: ${error.message}`);
    }
}

/* ===============================
   Read JSON
=================================*/
export async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`JSON Read Error: ${error.message}`);
    }
}

/* ===============================
   Log To File
=================================*/
export async function logToFile(message, logFile = "logs/app.log") {
    const time = new Date().toISOString();
    await appendFile(logFile, `[${time}] ${message}\n`);
}