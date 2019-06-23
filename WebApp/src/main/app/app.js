import React from 'react';
import {HomePage} from './pages/home/HomePage';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom'
import './seo/sitemap.xml';
import './seo/robots.txt';
import {Helmet} from 'react-helmet';
import {createDocumentsListRoute, createFullDocumentsListRoute, createHomeRoute, createVisaApplicationFormRoute} from './helpers/appRoutes';
import {configureStore} from './configureStore';


const store = configureStore();
store.subscribe(() => window.__renderedState = store.getState());

export class App extends React.Component {

  render() {

    return ([
      <Provider store={store}>
        <Switch key="1">
          <Route path={createHomeRoute()}
                 component={HomePage}/>
        </Switch>
      </Provider>,
      <Helmet key="2">
        <link rel="icon" sizes="192x192" href={require('./images/favicon-192x192.png')}/>
        <link rel="icon" sizes="96x96" href={require('./images/favicon-96x96.png')}/>
        <link rel="icon" sizes="48x48" href={require('./images/favicon-48x48.png')}/>
        <link rel="apple-touch-icon" href={require('./images/favicon-192x192.png')}/>
        <link rel="apple-touch-icon" sizes="76x76" href={require('./images/favicon-76x76.png')}/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Visa.Furnas"/>
        <meta property="og:title" content="Заполение анкеты на визу в Испанию"/>
        <meta property="og:description" content="Заполнение анкеты на визу онлайн. Беспллатное формирование пакета документов для самостоятельного получения визы в визовом центре Испании."/>
        <meta property="og:url" content="https://visa.furnas.ru"/>
        <meta property="og:locale" content="ru_RU"/>
        <meta property="og:image" content={require('./images/share-facebook.png')}/>
      </Helmet>
    ]);
  }
}
