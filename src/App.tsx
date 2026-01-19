import CallBackTracker from "./page/Re-Render/CallBackTracker"
import RenderTracker from "./page/Re-Render/RenderTracker"
import UserMemoTracker from "./page/Re-Render/UserMemoTracker"

function App() {

  return (
    <>
      <div className="bg-black text-white w-screen h-screen flex items-center justify-center text-3xl">
        {/* <RenderTracker/> */}
        {/* <CallBackTracker/> */}
        <UserMemoTracker/>
      </div>
    </>
  )
}

export default App
