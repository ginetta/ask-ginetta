export function HeaderWrapper({
  children,
}: {
  children: JSX.Element | string;
}) {
  return (
    <header className="border-b border-border bg-background-emphasis dark:bg-background-emphasis-dark dark:border-border-dark">
      <div className="mx-8 h-16">{children}</div>
    </header>
  );
}
