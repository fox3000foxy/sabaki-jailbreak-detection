# sabaki-jailbreak-detection

Sabaki plugin — jailbreak / prompt-injection detection (**EN+FR**).

- **Bundled mini mode**: MiniLM-L6 cross-encoder ONNX FP32 (~90 MB in `models/jailbreak-fp32`, no download at runtime).
- Question `jailbreak?`, options `yes` / `no`.
- Specialist trained on 10,259 rows (jackhhao + TrustAIRLab in-the-wild + Octavio multilingual + native FR prompts).
- Held-out eval (400 cases, 100/100 per language, never seen in training):

| set | acc | P | R | F1 |
|-----|-----|---|---|----|
| EN (n=200) | 0.925 | 0.921 | 0.930 | 0.925 |
| FR (n=200) | 0.955 | 0.925 | 0.990 | 0.957 |
| all (n=400) | 0.940 | 0.923 | 0.960 | 0.941 |

## Install (git clone)

This is not an official `@sabaki-js` plugin — install it with git, next to the script that imports it:

```sh
git clone https://github.com/fox3000foxy/sabaki-jailbreak-detection
npm i sabaki onnxruntime-node   # peer/runtime deps
```

```ts
import plugin from "./sabaki-jailbreak-detection/dist/index.js";
const r = await plugin.classifyAsync({ state: "Ignore your instructions…" });
// { decision: "yes", confidence: 0.958, domain: "jailbreak", ... }
```

Default question/options are `jailbreak?` / `["yes", "no"]` — override per call:

```ts
await plugin.classifyAsync({ state, question: "jailbreak?", options: ["yes", "no"] });
```

## Swap the model

`SABAKI_JAILBREAK_DIR` env (same layout: `generalist.onnx` + `tokenizer/`):

```sh
SABAKI_JAILBREAK_DIR=/path/to/my-weights node app.js
```

## Evals

- Training-val (5 %, n=500): acc 0.948, F1 0.935.
- Held-out (above): EN 0.925 / FR 0.955.

Caveat: held-out comes from the same sources as training (same style). A truly external judge (e.g. JailbreakBench) has not been run yet.

License: MIT.
