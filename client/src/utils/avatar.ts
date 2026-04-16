/**
 * Resolves an avatar URL for display.
 * - If the avatar is already an absolute URL (e.g. Google profile picture), use it directly.
 * - If it's a local server path (e.g. /uploads/avatar.png), prepend the API base URL.
 * - If null/empty, returns null so the caller can fall back to a default image.
 */
export function resolveAvatarUrl(avatar: string | null | undefined): string | null {
    if (!avatar) return null;

    // Already an absolute URL (Google, etc.)
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
        return avatar;
    }

    // Local server upload — prepend base URL
    const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return `${base}${avatar.startsWith("/") ? "" : "/"}${avatar}`;
}
