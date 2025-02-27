import Board from './components/Board/Board'
import Header from './components/Header/Header'
function App() {
  

  return (
    <div>
   <div className="absolute top-0 left-0 w-full h-150 bg-gradient-to-br from-pink-500 via-purple-500 to-[#0055D1] rounded-md filter blur-3xl opacity-20 -z-50!" />
   {/* <div className="">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 -left-10 w-48 h-48 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
          <div className="absolute top-40 -right-10 w-48 h-48 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-10 left-1/2 w-48 h-48 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
        </div>
        </div> */}
    <Header/>
    <Board/>
   </div>
  )
}

export default App
