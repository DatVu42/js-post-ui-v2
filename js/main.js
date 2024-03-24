import postApi from "./api/postApi"

async function main() {
    try {
        const params = {
            _page: 1,
            _limit: 5
        }
        const response = await postApi.getAll(params)
        console.log('response', response);
    } catch (error) {
        console.log(error);
    }
}

main()