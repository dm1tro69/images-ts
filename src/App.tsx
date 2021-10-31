import React, {FC, useState} from 'react';
import './App.css';
import Intro from "./components/Intro";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {getPhotos, setError} from "./store/actions/photosActions";


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
  return (
    <div>
      <Intro onSearch={() => {}}/>
    </div>
  );
}

export default App;
