import axios from "axios"
import { formatDate } from "../utils/Helpers"

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

export async function getListVisitorService(year: number) {
    try {
        const response = await axios.get(`/statistik/list-visitor?year=${year}`)

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

export async function trackVisitor(page: string) {
    try {
        const response = await axios.post(`/visit`, {
            page,
            timestamp: formatDate(new Date(), 'DD-MM-YYYY HH:mm', 'long')
        })

        return response
    } catch (error) {
        alert(error)
    }
}

export async function getVisitorDeviceService() {
    try {
        const response = await axios.get(`/statistik/get-visitor-device`)

        return response.data.data
    } catch (error) {
        alert(error)
    }
}

