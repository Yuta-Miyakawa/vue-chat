import Echo from 'laravel-echo'

// window.io = require('socket.io-client');
window.Pusher = require('pusher-js');

const echo = new Echo({
// window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '67792cb150303d44258c',
    cluster: 'ap3',
    // host: window.location.hostname + ':6001',
    forceTLS: true
})

// console.log(echo)
export { echo }

// export default async ({ Vue }) => {
//     Vue.prototype.$echo = echo
// }