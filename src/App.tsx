import React, {FC, useState} from 'react';
import './App.css';
import Intro from "./components/Intro";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {getPhotos, setError} from "./store/actions/photosActions";
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'


const App:FC = () => {
    const dispatch = useDispatch()
    const {photos, error, total_results} = useSelector((state: RootState) => state.photos)
    const [mode, setMode] = useState('trending')
    const [loading, setLoading] = useState(false)
    const [searchFor, setSearchFor] = useState('')
    const [page, setPage] = useState(1)
    const [title, setTitle] =  useState('Trending')
    const searchPhotosHandler = (query: string) => {
        if (error) {
            setError('')
        }
        setMode('search')
        setLoading(true)
        setSearchFor(query)
        setPage(1)
        dispatch(getPhotos(1, query, ()=> setLoading(false), () => setLoading(false)))
        setTitle(`Search Results For "${query}"`)

    }

    let content = null
    if (loading){
        content = <div className={'is-flex is-justify-content-center py-6'}>
            <div className={'loading'}></div>
        </div>
    }else {
        (content = error ? <div className={'notification is-danger mt-6 has-text-centered'}>{error}</div>:
            <>
                <h2 className={'is-size-1 has-text-centered py-2'}>{title}</h2>
                {photos.length > 0
                    ? <ResponsiveMasonry columnsCountBreakPoints = {{480: 2, 900: 5}}>
                        <Masonry gutter={20}>
                            {photos.map(photo => (
                                <div key={photo.id} className={'masonry-item'}>
                                    <a href="/#" onClick={(e)=>{}}>
                                        <img src={photo.src.large} alt="img"/>
                                    </a>
                                </div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                    : <p className={'has-text-centered'}>No results</p>
                }
                <div className={'is-flex is-justify-content-center py-6'}>
                    {((total_results > page * 10) || mode === 'trending')
                    && <button className={'button is-primary is-large'}>Load More</button>}
                </div>
            </>
        )
    }

  return (
    <div>
      <Intro onSearch={searchPhotosHandler}/>
        <div className={'container px-4'}>
            {content}
        </div>
    </div>
  );
}

export default App;
