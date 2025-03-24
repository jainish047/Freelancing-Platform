import { useParams } from "react-router-dom"

export default function ProjectDetails(){
    const params = useParams()
    return (
        <div>
            <h1>project id:{params.id} detais</h1>
        </div>
    )
}