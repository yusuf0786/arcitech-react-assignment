import React, { useState, useEffect, useRef, createRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AppBar, Button, FormGroup, Grid, Stack, debounce, useScrollTrigger } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {ModalComponent} from './Modal/ModalComponent'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export function SearchMovies(props){

    const searchInputRef = useRef(null)
    const paginationBtnRef = useRef([])
    const [query, setQuery] = useState('');

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    const [dataGenre, setDataGenre] = useState(28);

    const [filter, setFilter] = useState('Action');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, ] = useState(10);

    useEffect(() => {
        // searchInputRef.current.focus()
        let debounce = setTimeout(() => {
            fetchMovies().catch(error => {
                let promptAlert = prompt("Error: " + error.message +"\nDo you want to try again?" , "yes");
                if (promptAlert === "yes") {
                    window.location.reload()
                }
            });

            console.log(`https://api.themoviedb.org/3/search/movie?api_key=9e7c17c14466104df6e6923d6de2dab5&query=${query}&with_genres=${dataGenre}`);

        }, 1000)

        return () => {
            clearTimeout(debounce)
            // searchInputRef.current.focus()
        };

    }, [filter, query]);

    const fetchMovies = async () => {
        const moviesResponse = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9e7c17c14466104df6e6923d6de2dab5&query=${query}&with_genres=${dataGenre}`);
        const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=9e7c17c14466104df6e6923d6de2dab5`);

        setMovies(moviesResponse.data.results);
        setGenre(genreResponse.data.genres)
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
            <ElevationScroll {...props}>
                <AppBar>
                    <Grid container>
                        <Grid item xs={12} display="flex" flexDirection={{xs:"column", md: "row"}} alignItems="center">
                        {/* search input field */}
                        <FormGroup className='search-input-grp'>
                            <label htmlFor="search-input">Search Movies: </label>
                            <input autoFocus ref={searchInputRef} placeholder='Search Movies...' id='search-input' className='input-search' type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
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
                </AppBar>
            </ElevationScroll>
            
            <Grid className="movies" container>
            {currentMovies && 
            currentMovies.map((movie, index) => (
                // if (dataGenre.some(item => movie.genre_ids.includes(item))){
                // movie.genre_ids.includes(parseInt(dataGenre)) ? <ModalComponent key={`abc${index}`} index={index} id={movie.id} /> : null
                <ModalComponent key={`abc${index}`} index={index} id={movie.id} />
            ))}
            </Grid>
            <Grid className="pagination" container>
                <Grid item xs={12} ref={paginationBtnRef}>
                {[...Array(Math.ceil(movies.length / moviesPerPage))].map((e, i) => (
                    <Button variant="outlined" className={i === 0 ? "active" : ""} key={i} id={i + 1} onClick={(event) => handlePageChange(event)}>{i + 1}</Button>
                ))}
                </Grid>
            </Grid>
        </Stack>
        </>
    )
}