const DoctorTable = (props) => (
    <div>
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

const DoctorDetail = (props) => (
    <div>
        <div class="media">
            <div class="media-left media-middle">
                <a href="#">
                    <img class="media-object" src="https://asset1.betterdoctor.com/assets/general_doctor_male.png" alt="Image" />
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading">Devon Awesome</h4>
                Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).
            </div>
            <h4>Specialties</h4>
            <ul class="list-group">
                <li class="list-group-item">Pediatrics</li>
            </ul>
        </div>
    </div>
)

const App = () => (

    <div class="container">
        
        <DoctorTable />
        <DoctorDetail />
        
    </div>

)



ReactDOM.render(
    <App />,
    document.getElementById('app')
);