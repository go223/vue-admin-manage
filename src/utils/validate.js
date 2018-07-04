export function isUrl (s) {
    return /^http[s]?:\/\/.*/.test(s)
}