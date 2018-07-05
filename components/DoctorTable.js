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