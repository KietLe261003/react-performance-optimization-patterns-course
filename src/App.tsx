import Debouncing from "./page/Debouncing/Debouncing"
import Memoization from "./page/Memoization/Memoization"
import DerrivedState from "./page/TheDerivedState/DerrivedState"
import Throttle from "./page/Throttle/Throttle"

function App() {

  return (
    <>
      <div className="bg-black text-white w-screen min-h-screen flex items-start justify-center">
        {/* <RenderTracker/> */}
        {/* <CallBackTracker/> */}
        {/* <UserMemoTracker/> */}
        {/* <DerrivedState /> */}
        {/* <Debouncing /> */}
        {/* <Throttle /> */}
        <Memoization />
      </div>
    </>
  )
}

export default App
