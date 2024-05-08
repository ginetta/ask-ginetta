import { Bold } from "@tremor/react";
import Image from "next/image";

export function DanswerInitializingLoader() {
  return (
    <div className="mx-auto animate-pulse">
      <div className="h-24 w-24 mx-auto mb-3">
        <svg viewBox="0 0 400 400" width="100%">
          <path d="M.7.7h400v400H.7z" />
          <path
            d="M200 216.2c-35.9 0-65-29.1-65-65s29.1-65 65-65 65 29.1 65 65-29.1 65-65 65m0 97.6c-35.9 0-65-29.1-65-65h130c0 35.8-29.1 65-65 65"
            fill="currentColor"
          />
        </svg>
      </div>
      <Bold>Initializing Danswer</Bold>
    </div>
  );
}
