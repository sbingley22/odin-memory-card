import './Card.css'

export default function Card({pic, selectCard}) {

    return (
        <div 
        className="card" 
        onClick={() => selectCard(pic.id)}
        >
            <div className="img-container">
                <img src={pic.urls.small} alt={pic.alt_description} />
            </div>
            <h2>{pic.description}</h2>
        </div>
    )
}