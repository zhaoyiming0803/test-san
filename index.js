import App from './src/App'

console.log('App: ', App)

debugger
const app = new App()
console.log('app: ', app)

const root = document.querySelector('#test-san-container')

app.attach(root)
