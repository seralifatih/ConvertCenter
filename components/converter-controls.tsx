import clsx from "clsx";

export function ConverterField({
  children,
  compact = false,
  htmlFor,
  label,
}: Readonly<{
  children: React.ReactNode;
  compact?: boolean;
  htmlFor?: string;
  label: string;
}>) {
  return (
    <div className={clsx("flex min-w-0 flex-col", compact ? "gap-1.5" : "gap-2")}>
      <label className="mono-kicker" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

type ConverterSelectOption<T extends string> = {
  value: T;
  label: string;
};

type ConverterSelectProps<T extends string> = {
  ariaLabel?: string;
  compact?: boolean;
  id?: string;
  onChange: (value: T) => void;
  options: ConverterSelectOption<T>[];
  value: T;
};

export function ConverterSelect<T extends string>({
  ariaLabel,
  compact = false,
  id,
  onChange,
  options,
  value,
}: ConverterSelectProps<T>) {
  return (
    <select
      aria-label={ariaLabel}
      className={clsx(
        "input-surface min-w-0 w-full text-sm",
        compact ? "px-3 py-2" : "px-3 py-2.5",
      )}
      id={id}
      onChange={(event) => onChange(event.target.value as T)}
      value={value}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

type ConverterNumberInputProps = {
  ariaLabel?: string;
  compact?: boolean;
  id?: string;
  onChange: (value: string) => void;
  value: string;
};

export function ConverterNumberInput({
  ariaLabel,
  compact = false,
  id,
  onChange,
  value,
}: ConverterNumberInputProps) {
  return (
    <input
      aria-label={ariaLabel}
      className={clsx(
        "input-surface min-w-0 w-full px-3 font-mono font-medium",
        compact ? "py-2.5 text-[18px]" : "py-3 text-[22px]",
      )}
      id={id}
      inputMode="decimal"
      onChange={(event) => onChange(event.target.value)}
      type="number"
      value={value}
    />
  );
}

export function ConverterReadout({
  ariaLabel,
  className,
  compact = false,
  id,
  unit,
  value,
}: {
  ariaLabel?: string;
  className?: string;
  compact?: boolean;
  id?: string;
  unit: string;
  value: string;
}) {
  return (
    <div
      aria-label={ariaLabel}
      className={clsx(
        "flex min-w-0 w-full items-end gap-2 overflow-hidden rounded-[16px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] px-4",
        compact ? "min-h-[50px] py-2.5" : "min-h-[62px] py-3",
        className,
      )}
      id={id}
      role="status"
    >
      <span
        className={clsx(
          "min-w-0 truncate font-mono font-medium leading-none text-[color:var(--accent)]",
          compact ? "text-[24px]" : "text-3xl",
        )}
      >
        {value}
      </span>
      <span
        className={clsx(
          "shrink-0 font-mono text-[color:var(--accent-text)]/90",
          compact ? "pb-0.5 text-xs" : "pb-1 text-sm",
        )}
      >
        {unit}
      </span>
    </div>
  );
}
