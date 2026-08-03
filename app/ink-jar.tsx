/* eslint-disable @next/next/no-img-element */

export type InkJarState = "filled" | "empty";

type InkJarImageProps = {
  className?: string;
  state: InkJarState;
};

export function InkJarImage({ className, state }: InkJarImageProps) {
  const filled = state === "filled";

  return (
    <img
      alt=""
      aria-hidden="true"
      className={className}
      height={filled ? 1812 : 1533}
      src={filled ? "/ink-jar-filled.png" : "/ink-jar-empty.png"}
      width={filled ? 1422 : 1251}
    />
  );
}

export function InkJar({ state }: { state: InkJarState }) {
  return (
    <span aria-hidden="true" className="theme-jar">
      <InkJarImage className="theme-jar-image" state={state} />
    </span>
  );
}
