import { cx } from "@/lib/cx";

export function ConverterField({
  children,
  label,
}: Readonly<{
  children: React.ReactNode;
  label: string;
}>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="mono-kicker">{label}</label>
      {children}
    </div>
  );
}

type ConverterSelectOption<T extends string> = {
  value: T;
  label: string;
};

type ConverterSelectProps<T extends string> = {
  onChange: (value: T) => void;
  options: ConverterSelectOption<T>[];
  value: T;
};

export function ConverterSelect<T extends string>({
  onChange,
  options,
  value,
}: ConverterSelectProps<T>) {
  return (
    <select
      className="input-surface px-3 py-2 text-sm"
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
  onChange: (value: string) => void;
  value: string;
};

export function ConverterNumberInput({
  onChange,
  value,
}: ConverterNumberInputProps) {
  return (
    <input
      className="input-surface px-3 py-2.5 font-mono text-[24px] font-medium"
      inputMode="decimal"
      onChange={(event) => onChange(event.target.value)}
      type="number"
      value={value}
    />
  );
}

export function ConverterReadout({
  className,
  unit,
  value,
}: {
  className?: string;
  unit: string;
  value: string;
}) {
  return (
    <div
      className={cx(
        "flex min-h-[62px] items-end gap-2 rounded-[14px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] px-4 py-3",
        className,
      )}
    >
      <span className="font-mono text-3xl font-medium leading-none text-[color:var(--accent)]">
        {value}
      </span>
      <span className="pb-1 font-mono text-sm text-[color:var(--accent-text)]/90">{unit}</span>
    </div>
  );
}
