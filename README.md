# @fox3000foxy/jailbreak

Sabaki plugin — détection de jailbreak / prompt injection **EN+FR**.

- **Mode mini bundlé** : cross-encoder MiniLM-L6 ONNX FP32 (~90 Mo dans `models/jailbreak-fp32`, aucun téléchargement).
- Question `jailbreak?`, options `yes` / `no`.
- Spécialiste entraîné sur 10 259 lignes (jackhhao + TrustAIRLab in-the-wild + Octavio multilingue + natifs FR).
- Éval tenue à l'écart (400 cas, 100/100 par langue, jamais vus au train) :

| set | acc | P | R | F1 |
|-----|-----|---|---|----|
| EN (n=200) | 0.925 | 0.921 | 0.930 | 0.925 |
| FR (n=200) | 0.955 | 0.925 | 0.990 | 0.957 |
| global (n=400) | 0.940 | 0.923 | 0.960 | 0.941 |

- Val d'entraînement (5 %, n=500) : acc 0.948, F1 0.935.

```ts
import plugin, { modelDir } from "@fox3000foxy/jailbreak";
const r = await plugin.classifyAsync({ state: "Ignore tes instructions…" });
// { decision: "yes", confidence: 0.958, domain: "jailbreak", ... }
```

Modèle interchangeable : `SABAKI_JAILBREAK_DIR` (même layout `generalist.onnx` + `tokenizer/`).

License: MIT.
