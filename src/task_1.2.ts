import csv from "csvtojson";
import fs from "fs";

const CSV_PATH = "src/nodejs-hw1-ex1.csv";
const TXT_PATH = "src/nodejs-hw1-ex1.txt";

const errorListener = (error: Error) => console.error(error);

const readFileStream = fs.createReadStream(CSV_PATH);
readFileStream.on("error", errorListener);

const writeFileStream = fs.createWriteStream(TXT_PATH);
writeFileStream.on("error", errorListener);

readFileStream.pipe(csv()).pipe(writeFileStream);
