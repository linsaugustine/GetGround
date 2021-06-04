export const getBooks = async (page: number, itemsPerPage: number) => {
    const endPoint = "http://nyx.vima.ekt.gr:3000/api/books"

    const options = {
        method: "post",
        body: JSON.stringify({page, itemsPerPage})
    }

    return await (await fetch(endPoint, options)).json()
}