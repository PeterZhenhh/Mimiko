import type { SearchWorkIdObj, ObjEncoded } from "./api"
import codeMapping from "./codeMapping"

export type WorkMeta = {
    jFullCode: WorkFullCode,
    age_category: number,
    workTitle: string,
    circleName: string,
    releaseDate: string,
    vas: string[],
    cover: URL["href"],
    dl_count: number,
    review_count: number,
    language_editions: {
        // jCode
        id: number,
        lang: string,
        title: string,
        source_id: string,
        is_original: boolean,
        source_type: "DLSITE"
    }[],
    tags: {
        id: ObjEncoded<SearchWorkIdObj>,
        name: string
    }[],
    rate_average_2dp: number,
    price: number
}

export type RemoteWork = {
    size: number
    page: number
    total: number
    jFullCode: WorkFullCode[]
}

// "RJ" | "BJ" | "VJ"
type WorkNumPrefix = keyof typeof codeMapping.work

// 空 | -2 | -3
type WorkNumberPrefix =
    (typeof codeMapping.work)[WorkNumPrefix]

/**
 * 含有前缀0的8位/不含0的6位作品号转义类型
 * 语义：采用RJ/BJ/VJ类型映射前缀(空/-2/-3) + 数值 拼接而成的标识
 */
export type WorkNumber = string & {
    readonly __WorkNumber__: `${WorkNumberPrefix}${number}`;
};

export type WorkFullCode = `${WorkNumPrefix}${number}`