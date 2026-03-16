import { getCalculatorDef, formatSeconds } from './calculator-registry';

const calculatorDef = getCalculatorDef('file-transfer-time');
if (!calculatorDef) {
    throw new Error("File transfer time calculator definition not found");
}
const calculate = calculatorDef.variants[0].calculate;

describe('File Transfer Time Calculator', () => {
    describe('Unit Normalization & Basic Calculation', () => {
        it('calculates time for GB and Mbps correctly', () => {
            const { totalSeconds } = calculate({
                fileSize: 1,
                fileSizeUnit: 'GB',
                transferSpeed: 100,
                transferSpeedUnit: 'Mbps',
                efficiency: 1.0,
                parallelStreams: 1,
            });
            // 1 GB = 8e9 bits. 100 Mbps = 1e8 bps. Time = 8e9 / 1e8 = 80 seconds.
            expect(totalSeconds).toBeCloseTo(80);
        });

        it('calculates time for TB and Gbps correctly', () => {
            const { totalSeconds } = calculate({
                fileSize: 1,
                fileSizeUnit: 'TB',
                transferSpeed: 10,
                transferSpeedUnit: 'Gbps',
                efficiency: 1.0,
                parallelStreams: 1,
            });
            // 1 TB = 8e12 bits. 10 Gbps = 1e10 bps. Time = 8e12 / 1e10 = 800 seconds.
            expect(totalSeconds).toBeCloseTo(800);
        });

        it('calculates time for MB and MB/s correctly', () => {
            const { totalSeconds } = calculate({
                fileSize: 100,
                fileSizeUnit: 'MB',
                transferSpeed: 10,
                transferSpeedUnit: 'MB/s',
                efficiency: 1.0,
                parallelStreams: 1,
            });
            // 100 MB = 8e8 bits. 10 MB/s = 8e7 bps. Time = 8e8 / 8e7 = 10 seconds.
            expect(totalSeconds).toBeCloseTo(10);
        });
    });

    describe('Efficiency / Overhead', () => {
        it('adjusts calculation for 90% efficiency', () => {
            const { totalSeconds } = calculate({
                fileSize: 1,
                fileSizeUnit: 'GB',
                transferSpeed: 100,
                transferSpeedUnit: 'Mbps',
                efficiency: 0.90,
                parallelStreams: 1,
            });
            // Base time is 80s. With 90% efficiency, time should be 80 / 0.90.
            expect(totalSeconds).toBeCloseTo(80 / 0.90); // ~88.89s
        });
    });

    describe('Parallel Streams', () => {
        it('adjusts calculation for 4 parallel streams', () => {
            const { totalSeconds } = calculate({
                fileSize: 1,
                fileSizeUnit: 'GB',
                transferSpeed: 100,
                transferSpeedUnit: 'Mbps',
                efficiency: 1.0,
                parallelStreams: 4,
            });
            // Base time is 80s. With 4 streams, time should be 80 / 4 = 20s.
            expect(totalSeconds).toBeCloseTo(20);
        });
    });

    describe('formatSeconds Helper', () => {
        it('formats times under a minute', () => {
            expect(formatSeconds(30)).toBe('30 seconds');
        });
        it('formats times over a minute', () => {
            expect(formatSeconds(95)).toBe('1 minute, 35 seconds');
        });
        it('formats times over an hour', () => {
            expect(formatSeconds(3665)).toBe('1 hour, 1 minute');
        });
        it('rounds seconds correctly', () => {
            expect(formatSeconds(59.6)).toBe('1 minute');
        });
        it('handles less than a second', () => {
            expect(formatSeconds(0.5)).toBe('Less than a second');
        });
        it('handles exactly 0 seconds', () => {
            expect(formatSeconds(0)).toBe('0 seconds');
        });
        it('handles exact minutes', () => {
            expect(formatSeconds(120)).toBe('2 minutes');
        });
    });
});