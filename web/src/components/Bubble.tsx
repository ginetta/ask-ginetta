export function Bubble({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean;
  onClick?: () => void;
  children: string | JSX.Element;
}) {
  return (
    <div
      className={
        `
      px-3 
      py-1
      rounded-lg 
      border
      border-border
      dark:border-border-dark 
      w-fit 
      flex 
      cursor-pointer ` +
        (isSelected
          ? " bg-hover dark:bg-hover:dark"
          : " bg-background dark:bg-background-dark hover:bg-hover-light dark:hover:bg-hover-light-dark")
      }
      onClick={onClick}
    >
      <div className="my-auto">{children}</div>
    </div>
  );
}
