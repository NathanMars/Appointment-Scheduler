import dayjs from "dayjs"

import { scheduleNew } from "../../services/schedule-new.js"

const form = document.querySelector("form")
const selectDate = document.getElementById("date")
const clientName = document.getElementById("client")

// Configurações do calendario
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")
selectDate.value = inputToday
selectDate.min = inputToday

// Comportamento do formulario
form.onsubmit = async (event) => {
    event.preventDefault()

    try {
        const name = clientName.value.trim()
        if (!name) return alert("Por favor, insira o nome do cliente.")

        const hourSelected = document.querySelector(".hour-selected")
        if (!hourSelected) return alert("Por favor, selecione um horario.")
        const [hour] = hourSelected.innerText.split(":")
        
        const when = dayjs(selectDate.value).add(hour, "hour")
        const id = new Date().getTime()

       await scheduleNew({ id, name, when})

    } catch (error) {
        alert("Ocorreu um erro ao enviar o formulário.")
        console.error(error)
    }
}