export function lightenHSL(hslColor: string, increaseL: number, increaseS: number = 0): string {
    // Extract H, S, and L using regex
    const hslMatch = hslColor.match(/hsl\(\s*(\d+(\.\d+)?),\s*(\d+(\.\d+)?)%?,\s*(\d+(\.\d+)?)%?\s*\)/i);
    if (!hslMatch) {
        throw new Error("Invalid HSL format. Expected format: 'hsl(H, S%, L%)'");
    }

    const h = parseFloat(hslMatch[1]);
    let s = parseFloat(hslMatch[3]);
    let l = parseFloat(hslMatch[5]);

    // Increase lightness and saturation, ensuring they stay within 0-100%
    l = Math.min(100, l + increaseL);
    s = Math.min(100, s + increaseS);

    return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
}