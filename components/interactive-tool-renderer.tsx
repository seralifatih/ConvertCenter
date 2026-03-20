import { DbmToWattsWidget } from "@/components/dbm-to-watts-widget";
import { ElectricalPowerWidget } from "@/components/electrical-power-widget";
import { FileToolWidget } from "@/components/file-tool-widget";
import { GeneratorToolWidget } from "@/components/generator-tool-widget";
import { HashGeneratorWidget } from "@/components/hash-generator-widget";
import { JwtDecoderWidget } from "@/components/jwt-decoder-widget";
import { MeasurementFamilyConverterWidget } from "@/components/measurement-family-converter-widget";
import { ReadabilityCheckerWidget } from "@/components/readability-checker-widget";
import { RegexTesterWidget } from "@/components/regex-tester-widget";
import { TextDiffWidget } from "@/components/text-diff-widget";
import { UtilityToolWidget } from "@/components/utility-tool-widget";
import { UuidGeneratorWidget } from "@/components/uuid-generator-widget";
import { UvIndexWidget } from "@/components/uv-index-widget";
import { CronExpressionWidget } from "@/components/cron-expression-widget";
import type { InteractiveToolWidgetConfig } from "@/lib/content/interactive-tools";

export function InteractiveToolRenderer({
  widget,
}: {
  widget: InteractiveToolWidgetConfig;
}) {
  if (widget.kind === "file-tool") {
    return <FileToolWidget toolId={widget.toolId} />;
  }

  if (widget.kind === "utility-tool") {
    return <UtilityToolWidget toolId={widget.toolId} />;
  }

  if (widget.kind === "measurement-family") {
    return (
      <MeasurementFamilyConverterWidget
        defaultFromUnitKey={widget.defaultFromUnitKey}
        defaultToUnitKey={widget.defaultToUnitKey}
        defaultValue={widget.defaultValue}
        familyKey={widget.familyKey}
      />
    );
  }

  if (widget.kind === "electrical-power") {
    return (
      <ElectricalPowerWidget
        defaultAmps={widget.defaultAmps}
        defaultPowerFactor={widget.defaultPowerFactor}
        defaultVolts={widget.defaultVolts}
        defaultWatts={widget.defaultWatts}
        mode={widget.mode}
      />
    );
  }

  if (widget.kind === "dbm-to-watts") {
    return <DbmToWattsWidget defaultDbm={widget.defaultDbm} />;
  }

  if (widget.kind === "readability-checker") {
    return <ReadabilityCheckerWidget defaultText={widget.defaultText} />;
  }

  if (widget.kind === "text-diff") {
    return (
      <TextDiffWidget
        defaultLeftText={widget.defaultLeftText}
        defaultRightText={widget.defaultRightText}
      />
    );
  }

  if (widget.kind === "generator-tool") {
    return <GeneratorToolWidget toolId={widget.toolId} />;
  }

  if (widget.kind === "regex-tester") {
    return (
      <RegexTesterWidget
        defaultFlags={widget.defaultFlags}
        defaultPattern={widget.defaultPattern}
        defaultSampleText={widget.defaultSampleText}
      />
    );
  }

  if (widget.kind === "jwt-decoder") {
    return <JwtDecoderWidget defaultToken={widget.defaultToken} />;
  }

  if (widget.kind === "cron-expression") {
    return (
      <CronExpressionWidget
        defaultDayOfMonth={widget.defaultDayOfMonth}
        defaultDayOfWeek={widget.defaultDayOfWeek}
        defaultHour={widget.defaultHour}
        defaultMinute={widget.defaultMinute}
        defaultPreset={widget.defaultPreset}
      />
    );
  }

  if (widget.kind === "uuid-generator") {
    return <UuidGeneratorWidget defaultCount={widget.defaultCount} />;
  }

  if (widget.kind === "hash-generator") {
    return <HashGeneratorWidget defaultText={widget.defaultText} />;
  }

  return <UvIndexWidget defaultValue={widget.defaultValue} mode={widget.mode} />;
}
