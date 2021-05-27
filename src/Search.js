import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ImageResult from './ImageResult'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

const Search = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        searchText: '',
        amount: 15,
        apiUrl: 'https://pixabay.com/api/',
        apiKey: '21804730-03999f68bb15cc0c960ed0189',
        images: []
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setState(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if (state.searchText) {
            axios.get(`${state.apiUrl}/?key=${state.apiKey}&q=${state.searchText}&image_type=photo&per_page=${state.amount}&safesearch=true`)
                .then(res => setState(prevValue => {
                    console.log(res.data.hits)
                    return {
                        ...prevValue,
                        images: res.data.hits
                    }
                }))
                .catch(err => console.log(err))
        } else {
            setState(prevValue => {
                return {
                    ...prevValue,
                    images: []
                }
            })
        }

    }, [state.searchText, state.amount]);

    return <div>
        <TextField
            fullWidth={true}
            label="Search For Images"
            name="searchText"
            value={state.searchText}
            variant="outlined"
            onChange={handleChange}
        />
        <br />
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel>Amount</InputLabel>
            <Select
                value={state.amount}
                defaultValue="5"
                name='amount'
                onChange={handleChange}
            >
                <MenuItem value={5}>{5}</MenuItem>
                <MenuItem value={10}>{10}</MenuItem>
                <MenuItem value={15}>{15}</MenuItem>
                <MenuItem value={25}>{25}</MenuItem>
                <MenuItem value={30}>{30}</MenuItem>
            </Select>
        </FormControl>
        <br />
        <ImageResult images={state.images} />
    </div>
}

export default Search