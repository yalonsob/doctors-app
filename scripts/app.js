const Router = ReactRouterDOM.HashRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Switch = ReactRouterDOM.Switch;

const doctors = [
    {
        name: 'Jason',
        city: 'San Francisco',
        bio: 'Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).',
        imageUrl: 'https://asset1.betterdoctor.com/assets/general_doctor_male.png',
        specialties: [
            'Pediatrics'
        ]    
    }, {
        name: 'Jason',
        city: 'San Francisco',
        bio: 'Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).',
        imageUrl: 'https://asset1.betterdoctor.com/assets/general_doctor_male.png',
        specialties: [
            'Pediatrics'
        ]
    }, {
        name: 'Jason',
        city: 'San Francisco',
        bio: 'Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).',
        imageUrl: 'https://asset1.betterdoctor.com/assets/general_doctor_male.png',
        specialties: [
            'Pediatrics'
        ]
    }, {
        name: 'Jason',
        city: 'San Francisco',
        bio: 'Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).',
        imageUrl: 'https://asset1.betterdoctor.com/assets/general_doctor_male.png',
        specialties: [
            'Vision',
            'Pediatrics'
        ]
    }
]


const DoctorSearchForm = (props) => (
    <div>
        <form>
            <div class="input-group">

                <input type="text" class="form-control" />
                <div class="input-group-btn">
                    <button class="btn btn-primary">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
        </form>
    </div>
) 

const DoctorRow = (props) => {
    let specialties = props.doctor.specialties.join(', ')
    
    return(
        <tr>
            <td><Link to="/detail">{props.doctor.name}</Link></td>
            <td>{props.doctor.city}</td>
            <td>{specialties}</td>
        </tr>
    )
}

const DoctorTable = (props) => {
    return (    
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Specialty</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.doctors.map((doctor, index) => 
                            <DoctorRow key={index} doctor={doctor} />
                        )
                    }

                    
                </tbody>
            </table>
        </div>
    )
}

const DoctorSearchPage = (props) => (
    <div class="container">
        <DoctorSearchForm />
        <DoctorTable doctors={doctors} />
    </div>
)

const DoctorDetailPage = (props) => (
    <div class="container">
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
            <h4>Similar doctors</h4>
            <DoctorTable doctors={[]} />
        </div>
    </div>
)

const App = () => (

    // <div class="container">
    

    //     <DoctorTable />
    //     <DoctorDetail />
        
    // </div>

    <Router>
        <div>
            <Link to="/">Home</Link>
            <Switch>
                <Route exact path="/" component={DoctorSearchPage} />
                <Route path="/detail" component={DoctorDetailPage} />
            </Switch>
        </div>
    </Router>
)



ReactDOM.render(
    <App />,
    document.getElementById('app')
);