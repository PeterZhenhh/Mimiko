import codeMapping from "../types/codeMapping";
const invMap = (obj: Record<string, any>) => {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
};
export const getCode = (numPrefix: string, type: "work" | "group"): string => {
    if (numPrefix.length!=2) {
        throw new Error(`[getCode] Invalid prefix length for ${type}: ${numPrefix}`);
    }
    let codePrefix = numPrefix.toString();
    if (parseInt(codePrefix) >= 0) {
        codePrefix = "";
    }
    const mapping: Record<string, string> = invMap(codeMapping[type]);
    if (!Object.hasOwn(mapping, codePrefix)) {
        throw new Error(`[getCode] ${mapping}-${type} has no key named ${codePrefix}`);
    }
    return `${mapping[codePrefix]}${parseInt(codePrefix) >= 0 ? parseInt(codePrefix).toString().padStart(2, "0") : numPrefix.toString()}`;
};

export const getNum = (numPrefix: string, type: "work" | "group"): string => {
    const mapping: Record<string, any> = codeMapping[type];
    if (!Object.hasOwn(mapping, numPrefix)) {
        throw new Error(`[getNum] ${mapping}-${type} has no key named ${numPrefix}`);
    }
    return mapping[numPrefix];
};
