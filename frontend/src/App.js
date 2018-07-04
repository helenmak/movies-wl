import React, { Component } from 'react';
import logo from './logo.svg';
import style from './App.css';
import {Route, Switch, Link} from "react-router-dom"

import { Layout } from 'antd'
import MainPage from './components/MainPage'
import MoviePage from "./components/MoviePage";
import Preloader from './components/Preloader'

const Content = Layout.Content

class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <header className="App-header">
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
          <Link to="/"><h1 className="App-title">Movie Database</h1></Link>
        </header>
        <Content style={{ padding: 24, minHeight: 280 }}>
          <Switch>
            <Route path="/movies/:id" component = {MoviePage}/>
            <Route path="/movies" component = {MainPage}/>
          </Switch>
        </Content>
        <Preloader />
      </Layout>
    )
  }
}

export default App;
