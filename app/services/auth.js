import { delay, request } from '../utils'
export const login = async () => {
    await delay(2000)
    return true
}
export const getStoreConfig = data => request({
    url: '/api/VipCenter/AddMemberAddress',
    method: 'POST',
    data,
});
