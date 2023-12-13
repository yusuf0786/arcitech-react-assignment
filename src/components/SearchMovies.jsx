import React, { useState, useEffect, useRef, createRef } from 'react';
import axios from 'axios';
import { Button, FormGroup, Grid, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {ModalComponent} from './Modal/ModalComponent'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function SearchMovies(){

    const searchInputRef = useRef()
    const paginationBtnRef = useRef([])
    const [query, setQuery] = useState('');

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    const [dataGenre, setDataGenre] = useState(28);

    const [filter, setFilter] = useState('Action');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, ] = useState(10);

    useEffect(() => {
        let debounce = setTimeout(() => {
            fetchMovies().catch(error => {
                let promptAlert = prompt("Error: " + error.message +"\nDo you want to try again?" , "yes");
                if (promptAlert === "yes") {
                    window.location.reload()
                }
            });

        }, 1000)

        return () => {
            clearTimeout(debounce)
            searchInputRef.current.focus()
        };

    }, [filter, query]);

    const fetchMovies = async () => {
        const moviesResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9e7c17c14466104df6e6923d6de2dab5&query=${query}&with_genres=${dataGenre}`);
        const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=9e7c17c14466104df6e6923d6de2dab5`);

        setMovies(moviesResponse.data.results);
        setGenre(genreResponse.data.genres)
        searchInputRef.current.focus()
    };

    const handleSelectChange = (e) => {
        // setDataGenre(currentArray => e.target.value === "" ? ['Action'] : [...currentArray, e.target.options[e.target.selectedIndex].dataset.genreId])
        setDataGenre(e.target.options[e.target.selectedIndex].dataset.genreId)
        // setFilter(currentArray => currentArray.includes(e.target.value) ? currentArray.filter(item => item !== e.target.value) : [...currentArray, e.target.value])
        setFilter(e.target.value)
    }

    const handlePageChange = (event) => {
        Array.from(paginationBtnRef.current.children).map(elem => elem.classList.remove("active"))
        event.target.classList.add("active")
        setCurrentPage(Number(event.target.id));
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    return (
        <>
        <Stack>
            <Grid key={crypto.randomUUID()} container>
                <Grid item xs={12} display="flex" flexDirection={{xs:"column", md: "row"}} alignItems="center" sx={{
                    " > label": {
                        whiteSpace: "nowrap",
                        marginRight: "1rem",
                    }
                }}>
                {/* search input field */}
                <FormGroup className='search-input-grp'>
                    <label htmlFor="search-input">Search Movies: </label>
                    <input placeholder='Search Movies...' id='search-input' className='input-search' type="text" ref={searchInputRef} value={query} onChange={(e) => setQuery(e.target.value)} />
                </FormGroup>
                {/* select dropdown */}
                <FormGroup className='select-input-grp'>
                    <label htmlFor="select-input">Filter By Genre: </label>
                    <select id='select-input' className='genre-select' value={filter} data-genre={dataGenre} onChange={(e) => handleSelectChange(e)}>
                        {genre.map((genre, index) => {
                            return <option key={genre.id} data-genre-id={genre.id} value={genre.name} >{genre.name}</option>
                        })}
                    </select>
                </FormGroup>
                </Grid>
            </Grid>
            <Grid key={crypto.randomUUID()} className="movies" container>
            {currentMovies.map((movie, index) => {
                    // if (dataGenre.some(item => movie.genre_ids.includes(item))){
                    if (movie.genre_ids.includes(parseInt(dataGenre))){
                        return <ModalComponent key={crypto.randomUUID()} index={index} movie={{title: movie.title, poster_path: movie.poster_path, overview: movie.overview, release_date: movie.release_date,}} />
                    }
                })}
            </Grid>
            <Grid className="pagination" container>
                <Grid item xs={12} ref={paginationBtnRef}>
                {[...Array(Math.ceil(movies.length / moviesPerPage))].map((e, i) => (
                    <Button variant="outlined" key={i} id={i + 1} onClick={(event) => handlePageChange(event)}>{i + 1}</Button>
                ))}
                </Grid>
            </Grid>
        </Stack>
        </>
    )
}