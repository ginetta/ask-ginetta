export function BasicClickable({
  children,
  onClick,
  fullWidth = false,
}: {
  children: string | JSX.Element;
  onClick?: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        border 
        border-border 
        dark:border-border-dark
        shadow-md
        rounded
        font-medium 
        text-emphasis 
        dark:text-emphasis-dark
        text-sm
        p-1
        select-none
        hover:bg-hover
        dark:hover:bg-hover-dark
        ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}

export function EmphasizedClickable({
  children,
  onClick,
  fullWidth = false,
}: {
  children: string | JSX.Element;
  onClick?: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        border 
        border-border 
        dark:border-border-dark
        shadow-md
        rounded
        font-medium 
        text-emphasis
        dark:text-emphasis-dark
        text-sm
        p-1
        select-none
        bg-hover-light
        dark:bg-hover-light-dark
        hover:bg-hover
        dark:hover:bg-hover-dark
        ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}

export function BasicSelectable({
  children,
  selected,
  hasBorder,
  fullWidth = false,
}: {
  children: string | JSX.Element;
  selected: boolean;
  hasBorder?: boolean;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`
        rounded
        font-medium 
        text-emphasis 
        dark:text-emphasis-dark
        text-sm
        p-1
        select-none
        ${hasBorder ? "border border-border dark:border-border-dark" : ""}
        ${
          selected
            ? "bg-hover dark:bg-hover-dark"
            : "hover:bg-hover dark:hover:bg-hover-dark"
        }
        ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </div>
  );
}
