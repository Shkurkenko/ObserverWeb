import "preact/debug";
import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Header } from "./Components/Header.js";
import { Home } from "./Views/Pages/Home/index.js";
import { NotFound } from "./Views/_404.js";

import "./style.sass";

export function App() {
  return (
    <LocationProvider>
      {/* <Header /> */}
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app") as HTMLDivElement);
