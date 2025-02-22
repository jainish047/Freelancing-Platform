import { useParams } from "react-router-dom";

export default function Profile(){
    const {id} = useParams()
    return (
        <div>
            <h1>Profile of User with id:{id}</h1>
        </div>
    )
}