import type { IStanza } from "@/types/song";
import React from "react";

type Props = {
  stanza: IStanza;
};

export const Stanza: React.FC<Props> = ({ stanza }) => {
  return (
    <div className="space-y-1">
      <p className="font-bold uppercase w-auto text-sm">{stanza.type}</p>
      <div className="space-y-3">
        {stanza.lines.map((line) => {
          return (
            <div key={line.id}>
              <div className="font-mono relative">
                <div className="opacity-0 cursor-default" aria-hidden>
                  Hidden Spacer
                </div>
                {line.markings?.map((mark) => (
                  <div
                    key={mark.id}
                    className="inline-block text-center bg-stone-200 text-stone-800 font-mono outline-none rounded-sm absolute top-0"
                    style={{ left: `${mark.indent}ch` }}
                  >
                    {mark.mark}
                  </div>
                ))}
              </div>
              <p className="font-mono">{line.lyrics}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
