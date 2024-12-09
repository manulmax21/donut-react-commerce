import {Route, Routes as Switch, BrowserRouter as Router, useLocation} from "react-router-dom";
import {Header} from "./shared/Header";
import {Main} from "./pages/Main/Main";
import {Settings} from "./pages/Setings/Settings";
import {Catalog} from "./pages/Catalog/Catalog";
import {Cart} from "./pages/Cart/Cart";
import {Footer} from "./shared/footer/Footer";
import {ProductPage} from "./pages/ProductPage/ProductPage";
import React, {useEffect, useState} from "react";
import {Loading} from "./pages/Loading/Loading";
import {useTheme} from "./hooks/useTheme";
import {useScroll} from "./hooks/useScroll";
import {SettingProfile} from "./pages/SettingProfile/SettingProfile";
import {SettingProduct} from "./pages/SettingProduct/SettingProduct";

const layout = {
    minHeight: "100vh",
    width: "100%"
}

function App() {
    const [isLoadingMain, setIsLoadingMain] = useState(false)
    const themeObj = useTheme()
    const location = useLocation();
    const {scrollToTop} = useScroll()

    const loaded = () => {
        setIsLoadingMain(false)
    }
    useEffect(() => {
        scrollToTop()
        setIsLoadingMain(true)
    }, [])
    useEffect(() => {
        scrollToTop()
        setIsLoadingMain(true)
    }, [themeObj.theme, location])

    return (
      <>
          <Header/>
          {isLoadingMain ?
              <div className={"row"} style={layout}>
                  <div className={"col-xl-12 col-md-12 col-sm-12"} style={{marginTop: "150px"}}>
                      <Loading
                          state={loaded}
                          status={"void"}
                          body={{}}
                      />
                  </div>
              </div>
          :
              <div className={'container'} style={layout}>
                  <Switch>
                      <Route path="/" exact element={<Main/>}/>
                      <Route path="/main" exact element={<Main/>}/>
                      <Route path="/settings" exact element={<Settings/>}/>
                      <Route path="/settings/profile" exact element={<SettingProfile/>}/>
                      <Route path="/settings/product/:id" exact element={<SettingProduct/>}/>
                      <Route path="/cart" exact element={<Cart/>}/>
                      <Route path="/catalog" exact element={<Catalog/>}/>
                      <Route path="/catalog/:id" exact element={<ProductPage/>}/>
                  </Switch>
              </div>
          }
          <Footer/>
      </>

  )
}

export default App
