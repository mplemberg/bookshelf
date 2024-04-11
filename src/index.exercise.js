import * as React from 'react'
import {createRoot} from 'react-dom/client'
import {Logo} from './components/logo'
import '@reach/dialog/styles.css'
import {Dialog} from '@reach/dialog'
function App() {
  const MODAL_TYPES = {
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
  }
  const [openModal, setOpenModal] = React.useState('')

  const isOpen = dialogType => openModal === dialogType
  const close = () => setOpenModal('')
  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal(MODAL_TYPES.LOGIN)}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal(MODAL_TYPES.REGISTER)}>
          Register
        </button>
      </div>
      <Dialog
        aria-label="Login"
        isOpen={isOpen(MODAL_TYPES.LOGIN)}
        onDismiss={close}
      >
        <h1>Login</h1>
      </Dialog>
      <Dialog
        aria-label="Register"
        isOpen={isOpen(MODAL_TYPES.REGISTER)}
        onDismiss={close}
      >
        <h1>Register</h1>
      </Dialog>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export {root}
