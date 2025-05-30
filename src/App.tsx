import './App.css'
import CardList from './components/CardList'
import Hero from './components/Hero'
// import Test from './components/test'

function App() {

  return (
    <div className='min-h-screen bg-[#EAEAEA] pb-6'>
      <Hero />
      {/* <Test /> */}
      <CardList />
    </div>
  )
}

export default App
