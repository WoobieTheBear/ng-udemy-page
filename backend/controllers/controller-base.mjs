
export class BaseController {
    setHeaders(res){
        const contentHeader = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With',
        }
        for (const key of Object.keys(contentHeader)) {
            res.setHeader(key, contentHeader[key]);
        }
    }
}