import { baseUrl, noConsole } from '../config';


export default (options = { method: 'GET', data: {} }) => {
    if (!noConsole) {
        console.log(
            `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
                options.data
            )}`
        );
    }
    if (options.method.toUpperCase() === 'GET') {
        if (Object.keys(options.data).length !== 0) {
            let paramsArray = [];
            //拼接参数  
            Object.keys(options.data).forEach(key => paramsArray.push(key + '=' + options.data[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        return timeoutFetch(fetch(baseUrl + options.url, {
            method: 'GET',
        }))
            .then(response => {
                if (response.ok) {
                    if (!noConsole) {
                        console.log(
                            `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
                            response
                        );
                    }
                    return response.json()
                } else {
                    console.log(response)
                }
            })
            .then(response => {
                if (response.code === 2000) {
                    return response
                } else {
                    console.log(response)
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        return timeoutFetch(fetch(baseUrl + options.url, {
            method: 'POST',
            body: JSON.stringify(options.data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }))
            .then(response => {
                if (response.ok) {
                    if (!noConsole) {
                        console.log(
                            `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
                            response
                        );
                    }
                    return response.json()
                } else {
                    console.log(response)
                }
            })
            .then(response => {
                if (response.code === 2000) {
                    return response
                } else {
                    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, response)
                }
            })
            .catch(error => console.error('Error:', error));
    }

};
/**
   * fetch 网络请求超时处理
   * @param original_promise 原始的fetch
   * @param timeout 超时时间 30s
   * @returns {Promise.<*>}
   */
const timeoutFetch = (original_fetch, timeout = 20000) => {
    let timeoutBlock = () => { }
    let timeout_promise = new Promise((resolve, reject) => {
        timeoutBlock = () => {
            // 请求超时处理
            reject('timeout promise')
        }
    })
    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    let abortable_promise = Promise.race([
        original_fetch,
        timeout_promise
    ])
    setTimeout(() => {
        timeoutBlock()
    }, timeout)
    return abortable_promise
}