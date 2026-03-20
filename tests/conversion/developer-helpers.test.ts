import { describe, expect, it } from "vitest";
import {
  buildCronExpression,
  decodeJwt,
  describeCronSchedule,
  generateHashes,
  generateUuidList,
  md5Hex,
  normalizeCronSchedule,
  sha256Hex,
  testRegexPattern,
} from "../../lib/conversion/developer-helpers";

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

describe("developer helper logic", () => {
  it("normalizes cron schedules and builds 5-field expressions", () => {
    const normalized = normalizeCronSchedule({
      dayOfMonth: 99,
      dayOfWeek: -1,
      hour: 25,
      minute: 72,
      preset: "weekly",
    });

    expect(normalized).toEqual({
      dayOfMonth: 31,
      dayOfWeek: 0,
      hour: 23,
      minute: 59,
      preset: "weekly",
    });
    expect(buildCronExpression(normalized)).toBe("59 23 * * 0");
    expect(describeCronSchedule(normalized)).toBe("Runs every Sunday at 23:59.");
    expect(buildCronExpression({ preset: "everyMinute" })).toBe("* * * * *");
  });

  it("tests regex patterns with captures and invalid-pattern handling", () => {
    const result = testRegexPattern("\\b(error|warning)\\b", "gi", "warning\nok\nerror");

    if ("error" in result) {
      throw new Error(`Expected matches, received error: ${result.error}`);
    }

    expect(result.totalMatches).toBe(2);
    expect(result.matches[0]).toMatchObject({
      captures: ["warning"],
      fullMatch: "warning",
      index: 0,
    });
    expect(testRegexPattern("[", "", "sample")).toMatchObject({
      error: expect.any(String),
      matches: [],
      totalMatches: 0,
    });
  });

  it("decodes JWT payloads and reports malformed tokens clearly", () => {
    const token = [
      toBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" })),
      toBase64Url(JSON.stringify({ sub: "123", exp: 4102444800, role: "admin" })),
      "signature",
    ].join(".");
    const decoded = decodeJwt(token);

    if ("error" in decoded) {
      throw new Error(`Expected decoded JWT, received error: ${decoded.error}`);
    }

    expect(decoded.header).toMatchObject({ alg: "HS256", typ: "JWT" });
    expect(decoded.payload).toMatchObject({ sub: "123", role: "admin" });
    expect(decoded.signature).toBe("signature");
    expect(decoded.isExpired).toBe(false);
    expect(decodeJwt("not-a-jwt")).toEqual({
      error: "JWTs must contain header, payload, and signature segments.",
    });
  });

  it("generates UUID v4 values in the expected format", () => {
    const uuids = generateUuidList(3);

    expect(uuids).toHaveLength(3);

    for (const uuid of uuids) {
      expect(uuid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
      );
    }
  });

  it("generates MD5 and SHA-256 digests for known values", async () => {
    expect(md5Hex("hello")).toBe("5d41402abc4b2a76b9719d911017c592");
    await expect(sha256Hex("hello")).resolves.toBe(
      "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    );
    await expect(generateHashes("ConvertCenter")).resolves.toEqual({
      md5: "ad378589294460f067234015cb4668ce",
      sha256: "9f509b21d40e801dd0340f71ff7ea1e7bad49f4d5d3e6849165e84b6a202ca3a",
    });
  });
});
