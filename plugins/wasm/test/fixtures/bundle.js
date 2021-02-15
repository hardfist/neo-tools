var __toBinary = false ? (base64) => new Uint8Array(Buffer.from(base64, "base64")) : /* @__PURE__ */ (() => {
  var table = new Uint8Array(128);
  for (var i = 0; i < 64; i++)
    table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
  return (base64) => {
    var n = base64.length, bytes = new Uint8Array((n - (base64[n - 1] == "=") - (base64[n - 2] == "=")) * 3 / 4 | 0);
    for (var i2 = 0, j = 0; i2 < n; ) {
      var c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
      var c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
      bytes[j++] = c0 << 2 | c1 >> 4;
      bytes[j++] = c1 << 4 | c2 >> 2;
      bytes[j++] = c2 << 6 | c3;
    }
    return bytes;
  };
})();

// wasm-binary:/Users/admin/github/neo/plugins/wasm/test/fixtures/sample.wasm
var sample_default = __toBinary("AGFzbQEAAAABBQFgAAF/AwIBAAcIAQRtYWluAAAKBgEEAEEDCw==");

// wasm-virtual:/Users/admin/github/neo/plugins/wasm/test/fixtures/sample.wasm
var sample_default2 = (imports) => WebAssembly.instantiate(sample_default, imports).then((result) => result.instance.exports);

// plugins/wasm/test/fixtures/index.ts
(async () => {
  const sample_module = await sample_default2();
  const result = sample_module.main();
  console.log("result:", result);
})();
