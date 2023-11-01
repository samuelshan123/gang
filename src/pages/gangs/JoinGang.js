import JoinGangForm from "../../components/gang/JoinGangForm";


function JoinGang({route}){
    return(
       <JoinGangForm phone={route.params.phone}/>
    )
}

export default JoinGang;