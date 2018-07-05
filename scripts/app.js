const Router = ReactRouterDOM.HashRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Switch = ReactRouterDOM.Switch;

// Data for request to betterdoctor.com API

// const latLon ='37.773972,-122.431297,100'
// const userKey = 'daf039333d1a879721afe0d66786dfdb'
// const limit = '50'
// const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${latLon}&user_key=${userKey}&limit=${limit}`

// Url for request to local file (source: betterdoctor.com)
const url = 'api/doctors.json'

// Translates a doctor as it comes from the API 
// into a doctor with the necessary attributes
const parseDoctor = (doctor) => {
    const name = [
        doctor.profile.first_name, 
        doctor.profile.middle_name, 
        doctor.profile.last_name
    ].filter((name) => !!name).join(' ')
    const specialties = doctor.specialties.map((specialty) => specialty.name)
    return {
        id: doctor.uid,
        name: name,
        city: doctor.practices[0].visit_address.city,
        bio: doctor.profile.bio,
        imageUrl: doctor.profile.imageUrl,
        specialties: specialties
    }       
}

// Returns all doctors after an API request
const fetchDoctors = () => {
    return fetch(url, {
        method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
        let doctors = data.data.map((doctor) => parseDoctor(doctor));
        return doctors
    })
};

// Returns a doctor given the id
const fetchDoctorById = (id) => {
    return fetchDoctors().then((doctors) => doctors.find((doctor) => doctor.id === id))
};

// Receives a doctor and returns the similar doctors
const fetchSimilarDoctors = (doctor) => {
    return fetchDoctors().then((doctors) => { 
        return doctors.filter((otherDoctor) => {
            return isSimilarDoctor(doctor, otherDoctor)    
        })
    })
}

// Two doctors are similar if they have any specialty in common
const isSimilarDoctor = (doctor, otherDoctor) => {
    if (doctor.id === otherDoctor.id) {
        return false
    }
    const commonSpecialties = doctor.specialties.filter((s) => {
        return otherDoctor.specialties.includes(s)
    })
    return commonSpecialties.length > 0
}

// DoctorSearchForm Component contains the search form
class DoctorSearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSearch(e) {
        e.preventDefault()
        const searchText = e.target.value
        this.props.handleSearch(searchText)
    }

    handleSubmit(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div class="input-group">
                        <input onKeyUp={this.handleSearch} type="text" class="form-control" />
                        <div class="input-group-btn">
                            <button class="btn btn-primary">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    } 
}

// DoctorRow Component contains a single doctor inside the table 
const DoctorRow = (props) => {
    let specialties = props.doctor.specialties.join(', ')
    
    return(
        <tr>
            <td>
                <Link 
                    to={{
                        pathname: `/detail/${props.doctor.id}`,
                        state: props.doctor
                    }}>
                    {props.doctor.name}
                </Link>
            </td>
            <td>{props.doctor.city}</td>
            <td>{specialties}</td>
        </tr>
    )
}

// DoctorTable Component contains the whole table with doctors
// This component is being used twice: in the home page and for the similar doctors table
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

// DoctorSearchPage Component contains the DoctorSearchForm and the DoctorTable in home page
class  DoctorSearchPage extends React.Component {

    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
        this.state = {
            doctors: [],
            filteredDoctors: []
        }
    }

    componentDidMount(){
        fetchDoctors().then((doctors) => {
            this.setState((prevState) => ({
                doctors: doctors,
                filteredDoctors: doctors
             }))
        })  
    }

    handleSearch(searchText) {
        searchText = searchText.trim()
        this.setState((prevState) => ( {
            filteredDoctors: prevState.doctors.filter((doctor) => {
                const stringified = [doctor.name, doctor.city, doctor.specialties.join()].join().toLowerCase()
                return stringified.indexOf(searchText) >= 0
            })
        }))
    }

    render(){
        return (
            <div>
                <DoctorSearchForm handleSearch={this.handleSearch}/>
                <DoctorTable doctors={this.state.filteredDoctors} />
            </div>
        )
    }
}

// DoctorDetailPage Component contains the information about a single doctor
//  and a table with similar doctors 
class DoctorDetailPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            doctor: null,
            similarDoctors: []
        }
        this.loadDoctorAndSimilarDoctors = this.loadDoctorAndSimilarDoctors.bind(this)
    }

    componentDidMount() {
        this.loadDoctorAndSimilarDoctors(this.props.match.params.id)
    }

    componentWillReceiveProps(newProps) {
        this.loadDoctorAndSimilarDoctors(newProps.match.params.id)
    }

    loadDoctorAndSimilarDoctors(id){
        fetchDoctorById(id).then((doctor) => {
            this.setState((prevState) => ({ doctor }))
            fetchSimilarDoctors(doctor).then((similarDoctors) => {
                this.setState((prevState) => ({ similarDoctors }))
            })
        })
    }
    
    render() {
        const doctor = this.state.doctor
        const similarDoctors = this.state.similarDoctors
        if(!doctor) return null
        const imageUrl = doctor.imageUrl ? doctor.imageUrl : '/images/general_doctor_male.png'
        return (
            <div>
                <div class="media">
                    <div class="media-left media-middle">
                        <a href="#">
                            <img class="media-object" src={imageUrl} alt="Image" />
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">{doctor.name}</h4>
                        {doctor.bio}
                    </div>
                    <h4>Specialties</h4>
                    <ul class="list-group">
                        {
                            doctor.specialties.map((specialty) => <li class="list-group-item">{specialty}</li>)
                        }   
                    </ul>
                    <h4>Similar doctors</h4>
                    <DoctorTable doctors={similarDoctors} />
                </div>
            </div>
        )
    }
}

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