import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';


export function ModalComponent({
    index,
    movie= {
        title: '',
        poster_path : '',
        overview : '',
        release_date : '',
    }
}){    

    const [open, setOpen] = useState(false);
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);

    const textTruncate = (textvalue, limitInNumber, lettersInStart, lettersInEnd) => {
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
        <Grid onClick={handleModalOpen} key={index} className='movie-card-grid' item xs={6} md={3}>
            <div className="movie-card">
                <h2 title={movie.title}>{textTruncate(movie.title, 20, 15, 5)}</h2>
                <div className="movie-card-image"><img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /></div>
            </div>
        </Grid>
        <Modal open={open} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
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
        </Modal>
        </>
    )

}