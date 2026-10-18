/**
 * @fox3000foxy/jailbreak - détecteur de jailbreak / prompt injection (EN+FR).
 *
 * Thin wrapper over the core cross-encoder runtime (`loadGeneralist`) with
 * bundled weights (`models/jailbreak-fp32`), same pattern as
 * `@sabaki-js/generalist`. FP32 bundle (~90 Mo) : l'int8 fait perdre ~0.13
 * d'acc sur les cross-encoders, sans gain de vitesse.
 */
import { definePlugin, loadGeneralist, } from "sabaki";
import manifestData from "./manifest.json" with { type: "json" };
import path from "node:path";
import { fileURLToPath } from "node:url";
const manifest = manifestData;
const QUESTION = "jailbreak?";
const OPTIONS = ["yes", "no"];
/** Dossier des poids mini embarqués (aucun téléchargement requis). */
export const modelDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "models", "jailbreak-fp32");
export function defineJailbreak(modelDirOverride) {
    const classifyAsync = async (input) => {
        // Paresseux : `SABAKI_JAILBREAK_DIR` peut être défini après l'import.
        const dir = modelDirOverride ?? process.env.SABAKI_JAILBREAK_DIR ?? modelDir;
        const r = await loadGeneralist(dir).decide({
            ...input,
            question: input.question ?? QUESTION,
            options: input.options && input.options.length >= 2
                ? input.options
                : OPTIONS,
        });
        return { ...r, domain: "jailbreak" };
    };
    return {
        ...definePlugin({ manifest, classify: classifyAsync }),
        classifyAsync,
    };
}
const plugin = {
    manifest,
    classify: (input) => defineJailbreak().classifyAsync(input),
};
export default plugin;
