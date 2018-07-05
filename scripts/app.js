const Router = ReactRouterDOM.HashRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Switch = ReactRouterDOM.Switch;

// App Component contains the navigation and routes of the app
const App = () => (
    <div class="container">
        <Router>
            <div>
                <nav class="navbar navbar-default">
                <ul class="nav navbar-nav">
                    <li role="presentation"><Link to="/">Home</Link></li>
                </ul>
                </nav>
                <Switch>
                    <Route exact path="/" component={DoctorSearchPage} />
                    <Route path="/detail/:id" component={DoctorDetailPage} />
                </Switch>
            </div>
        </Router>
    </div>    
)

ReactDOM.render(
    <App />,
    document.getElementById('app')
)