export function load(key) {
    let value = localStorage.getItem(key)
    if (value) {
        return JSON.parse(value)
    }
    return []
}

export function dump(key, value) {
    localStorage.setItem(key, value)
}