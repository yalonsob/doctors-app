// DoctorSearchPage Component contains the DoctorSearchForm and the DoctorTable in home page

class DoctorSearchPage extends React.Component {

    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
        this.state = {
            doctors: [],
            filteredDoctors: []
        }
    }

    componentDidMount() {
        fetchDoctors().then((doctors) => {
            this.setState((prevState) => ({
                doctors: doctors,
                filteredDoctors: doctors
            }))
        })
    }

    handleSearch(searchText) {
        searchText = searchText.trim()
        this.setState((prevState) => ({
            filteredDoctors: prevState.doctors.filter((doctor) => {
                const stringified = [doctor.name, doctor.city, doctor.specialties.join()].join().toLowerCase()
                return stringified.indexOf(searchText) >= 0
            })
        }))
    }

    render() {
        return (
            <div>
                <DoctorSearchForm handleSearch={this.handleSearch} />
                <DoctorTable doctors={this.state.filteredDoctors} />
            </div>
        )
    }
}