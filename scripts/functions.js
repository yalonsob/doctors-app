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