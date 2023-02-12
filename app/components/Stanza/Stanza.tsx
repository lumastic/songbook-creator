import type { IStanza } from "@/types/song";
import React from "react";

type Props = {
  stanza: IStanza;
};

export const Stanza: React.FC<Props> = ({ stanza }) => {
  return (
    <div className="space-y-1" data-testid="stanza">
      <p className="w-auto text-sm font-bold uppercase">{stanza.type}</p>
      <div className="space-y-3">
        {stanza.lines.map((line) => {
          return (
            <div key={line.id}>
              <div className="relative font-mono">
                <div className="cursor-default opacity-0" aria-hidden>
                  Hidden Spacer
                </div>
                {line.markings?.map((mark) => (
                  <div
                    key={mark.id}
                    className="absolute top-0 inline-block rounded-sm bg-neutral-200 text-center font-mono text-neutral-800 outline-none"
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
