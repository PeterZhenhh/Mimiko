import type { TrackRespFunc, BaseTrackFile } from "@/types/api";
import type { WorkFullCode } from "@/types/workMeta";
import { tracks as tracks_jasmr } from "./jasmr";
import { tracks as tracks_hentaiasmr } from "./hentaiasmr";
import { tracks as tracks_japaneseasmr } from "./japaneseasmr";
import { tracks as tracks_asmr18fans } from "./asmr18fans";
import { tracks as tracks_asmrone } from "./asmrone";

export default async ({
    jFullCode,
}: TrackRespFunc["params"]): Promise<TrackRespFunc["result"][]> => {
    const tracks: BaseTrackFile[] = await tracks_asmrone({ jFullCode })
        .catch(() =>
            Promise.any([
                tracks_jasmr({ jFullCode }),
                tracks_japaneseasmr({ jFullCode }),
                tracks_hentaiasmr({ jFullCode }),
                tracks_asmr18fans({ jFullCode }),
            ]),
        )
        .catch(() => []);

    function convertTrack(
        track: BaseTrackFile,
        jFullCode: WorkFullCode,
    ): TrackRespFunc["result"] {
        if (track.type === "folder") {
            return {
                type: "folder",
                title: track.fileName,
                children: track.children.map((child) =>
                    convertTrack(child, jFullCode),
                ),
            };
        }
        return {
            type: track.type,
            hash: track.hash ?? "",
            title: track.fileName,
            work: {
                id: 0,
                source_id: jFullCode,
                source_type: "DLSITE",
            },
            workTitle: "",
            mediaStreamUrl: track.fileUrl,
            mediaDownloadUrl: track.fileUrl,
            streamLowQualityUrl: track.fileUrl,
            duration: track.duration ?? 0,
            size: track.size ?? 0,
        };
    }
    const ret = tracks.map((track) =>
        convertTrack(track, `${jFullCode}`),
    ) as TrackRespFunc["result"][];
    return ret;
};
