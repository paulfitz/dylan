import fetch from 'node-fetch';

import syllable = require('syllable');

const base = 'http://localhost:8082/complete';

function countSyllables(text: string) {
  return syllable(text);
}

async function complete(preamble: string, show: boolean = false) {
  const result = await fetch(base, {
    method: 'POST',
    body: preamble,
  });
  const text = await result.text();
  if (show) { console.log(`${preamble}//${text}`); }
  return text;
}

async function dylan1() {
  const p = "I've stumbled on the side of twelve misty mountains. I've walked and I've crawled on six crooked highways. I've stepped in the middle of seven sad forests. I've been out in front of a dozen dead oceans.";
  // "I saw" / "I heard" / "I met"
  const p2 = process.argv.slice(2).join(' ') || "I saw";
  const orig = await complete(`${p} ${p2}`);
  let text = orig;
  console.log(`${p2}${orig}`);
  text = text.replace(/[,.;"\n\r].*/g, '');
  if (text.match(/[0-9]/)) { return false; }
  if (text.length < 15 || text.length > 200) { return false; }
  // const ct = text.split(' ').length;
  // if (ct < 3 || ct > 6) { return false; }
  const syllable = countSyllables(text);
  if (syllable < 10 || syllable > 12) { return false; }
  console.log(`>>>`);
  console.log(`>>> I LIKE IT! : ${p2}${text}`);
  console.log(`>>>`);
  return true;
}

async function main() {
  // Silly random seed.
  await complete('Who put the cookie in ' + Math.random());
  for (let i = 0; i < 100; i++) {
    const result = await dylan1();
    if (!result) {
      // nope!
    }
  }
}

main().catch(console.error);
