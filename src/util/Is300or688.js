export default (code = '') => {
    if (code.length > 7) {
        const marketCode = code.substr(2, 3)
        if (marketCode === '300' || marketCode === '688') {
            return true
        }
    }
    return false
}
