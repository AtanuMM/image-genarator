import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <div className='main'>
          <div className='' />
      </div>
      <main className="app">
        <Outlet/>
      </main>
    </>
  )
}
export default RootLayout
