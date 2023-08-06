import { Route, Routes } from 'react-router-dom'
import { Card } from 'primereact/card'
import { ProtectedRoute } from './pages/privates/protected.route';
import { AddIncomePage, AddSpentPage, HomePage, LoginPage, NotFoundPage, ProtectedNotFoundPage, RegisterPage } from './pages'
import { useAuth } from './libs/context/auth/use-auth';
import { NavbarComponent } from './libs/ui/components/navbar/navbar.component';

function App() {
  const { isAuth, loading } = useAuth();
  if (loading) return null;
  return (
    <>
      <div className="h-full md:h-screen flex w-full md:w-screen justify-content-center align-items-center flex-column">
        <Card className="w-full md:w-7" >
          {isAuth && <NavbarComponent />}
          <Routes>
            <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/" />} >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage url={'/login'} />} />
            </Route>
            <Route
              element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/add-income" element={<AddIncomePage />} />
              <Route path="/add-spent" element={<AddSpentPage />} />
              <Route path="*" element={<ProtectedNotFoundPage />} />
            </Route>
          </Routes>
        </Card>
      </div>
    </>
  )
}

export default App
