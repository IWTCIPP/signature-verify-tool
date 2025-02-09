import { Buffer } from "node:buffer";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import process, { argv } from "node:process";
import { Readable } from "node:stream";
import { promisify } from "node:util";

try {
  const args = parseArgs();

  if ("image" in args) {
    const image = await getImage(args.image);

    await verifySignature(
      ...await Promise.all([getSignature(image), removeArtist(image)])
    );
  }

  if ("message" in args) {
    await verifySignature(args.signature, Buffer.from(args.message));
  }
} catch (e) {
  console.error(e?.message);

  process.exitCode = 1;
}



function parseArgs() {
  const args = argv.slice(2);

  if (args.length === 1) {
    return { image: args[0] };
  }

  if (
    args.length === 4 &&
    /^(-m|--message)$/.test(args[0]) &&
    /^(-s|--signature)$/.test(args[2])
  ) {
    return { message: args[1], signature: args[3] };
  }

  if (
    args.length === 4 &&
    /^(-s|--signature)$/.test(args[0]) &&
    /^(-m|--message)$/.test(args[2])
  ) {
    return { signature: args[1], message: args[3] };
  }

  throw new Error("Invalid arguments.");
}

async function getImage(arg) {
  if (/^https:\/\//.test(arg)) {
    console.log(`Downloading ${arg}...`);

    const response = await fetch(arg);

    if (!response.ok) {
      throw new Error(`Request failed. Status code: ${response.status}.`);
    }

    if (response.headers.has("last-modified")) {
      console.log(`Last modified: ${response.headers.get("last-modified")}`);
    }

    return response.bytes();
  }

  return readFile(arg);
}

async function getSignature(image) {
  const artist = await getArtist(image);

  console.log(`Artist: ${artist}`);

  const match = artist.match(/\(signature: ([A-Za-z0-9+/=]+)\)$/);

  if (!match) {
    throw new Error("Failed to extract signature.");
  }

  return match[1];
}

async function getArtist(image) {
  return (await exiftool(["-artist", "-b", "-"], image)).toString();
}

function removeArtist(image) {
  return exiftool(["-artist=", "-"], image);
}

async function exiftool(args, input) {
  const promise = promisify(execFile)(
    "exiftool",
    args,
    {
      encoding: "buffer",
      maxBuffer: Infinity
    }
  );

  const readable = new Readable();

  readable.push(input);
  readable.push(null);

  readable.pipe(promise.child.stdin);

  return (await promise).stdout;
}

async function verifySignature(signature, data) {
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    await importPublicKey(),
    Buffer.from(signature, "base64"),
    data
  );

  console.log(`Signature is ${!valid ? "NOT " : ""}valid.`);
}

function importPublicKey() {
  return crypto.subtle.importKey(
    "spki",
    Buffer.from(
      "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAlYacToSKcapoBkyETYme" +
      "6np1Cgru1yuy/TODpVJXHqwfJB5ELYiVIpslyaP4o3KoCjb1fx0fu7YfDnrRGpj2" +
      "9TRWJjQUQTQ39lf9RYQYlIEkBT8quyqI3LcHTZUS9sKSskw5i1LzP/ZXfZG1nYw1" +
      "NIeKkfSiI6Cv60Da2WvwPc5Pat5eeqNkIegrmOVHYGRJ86OoC+x4VEwhSZgc2qha" +
      "Wf815ngT/IJoqpFYyCVp5bc0HjzLcvBmW8XM5fTfEH+waI6Sgn2z5/iWCz1/bL5P" +
      "XUEcZG6IwRs+2kCQGiRMavT5H1tdKo3a9J+lf7jS2j3U3joXY1i3woudh4EIR7v9" +
      "NXx42KRuPkLQ6lfGJuveP+3lu4xfaaXGk3KRRtH8hQMqUwcJG9wK9J/vP4gr+PQz" +
      "0K6Nm5xcoUCSxVyJ8N9xW3pFB+xodsTo6qUqc6ildOTt+FR4YNOjjVIM8ojAAS9j" +
      "Dp45DyNUbEp7r7Gq5UxKCkXtoDrKIIdtAgwnpeQBEcoCJXmZ5ASlV3j0aYkso583" +
      "i7MG/VFciW9bxBp1vT5lgurn+rdfgsEmtsmJ5x7146NPksUIIkCihpQ7lLoNSwzc" +
      "7YmT4zDafRpRb3nB3m7Av7RhGO8hLrpUqCfxVwgQ+J4nQuCh58TDdI0V23qYojPs" +
      "X5G3uk+YqWt8KPIIEjgsVTUCAwEAAQ==",
      "base64"
    ),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
}
