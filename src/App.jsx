import { useEffect, useState } from 'react'
import './App.css'
import { createApi } from 'unsplash-js';
import Card from './Card';

const unsplash = createApi({
  accessKey: 'bokQHdl4xegqO1LAl2AkP8tYhRn6JwKn1-bb327HiiI',
})

function App() {
  const [pics, setPics] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [selected, setSelected] = useState([])
  const [scoreAnimation, setScoreAnimation] = useState(false)

  useEffect(()=>{
    if (scoreAnimation) {
      const timeout = setTimeout(() => {
        setScoreAnimation(false)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [scoreAnimation])

  const selectCard = (cardId) => {
    if (selected.includes(cardId)){
      resetGame()
      return
    }
    setScore(score + 1)
    setSelected([...selected, cardId])
    shuffleDeck()
  }

  const resetGame = () => {
    if (bestScore < score) setBestScore(score)
    setScoreAnimation(true)
    setScore(0)
    setSelected([])
    shuffleDeck()
  }

  const shuffleDeck = () => {
    const array = [...pics]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    
    setPics(array)
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await unsplash.search.getPhotos({
          query: 'people',
          perPage: 20,
        })
        setPics(response.response.results);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages()

    //Testing
    // setPics([
    //   {id: 0, 
    //     urls: { small: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Jodie_Foster.jpg/220px-Jodie_Foster.jpg"},
    //     alt_description: "jd0",
    //     description: "jd0",
    //   },
    //   {id: 1, 
    //     urls: { small: "https://faroutmagazine.co.uk/static/uploads/1/2021/11/The-film-scene-that-changed-Jodie-Fosters-life.jpg"},
    //     alt_description: "jd1",
    //     description: "jd1",
    //   },
    //   {id: 2, 
    //     urls: { small: "https://edgemagonline.com/wp-content/uploads/2019/02/jodie-foster-1.jpg"},
    //     alt_description: "jd2",
    //     description: "jd2",
    //   },
    // ])

  }, [])

  return (
    <div className='app'>
      <div className="info">
        <h1 className="title">Memory Game</h1>
        <div className={"score-container" + (scoreAnimation? " score-alert" : "")}>
          <h3>{"Score: " + score}</h3>
          <h3>{"Best: " + bestScore}</h3>
        </div>
      </div>

      <p>Get points by clicking on an image but dont click on any more than once!</p>

      <div className="card-holder">
        {pics.map(pic => <Card key={pic.id} pic={pic} selectCard={selectCard} />
        )}        
      </div>
    </div>
  )
}

export default App
