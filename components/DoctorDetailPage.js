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

    loadDoctorAndSimilarDoctors(id) {
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
        if (!doctor) return null
        const imageUrl = doctor.imageUrl || '/images/general_doctor_male.png'
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