// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { store } from './store/index.js'
// import App from './App.jsx'
// import { AuthProvider } from './context/AuthContext.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>,
// )




import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { NotificationsProvider } from './context/NotificationsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)