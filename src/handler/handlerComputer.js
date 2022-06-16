export function setData(req) {
    const { platform,
        type,
        os,
        stack } = req.body

    return {
        platform,
        type,
        os,
        stack
    }
}