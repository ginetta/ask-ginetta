import { Persona } from "@/app/admin/assistants/interfaces";
import { CustomDropdown, DefaultDropdownElement } from "../Dropdown";
import { FiChevronDown } from "react-icons/fi";

export function PersonaSelector({
  personas,
  selectedPersonaId,
  onPersonaChange,
}: {
  personas: Persona[];
  selectedPersonaId: number;
  onPersonaChange: (persona: Persona) => void;
}) {
  const currentlySelectedPersona = personas.find(
    (persona) => persona.id === selectedPersonaId
  );

  return (
    <CustomDropdown
      dropdown={
        <div
          className={`
            border 
            border-border 
            dark:border-border-dark
            bg-background
            dark:bg-background-dark
            rounded-lg 
            flex 
            flex-col 
            w-64 
            max-h-96 
            overflow-y-auto 
            flex
            overscroll-contain`}
        >
          {personas.map((persona, ind) => {
            const isSelected = persona.id === selectedPersonaId;
            return (
              <DefaultDropdownElement
                key={persona.id}
                name={persona.name}
                onSelect={() => onPersonaChange(persona)}
                isSelected={isSelected}
              />
            );
          })}
        </div>
      }
    >
      <div className="select-none text-sm font-bold flex text-emphasis dark:text-emphasis-dark px-2 py-1.5 cursor-pointer w-fit hover:bg-hover dark:hover:bg-hover-dark rounded">
        {currentlySelectedPersona?.name || "Default"}
        <FiChevronDown className="my-auto ml-2" />
      </div>
    </CustomDropdown>
  );
}
