import { ref } from "vue"

const customFetch = () => {
    const data = ref('')
    const error = ref(null)

    const load = async(url) => {
        try {
            let response = await fetch(url)
            if (!response.ok){
                throw Error('No data available')
            }

            data.value = await response.json()
        }
        catch (err){
            error.value = err.message
            console.log(error.value)
        }
    }

    return {data, error, load}
}

export default customFetch