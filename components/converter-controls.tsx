import clsx from "clsx";

export function ConverterField({
  children,
  htmlFor,
  label,
}: Readonly<{
  children: React.ReactNode;
  htmlFor?: string;
  label: string;
}>) {
  return (
    <div className="flex flex-col gap-2">
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
  id?: string;
  onChange: (value: T) => void;
  options: ConverterSelectOption<T>[];
  value: T;
};

export function ConverterSelect<T extends string>({
  ariaLabel,
  id,
  onChange,
  options,
  value,
}: ConverterSelectProps<T>) {
  return (
    <select
      aria-label={ariaLabel}
      className="input-surface px-3 py-2.5 text-sm"
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
  id?: string;
  onChange: (value: string) => void;
  value: string;
};

export function ConverterNumberInput({
  ariaLabel,
  id,
  onChange,
  value,
}: ConverterNumberInputProps) {
  return (
    <input
      aria-label={ariaLabel}
      className="input-surface px-3 py-3 font-mono text-[22px] font-medium"
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
  id,
  unit,
  value,
}: {
  ariaLabel?: string;
  className?: string;
  id?: string;
  unit: string;
  value: string;
}) {
  return (
    <div
      aria-label={ariaLabel}
      className={clsx(
        "flex min-h-[62px] items-end gap-2 rounded-[16px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] px-4 py-3",
        className,
      )}
      id={id}
      role="status"
    >
      <span className="font-mono text-3xl font-medium leading-none text-[color:var(--accent)]">
        {value}
      </span>
      <span className="pb-1 font-mono text-sm text-[color:var(--accent-text)]/90">{unit}</span>
    </div>
  );
}
