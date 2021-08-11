import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ImageResult from "./ImageResult";
import { State } from "./interface/state";
import { Response } from "./interface/response";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Search: React.FC = () => {
  const classes = useStyles();
  const apiUrl = "https://pixabay.com/api/";
  const apiKey = "21804730-03999f68bb15cc0c960ed0189";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<State>({
    searchText: "",
    amount: 15,
    image: [],
  });

  const handleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const { name, value } = e.target;
    setIsLoading(true);
    setState((prevValue) => {
      return {
        ...prevValue,
        [name!]: value,
      };
    });
  };

  useEffect(() => {
    if (state.searchText) {
      axios
        .get<Response>(
          `${apiUrl}/?key=${apiKey}&q=${state.searchText}&image_type=photo&per_page=${state.amount}&safesearch=true`
        )
        .then((res) => {
          setState((prevValue) => {
            return {
              ...prevValue,
              image: res.data.hits,
            };
          });
          setIsLoading(false);
        })
        .catch((err) => console.log(err.message));
    } else {
      setState((prevValue) => {
        return {
          ...prevValue,
          image: [],
        };
      });
      setIsLoading(false);
    }
  }, [state.searchText, state.amount]);

  return (
    <div>
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
          name="amount"
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value={5}>{5}</MenuItem>
          <MenuItem value={10}>{10}</MenuItem>
          <MenuItem value={15}>{15}</MenuItem>
          <MenuItem value={25}>{25}</MenuItem>
          <MenuItem value={30}>{30}</MenuItem>
        </Select>
      </FormControl>
      <br />
      {isLoading && <div>Loading...</div>}
      <ImageResult images={state.image} />
    </div>
  );
};

export default Search;
