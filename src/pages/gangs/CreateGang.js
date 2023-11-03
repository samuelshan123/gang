import CreateGangForm from "../../components/gang/CreateGangForm";


function CreateGang({route}){
     return(
        <CreateGangForm user = {route.params.user}
        />
     )
}

export default CreateGang;