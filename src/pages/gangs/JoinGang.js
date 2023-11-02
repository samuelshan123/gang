import JoinGangForm from "../../components/gang/JoinGangForm";


function JoinGang({route}){
    return(
       <JoinGangForm user={route.params.user}/>
    )
}

export default JoinGang;