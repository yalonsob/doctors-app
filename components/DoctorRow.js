// DoctorRow Component contains a single doctor inside the table 

const DoctorRow = (props) => {
    let specialties = props.doctor.specialties.join(', ')

    return (
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