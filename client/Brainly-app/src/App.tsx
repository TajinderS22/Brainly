import {  } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Dashboard from './components/Dashboard'
import Authentication from './components/AuthHandler/Authentication'
import { Provider } from 'react-redux'
import { store } from './store/store'
import SharedBrain from './components/SharedBrain'
import NotFound from './components/NotFound'
import Home from './components/Home'

function App() {

  return (
   <div className='min-h-screen h-fit max-w-[1920px] mx-auto  '>
      <Provider store={store} >
        <RouterProvider router={routes}/>  
      </Provider>    
    
   </div>
  )
}

const routes=createBrowserRouter([
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/authentication',
    element:<Authentication/>
  },
  {
    path:'/brain/share/:hash',
    element:<SharedBrain/>
  },
  {
    path:'/',
    element:<Home/>
  },

  {
    path:"*",
    element:<NotFound/> 
  }
])

export default App
