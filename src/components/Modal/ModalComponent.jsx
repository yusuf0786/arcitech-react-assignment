import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import axios from 'axios';


export function ModalComponent({
    index,
    id,
    // movie= {
    //     title: '',
    //     poster_path : '',
    //     overview : '',
    //     release_date : '',
    // }
}){

    const [open, setOpen] = useState(false);
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetchMovies().catch(error => {
            let promptAlert = prompt("Error: " + error.message +"\nDo you want to try again?" , "yes");
            if (promptAlert === "yes") {
                window.location.reload()
            }
        });

    }, []);

    const fetchMovies = async () => {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9e7c17c14466104df6e6923d6de2dab5`);

        setMovie(movieResponse.data);
    };

    
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);

    const textTruncate = (textvalue= '', limitInNumber, lettersInStart, lettersInEnd) => {
        let text = textvalue
        let textLength = text.length;
  
        if (textLength < limitInNumber) {
            return text
        } else {
        //   let extensionDelimiterIndex = text.lastIndexOf('.');
          let extensionDelimiterIndex = textLength;
          let middleRemovedName = `${text.substring(0,lettersInStart)}...${text.substring(extensionDelimiterIndex - lettersInEnd)}`
          return middleRemovedName
        }
    }

    return (
        <>
        <Grid onClick={handleModalOpen} key={index} className='movie-card-grid' item xs={12} sm={6} md={4} mb={2}>
            {/* {movies &&
            movies.map(movie => ( */}
            <div className="movie-card">
                <h2 title={movie.title}>{textTruncate(movie.title, 20, 15, 5)}</h2>
                <div className="movie-card-image"><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /></div>
            </div>
            {/* ))} */}
        </Grid>
        <Modal open={open} onClose={() => handleModalClose()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
            {/* {movies &&
            movies.map(movie => ( */}
            <Box className="modal-container">
                <div className="modal modal-body-scroll">
                    <div className="modal-header">
                        <h2 title={movie.title}>{movie.title}</h2>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body-content">
                            <Grid container>
                                <Grid item xs={12} md={5} paddingRight="1rem">
                                    <div className="movie-card-image"><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /></div>
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <p className='movie-card-overview'><strong>Overview:</strong> {movie.overview}</p>
                                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button type="button" onClick={handleModalClose} variant='contained'>Close</Button>
                    </div>
                </div>
            </Box>
            {/* ))} */}
        </Modal>
        </>
    )

}