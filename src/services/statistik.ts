import axios from "axios"


export async function getSummaryCount() {
    try {
        const response = await axios.get('/statistik/summary')

        return response.data.data
    } catch (error) {
        alert(error)
    }
}

export async function getListStatistikService(year: number) {
    try {
        const response = await axios.get(`/statistik/list-statistik?year=${year}`)

        return response.data.data
    } catch (error) {
        alert(error)
    }
}

export async function getListFeedbackService(page: number, perPage: number, order: string, orderBy: string) {
    try {
        const response = await axios.get(`/statistik/list-feedback?page=${page}&perPage=${perPage}&order=${order}&orderBy=${orderBy}`)

        return response.data.data
    } catch (error) {
        alert(error)
    }
}