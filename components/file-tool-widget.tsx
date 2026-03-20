"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  formatBytes,
  getDefaultFileToolControlValues,
  getDefaultFileToolTextInput,
  getFileToolDefinition,
  validateFileToolInput,
} from "@/lib/file-tools/registry";
import type {
  FileToolControlDefinition,
  FileToolDefinition,
  FileToolDownload,
  FileToolId,
  FileToolPreview,
  FileToolResult,
} from "@/lib/file-tools/types";

type FileToolWidgetProps = {
  toolId: FileToolId;
};

function buttonToneClass(disabled = false) {
  return disabled
    ? "cursor-not-allowed border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--muted)]"
    : "border-transparent bg-[color:var(--accent)] text-[color:var(--page)] hover:opacity-90";
}

function actionLinkClass() {
  return "inline-flex items-center justify-center rounded-full border border-[color:var(--border)] px-3 py-1.5 text-[11px] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-surface)] hover:text-[color:var(--accent-text)]";
}

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

function makeFileKey(file: File) {
  return `${file.name}-${file.lastModified}-${file.size}`;
}

function mergeSelectedFiles(currentFiles: File[], nextFiles: File[], multiple: boolean) {
  if (!multiple) {
    return nextFiles.slice(0, 1);
  }

  const merged = [...currentFiles];
  const seen = new Set(currentFiles.map(makeFileKey));

  nextFiles.forEach((file) => {
    const fileKey = makeFileKey(file);

    if (!seen.has(fileKey)) {
      seen.add(fileKey);
      merged.push(file);
    }
  });

  return merged;
}

function moveItem<T>(items: T[], fromIndex: number, direction: -1 | 1) {
  const nextIndex = fromIndex + direction;

  if (nextIndex < 0 || nextIndex >= items.length) {
    return items;
  }

  const nextItems = [...items];
  const [item] = nextItems.splice(fromIndex, 1);
  nextItems.splice(nextIndex, 0, item);
  return nextItems;
}

function FileToolControlField({
  control,
  onChange,
  value,
}: {
  control: FileToolControlDefinition;
  onChange: (nextValue: boolean | string) => void;
  value: boolean | string;
}) {
  if (control.type === "checkbox") {
    return (
      <label className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
        <input
          checked={Boolean(value)}
          className="mt-1"
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        <span className="space-y-1">
          <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--text)]">
            {control.label}
          </span>
          {control.helpText ? (
            <span className="block text-xs leading-6 text-[color:var(--muted)]">
              {control.helpText}
            </span>
          ) : null}
        </span>
      </label>
    );
  }

  const baseInputClass =
    "input-surface w-full px-3 py-3 font-mono text-sm text-[color:var(--text)]";

  return (
    <label className="space-y-2">
      <span className="mono-kicker">{control.label}</span>
      {control.type === "select" ? (
        <select
          className={baseInputClass}
          onChange={(event) => onChange(event.target.value)}
          value={typeof value === "string" ? value : ""}
        >
          {control.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : control.type === "textarea" ? (
        <textarea
          className={`${baseInputClass} min-h-28 resize-y`}
          onChange={(event) => onChange(event.target.value)}
          placeholder={control.placeholder}
          rows={control.rows ?? 5}
          value={typeof value === "string" ? value : ""}
        />
      ) : (
        <input
          className={baseInputClass}
          max={control.max}
          min={control.min}
          onChange={(event) => onChange(event.target.value)}
          placeholder={control.placeholder}
          step={control.step}
          type={control.type}
          value={typeof value === "string" ? value : ""}
        />
      )}
      {control.helpText ? (
        <p className="text-xs leading-6 text-[color:var(--muted)]">{control.helpText}</p>
      ) : null}
    </label>
  );
}

function ResultPreview({
  downloadUrls,
  preview,
}: {
  downloadUrls: string[];
  preview: FileToolPreview;
}) {
  if (preview.kind === "image") {
    return (
      <div className="space-y-2">
        <div className="mono-kicker">{preview.label}</div>
        <img
          alt={preview.alt}
          className="max-h-72 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--page)] object-contain"
          src={downloadUrls[preview.downloadIndex]}
        />
      </div>
    );
  }

  if (preview.kind === "image-gallery") {
    return (
      <div className="space-y-2">
        <div className="mono-kicker">{preview.label}</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {preview.items.map((item) => (
            <div
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--page)] px-3 py-3"
              key={`${item.label}-${item.downloadIndex}`}
            >
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--muted-strong)]">
                {item.label}
              </div>
              <img
                alt={item.alt}
                className="mx-auto max-h-28 w-full object-contain"
                src={downloadUrls[item.downloadIndex]}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (preview.kind === "list") {
    return (
      <div className="space-y-2">
        <div className="mono-kicker">{preview.label}</div>
        <ul className="space-y-2 text-sm leading-7 text-[color:var(--muted)]">
          {preview.items.map((item) => (
            <li
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--page)] px-3 py-2"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="mono-kicker">{preview.label}</div>
      <textarea
        className="input-surface min-h-56 w-full resize-y px-3 py-3 font-mono text-sm"
        readOnly
        value={preview.text}
      />
    </div>
  );
}

export function FileToolWidget({ toolId }: FileToolWidgetProps) {
  const resolvedTool = getFileToolDefinition(toolId);
  if (!resolvedTool) {
    throw new Error(`Unknown file tool: ${toolId}`);
  }
  const tool: FileToolDefinition = resolvedTool;

  const textAreaId = useId();
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [textInput, setTextInput] = useState(getDefaultFileToolTextInput(tool));
  const [controls, setControls] = useState<Record<string, boolean | string>>(
    getDefaultFileToolControlValues(tool),
  );
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [result, setResult] = useState<FileToolResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const sourcePreviewUrls = useMemo(
    () =>
      files.map((file) =>
        isImageFile(file) &&
        typeof URL !== "undefined" &&
        typeof URL.createObjectURL === "function"
          ? URL.createObjectURL(file)
          : "",
      ),
    [files],
  );
  const resultDownloadUrls = useMemo(
    () =>
      (result?.downloads ?? []).map((download) =>
        typeof URL !== "undefined" && typeof URL.createObjectURL === "function"
          ? URL.createObjectURL(download.blob)
          : "",
      ),
    [result],
  );

  useEffect(() => {
    return () => {
      sourcePreviewUrls.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [sourcePreviewUrls]);

  useEffect(() => {
    return () => {
      resultDownloadUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [resultDownloadUrls]);

  function resetResults() {
    setErrorMessages([]);
    setResult(null);
  }

  function handleFilesSelected(nextFiles: File[]) {
    const isMultiple = tool.source.kind === "file" ? Boolean(tool.source.multiple) : false;

    setFiles((currentFiles) =>
      mergeSelectedFiles(currentFiles, nextFiles, isMultiple),
    );
    resetResults();
  }

  function handleRemoveFile(index: number) {
    setFiles((currentFiles) => currentFiles.filter((_, currentIndex) => currentIndex !== index));
    resetResults();
  }

  function handleMoveFile(index: number, direction: -1 | 1) {
    setFiles((currentFiles) => moveItem(currentFiles, index, direction));
    resetResults();
  }

  function handleReset() {
    setFiles([]);
    setTextInput(getDefaultFileToolTextInput(tool));
    setControls(getDefaultFileToolControlValues(tool));
    setErrorMessages([]);
    setResult(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleRun() {
    const validation = validateFileToolInput(tool, {
      files,
      textInput,
    });

    if (!validation.isValid) {
      setErrorMessages(validation.errors);
      setResult(null);
      return;
    }

    setIsRunning(true);
    setErrorMessages([]);

    try {
      const nextResult = await tool.run({
        controls,
        files,
        textInput,
      });

      setResult(nextResult);
    } catch (error) {
      const message = error instanceof Error ? error.message : "The tool could not complete the request.";
      setErrorMessages([message]);
      setResult(null);
    } finally {
      setIsRunning(false);
    }
  }

  function renderSourcePanel() {
    if (tool.source.kind === "text") {
      return (
        <div className="space-y-2">
          <label className="mono-kicker" htmlFor={textAreaId}>
            {tool.source.label}
          </label>
          <textarea
            className="input-surface min-h-60 w-full resize-y px-3 py-3 font-mono text-sm"
            id={textAreaId}
            onChange={(event) => {
              setTextInput(event.target.value);
              resetResults();
            }}
            placeholder={tool.source.placeholder}
            rows={tool.source.rows ?? 10}
            spellCheck={tool.source.spellCheck}
            value={textInput}
          />
        </div>
      );
    }

    const source = tool.source;
    const dropLabel =
      source.multiple && source.maxFiles
        ? `Drop up to ${source.maxFiles} files or click to browse`
        : "Drop a file here or click to browse";

    return (
      <div className="space-y-3">
        <input
          accept={source.accept}
          className="hidden"
          id={fileInputId}
          multiple={source.multiple}
          onChange={(event) => {
            const nextFiles = Array.from(event.target.files ?? []);
            handleFilesSelected(nextFiles);
          }}
          ref={fileInputRef}
          type="file"
        />

        <label
          className={`flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed px-5 py-6 text-center transition ${
            isDragging
              ? "border-[color:var(--accent)] bg-[color:var(--accent-surface)]"
              : "border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--accent)]"
          }`}
          htmlFor={fileInputId}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFilesSelected(Array.from(event.dataTransfer.files ?? []));
          }}
        >
          <div className="mono-kicker">{tool.source.label}</div>
          <p className="mt-2 max-w-sm text-sm leading-7 text-[color:var(--muted)]">{dropLabel}</p>
          <p className="mt-2 text-xs leading-6 text-[color:var(--muted)]">
            Accepted types: {source.accept}
          </p>
        </label>

        {files.length ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="mono-kicker">selected files</span>
              <span className="section-badge">{files.length}</span>
            </div>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3"
                  key={makeFileKey(file)}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="font-mono text-sm text-[color:var(--text)]">{file.name}</p>
                      <p className="text-xs leading-6 text-[color:var(--muted)]">
                        {formatBytes(file.size)}
                        {file.type ? ` • ${file.type}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {source.multiple ? (
                        <>
                          <PillButton
                            aria-label={`Move ${file.name} up`}
                            onClick={() => handleMoveFile(index, -1)}
                          >
                            move up
                          </PillButton>
                          <PillButton
                            aria-label={`Move ${file.name} down`}
                            onClick={() => handleMoveFile(index, 1)}
                          >
                            move down
                          </PillButton>
                        </>
                      ) : null}
                      <PillButton
                        aria-label={`Remove ${file.name}`}
                        onClick={() => handleRemoveFile(index)}
                      >
                        remove
                      </PillButton>
                    </div>
                  </div>
                  {source.preview === "image" && sourcePreviewUrls[index] ? (
                    <img
                      alt={file.name}
                      className="mt-3 max-h-48 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--page)] object-contain"
                      src={sourcePreviewUrls[index]}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[0.96fr_1.04fr]">
        <div className="space-y-4">
          <div className="rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
            <div className="mono-kicker mb-2">tool workflow</div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">{tool.hint}</p>
            {tool.source.helperText ? (
              <p className="mt-2 text-xs leading-6 text-[color:var(--muted)]">
                {tool.source.helperText}
              </p>
            ) : null}
          </div>

          {renderSourcePanel()}

          {tool.controls?.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {tool.controls.map((control) => (
                <FileToolControlField
                  control={control}
                  key={control.id}
                  onChange={(nextValue) => {
                    setControls((currentControls) => ({
                      ...currentControls,
                      [control.id]: nextValue,
                    }));
                    resetResults();
                  }}
                  value={controls[control.id] ?? control.defaultValue}
                />
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              className={`rounded-full px-4 py-2 text-xs font-medium ${buttonToneClass(isRunning)}`}
              disabled={isRunning}
              onClick={handleRun}
              type="button"
            >
              {isRunning ? "processing..." : tool.actionLabel}
            </button>
            <PillButton aria-label={`Reset ${tool.title}`} onClick={handleReset}>
              reset
            </PillButton>
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result panel</span>
            <span className="section-badge">{result ? "ready" : "waiting"}</span>
          </div>

          {errorMessages.length ? (
            <div className="mb-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3">
              <div className="mono-kicker mb-2 text-rose-200">error</div>
              <ul className="space-y-2 text-sm leading-7 text-rose-50">
                {errorMessages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/35 px-4 py-4">
                <div className="font-mono text-xl text-[color:var(--accent)]">{result.summary}</div>
                {result.detail ? (
                  <p className="mt-2 text-sm leading-7 text-[color:var(--accent-text)]">
                    {result.detail}
                  </p>
                ) : null}
              </div>

              {result.metrics?.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.metrics.map((metric) => (
                    <div
                      className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-3"
                      key={metric.label}
                    >
                      <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">
                        {metric.label}
                      </div>
                      <p className="font-mono text-base text-[color:var(--accent)]">{metric.value}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {result.preview ? (
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                  <ResultPreview downloadUrls={resultDownloadUrls} preview={result.preview} />
                </div>
              ) : null}

              {result.warnings?.length ? (
                <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3">
                  <div className="mono-kicker mb-2 text-amber-100">warnings</div>
                  <ul className="space-y-2 text-sm leading-7 text-amber-50">
                    {result.warnings.map((warning) => (
                      <li key={warning}>{warning}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {result.copyText ? <CopyButton idleLabel="copy output" text={result.copyText} /> : null}
                {(result.downloads ?? []).map((download: FileToolDownload, index) => (
                  <a
                    className={actionLinkClass()}
                    download={download.fileName}
                    href={resultDownloadUrls[index]}
                    key={`${download.fileName}-${index}`}
                  >
                    {download.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
              <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                Select or paste the source content, adjust any settings you need, and run the tool
                to see the preview, downloads, and copy actions here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
