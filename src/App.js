import React, { useEffect } from "react";
import IntroPage from "./pages/IntroPage";
import BrandPage from "./pages/BrandPage";
import ModelPage from "./pages/ModelPage";
import ModelsPage from "./pages/ModelsPage";
import CreateEditModelPage from "./pages/CreateEditModelPage"
import CreateEditBrandPage from "./pages/CreateEditBrandPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { httpClient } from "./store";
import { observer } from "mobx-react";
import Alert from "./components/Alert";
import { context } from "./context";


const App = observer ( () => {

  useEffect(() => {
    httpClient.getToken()
    httpClient.getModelArray()
  }, [])


  return (
    <div>
      <Header />
      {context.isAlertOn && <Alert />}
      <main className="app-main">
        <Routes>
            <Route exact path="/cars-app" name="Home" element={
                <IntroPage />
            }/>
            <Route exact path="/cars-app/brand" element={
                <BrandPage />
            }/>
            <Route exact path={`/cars-app/brand/new`} element={
                <CreateEditBrandPage />
            }/>
            <Route exact path={`/cars-app/brand/${httpClient.currentBrandName}`} element={
                <ModelsPage />
            }/>
            <Route exact path={`/cars-app/brand/${httpClient.currentBrandName}/new`} element={
                <CreateEditModelPage />
            }/>
            <Route exact path={`/cars-app/brand/${httpClient.currentBrandName}/${httpClient.currentModel}`} element={
                <ModelPage />
            }/>
        </Routes>
      </main>
      <Footer />
    </div>
  )
})

export default App
