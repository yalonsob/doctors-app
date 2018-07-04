const App = () => (
    <div class="container">
        <form>
            <div class="input-group">
            
                <input type="text" class="form-control" id="exampleInputAmount" placeholder="Amount" />
                <div class="input-group-btn">
                    <button class="btn btn-primary">
                    <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </form>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Specialty</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Devon Awesome</td>
                    <td>San Francisco</td>
                    <td>Pediatrics</td>
                </tr>
                <tr>
                    <td>Ellie Bartowski</td>
                    <td>Mountain View</td>
                    <td>Surgery</td>
                </tr>
                <tr>
                    <td>Devon Awesome2</td>
                    <td>San Francisco</td>
                    <td>Pediatrics2</td>
                </tr>
            </tbody>
        </table>
    </div>
)

ReactDOM.render(
    <App />,
    document.getElementById('app')
);