import CreateProfileForm from "../../components/auth/CreateProfileForm";



function CreateProfile({route}){

    return(
        <CreateProfileForm phone={route.params.phone}/>
    )
}

export default CreateProfile;