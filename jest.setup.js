const { TextDecoder, TextEncoder } = require('node:util');
const { Blob, File } = require('node:buffer');
const { ReadableStream, TransformStream, WritableStream } = require('node:stream/web');
const { BroadcastChannel, MessageChannel, MessagePort } = require('node:worker_threads');

if (global.TextEncoder === undefined) {
  global.TextEncoder = TextEncoder;
}

if (global.TextDecoder === undefined) {
  global.TextDecoder = TextDecoder;
}

if (global.ReadableStream === undefined) {
  global.ReadableStream = ReadableStream;
}

if (global.TransformStream === undefined) {
  global.TransformStream = TransformStream;
}

if (global.WritableStream === undefined) {
  global.WritableStream = WritableStream;
}

if (global.MessageChannel === undefined) {
  global.MessageChannel = MessageChannel;
}

if (global.MessagePort === undefined) {
  global.MessagePort = MessagePort;
}

if (global.BroadcastChannel === undefined) {
  global.BroadcastChannel = BroadcastChannel;
}

const { fetch, FormData, Headers, Request, Response } = require('undici');

if (global.Blob === undefined) {
  global.Blob = Blob;
}

if (global.File === undefined) {
  global.File = File;
}

if (global.fetch === undefined) {
  global.fetch = fetch;
}

if (global.Headers === undefined) {
  global.Headers = Headers;
}

if (global.Request === undefined) {
  global.Request = Request;
}

if (global.Response === undefined) {
  global.Response = Response;
}

if (global.FormData === undefined) {
  global.FormData = FormData;
}
