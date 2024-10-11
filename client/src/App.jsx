import Navbar from './components/Navbar/Navbar'
import './layout.scss'
import HomePage from './pages/homePage/HomePage'
function App() {
  

  return (
    <div className='paralaxClass'>
      <div className='layout'>
        <div className='navbar'>
          <Navbar/>
        </div>
        <div className='content'>
          <HomePage/>
          
        </div>
      </div>
    </div>
  )
}

export default App
