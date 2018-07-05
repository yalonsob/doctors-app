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