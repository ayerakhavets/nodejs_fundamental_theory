import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const reverseText = (text: String): String => text.split('').reverse().join('');

const rl = readline.createInterface({ input, output });

async function reverseInput() {
  try {
    const answer = await rl.question('Type a string to reverse: ');
    console.log(`Reversed string: ${reverseText(answer)}`);
    reverseInput();
  } catch (_) {
    rl.close();
  }
}

(async () => reverseInput())();
