import * as codeReader from "./codeReader";
import type { WorkNumber, WorkFullCode } from "@/types/workMeta";

export const toCode = (jNum: WorkNumber): WorkFullCode => {
    return `${codeReader.getCode(jNum.toString().slice(0, 2), "work")}${jNum.toString().slice(2)}` as WorkFullCode;
};

export const toNum = (jFullCode: WorkFullCode): WorkNumber => {
    return `${codeReader.getNum(jFullCode.slice(0, 2), "work")}${jFullCode.toString().slice(2)}` as WorkNumber;
};
