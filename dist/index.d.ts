/**
 * @sabaki-js/jailbreak - détecteur de jailbreak / prompt injection (EN+FR).
 *
 * Thin wrapper over the core cross-encoder runtime (`loadGeneralist`) with
 * bundled weights (`models/jailbreak-fp32`), same pattern as
 * `@sabaki-js/generalist`. FP32 bundle (~90 Mo) : l'int8 fait perdre ~0.13
 * d'acc sur les cross-encoders, sans gain de vitesse.
 */
import { type ClassifyOutput, type GeneralistInput, type SabakiPlugin } from "sabaki";
/** Dossier des poids mini embarqués (aucun téléchargement requis). */
export declare const modelDir: string;
export declare function defineJailbreak(modelDirOverride?: string): SabakiPlugin & {
    classifyAsync: (input: GeneralistInput) => Promise<ClassifyOutput>;
};
declare const plugin: SabakiPlugin;
export default plugin;
//# sourceMappingURL=index.d.ts.map