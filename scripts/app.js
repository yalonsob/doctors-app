const Router = ReactRouterDOM.HashRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Switch = ReactRouterDOM.Switch;

// const latLon ='37.773972,-122.431297,100'
// const userKey = 'daf039333d1a879721afe0d66786dfdb'
// const limit = '50'
// const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${latLon}&user_key=${userKey}&limit=${limit}`
const url = 'api/doctors.json'


var x = 3

let doctors = []



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

const fetchDoctorById = (id) => {
    return fetchDoctors().then((doctors) => doctors.find((doctor) => doctor.id === id))
};

const isSimilarDoctor = (doctor, otherDoctor) => {
    if(doctor.id === otherDoctor.id) {
        return false
    }

    const commonSpecialties = doctor.specialties.filter((s) => {
        return otherDoctor.specialties.includes(s)
    })

    return commonSpecialties.length > 0
}

const fetchSimilarDoctors = (doctor) => {
    return fetchDoctors().then((doctors) => { 
        return doctors.filter((otherDoctor) => {
            return isSimilarDoctor(doctor, otherDoctor)    
        })
    })
}


const doctors2 = [
    {
        id: '1',
        name: 'Jason',
        city: 'San Francisco',
        bio: 'Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).',
        imageUrl: undefined,
        specialties: [
            'Pediatrics'
        ]    
    }, {
        id: '2',
        name: 'Jason2',
        city: 'San Francisco',
        bio: 'Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).',
        imageUrl: 'https://asset1.betterdoctor.com/assets/general_doctor_male.png',
        specialties: [
            'Pediatrics'
        ]
    }, {
        id: '3',
        name: 'Jason3',
        city: 'San Francisco',
        bio: 'Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).',
        imageUrl: 'https://asset1.betterdoctor.com/assets/general_doctor_male.png',
        specialties: [
            'Pediatrics'
        ]
    }, {
        id: '4',
        name: 'Jason4',
        city: 'San Francisco',
        bio: 'Dr. Jason Snitzer, MD, specialist in pediatrics, currently sees patients in Santa clara, California. Dr. Snitzer is licensed to treat patients in California. Dr. Snitzer has passed an automated background check which looked at elements including medical license status and malpractice screening (no history found).',
        imageUrl: undefined,
        specialties: [
            'Vision',
            'Pediatrics',
            'Neurology'
        ]
    }
]

class DoctorSearchForm extends React.Component {
    render() {
        return (
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
    } 
}

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
class  DoctorSearchPage extends React.Component {
    state = {
        doctors: []
    }
    componentDidMount(){

        fetchDoctors().then((doctors) => {

            this.setState((prevState) => ({ doctors }))
        })
        
    }

    handleSearch(searchText) {
        this.setState((prevState) => ( {
            doctors: prevState.doctors.filter((doctor) => {
                return doctor.name.indexOf(searchText) >= 0
            })
        }))
    }

    render(){
        return (
            <div class="container">
                <DoctorSearchForm handleSearch={this.handleSearch}/>
                <DoctorTable doctors={this.state.doctors} />
            </div>
        )
    }
}

class DoctorDetailPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            doctor: this.props.location.state,
            similarDoctors: []
        }
    }

    componentDidMount() {

        fetchDoctorById(this.props.match.params.id).then((doctor) => {
            this.setState((prevState) => ({ doctor }))
            fetchSimilarDoctors(doctor).then((similarDoctors) => {
                this.setState((prevState) => ({ similarDoctors }))
            })
        })

    }
    


    render() {
        // console.log(this.props.match.params.id, this.props.location.state)
        const doctor = this.state.doctor
        const similarDoctors = this.state.similarDoctors
        if(!doctor)
            return null
        console.log(doctor)
        console.log(similarDoctors)
        
        const imageUrl = doctor.imageUrl ? doctor.imageUrl : '/images/general_doctor_male.png'
        return (
            <div class="container">
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

const App = () => (

    <Router>
        <div>
            <Link to="/">Home</Link>
            <Switch>
                <Route exact path="/" component={DoctorSearchPage} />
                <Route path="/detail/:id" component={DoctorDetailPage} />
            </Switch>
        </div>
    </Router>
)



ReactDOM.render(
    <App />,
    document.getElementById('app')
);